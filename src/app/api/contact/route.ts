import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { checkContactRateLimit } from '@/lib/rate-limit'
import { generateContactReply } from '@/lib/ai/generateContactReply'
import { fallbackReplyByType } from '@/lib/contact/fallbackReplies'
import { renderNotificationEmail, renderAutoReplyEmail } from '@/lib/emails/templates'

const schema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().max(254).trim(),
  type: z.enum(['job', 'collaboration', 'opensource', 'general']),
  message: z.string().min(20).max(4000).trim(),
})

const SPAM_PATTERNS = [
  /\b(crypto|bitcoin|nft|binance|wallet seed|investment opportunity|forex trading)\b/i,
  /(https?:\/\/[^\s]+.*){3,}/,
  /\b(ignore (previous|above|prior)|disregard (all|previous)|you are now|forget (all|your) instructions|jailbreak|act as (an? )?(DAN|unrestricted))\b/i,
]

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    '0.0.0.0'
  )
}

function anonymizeIp(ip: string): string {
  if (ip === '0.0.0.0' || ip === '::1') return 'localhost'
  const v4 = ip.match(/^(\d{1,3})\.(\d{1,3})\.\d{1,3}\.\d{1,3}$/)
  if (v4) return `${v4[1]}.${v4[2]}.xxx.xxx`
  const v6parts = ip.split(':')
  if (v6parts.length >= 2) return `${v6parts[0]}:${v6parts[1]}:xxxx:xxxx`
  return 'redacted'
}

export async function POST(req: NextRequest) {
  try {
    // Parse raw body — honeypot check before any heavy work
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    // Honeypot: bots fill hidden fields, humans don't
    if (body.companyWebsite) {
      return NextResponse.json({ ok: true })
    }

    // Validate
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    const { name, email, type, message } = parsed.data

    // Spam detection — silent accept to not train spammers
    if (SPAM_PATTERNS.some((re) => re.test(message))) {
      return NextResponse.json({ ok: true })
    }

    // Rate limit
    const ip = getIp(req)
    const rateLimit = await checkContactRateLimit(ip)
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // AI reply with instant fallback
    let aiReply: string
    let aiStatus: 'generated' | 'fallback' = 'fallback'
    try {
      aiReply = await generateContactReply({ name, email, type, message })
      aiStatus = 'generated'
    } catch {
      aiReply = fallbackReplyByType(type)
    }

    // Send both emails simultaneously — failures are isolated
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      const resend = new Resend(resendKey)
      const timestamp = new Date().toISOString()
      const userAgent = req.headers.get('user-agent') ?? undefined

      await Promise.allSettled([
        resend.emails.send({
          from: 'Portfolio <noreply@kapiljangid.pro>',
          to: 'hello@kapiljangid.pro',
          subject: `[contact] ${name} — ${type}`,
          html: renderNotificationEmail({
            name,
            email,
            type,
            message,
            aiStatus,
            ipHash: anonymizeIp(ip),
            userAgent,
            timestamp,
            sourceRoute: '/contact',
          }),
        }),
        resend.emails.send({
          from: 'Kapil Jangid <hello@kapiljangid.pro>',
          replyTo: 'hello@kapiljangid.pro',
          to: email,
          subject: `Re: your message`,
          html: renderAutoReplyEmail({ name, reply: aiReply }),
        }),
      ])
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

import { buildContactContext } from './buildPortfolioContext'

export interface ContactInput {
  name: string
  email: string
  type: string
  message: string
}

export async function generateContactReply(input: ContactInput): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY not set')

  const context = buildContactContext()

  const prompt = `You are writing a reply on behalf of Kapil Kumar Jangid, a full stack developer. Someone reached out through his portfolio contact form.

CONTEXT ABOUT KAPIL:
${context}

STRICT RULES:
- Write as Kapil in first person — calm, direct, engineering-oriented, slightly warm
- 4-6 lines total, 80-140 words max
- Do NOT open with "thank you for reaching out" or any corporate greeting
- Jump into the substance — no filler openers like "Hi [name]," followed by nothing
- No AI phrasing, no emojis, no markdown formatting, no bullet points
- Reference Kapil's projects or work only if it's genuinely relevant to the message
- Never fabricate experience, never promise specific meetings or timelines
- Return ONLY valid JSON with no markdown fences: {"reply": "..."}

CONTACT:
Name: ${input.name}
Inquiry Type: ${input.type}
Message: ${input.message}`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 1200)

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 220 },
        }),
      }
    )

    if (!res.ok) throw new Error(`Gemini API responded with ${res.status}`)

    const data = await res.json()
    const raw: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

    // Strip markdown fences if Gemini wraps the JSON anyway
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/, '').trim()
    const parsed = JSON.parse(cleaned)

    if (typeof parsed.reply !== 'string' || !parsed.reply.trim()) {
      throw new Error('Reply field missing or empty')
    }

    return parsed.reply.trim()
  } finally {
    clearTimeout(timeout)
  }
}

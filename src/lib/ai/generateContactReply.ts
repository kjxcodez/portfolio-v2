export interface ContactInput {
  name: string
  email: string
  type: string
  message: string
}

// Compact static context — intentionally minimal to keep latency low
const KAPIL_CONTEXT = `Kapil Kumar Jangid is a full stack developer based in Rajasthan, India.
He specialises in developer tools, AI integrations, frontend architecture, and SaaS products.
Notable work: FlowCMS (headless CMS with drag-and-drop builder), Rune Lang (custom interpreted language built from scratch in Python), AI Auto Commit (VS Code extension using Gemini API), Percept UI (React component library and CLI published on npm).
Currently works as an SDE building WhatsApp and email marketing infrastructure for Shopify merchants.
Open source contributor. Available for the right opportunities.`

const SYSTEM_INSTRUCTION = `You write short personal email replies on behalf of Kapil Kumar Jangid.

TONE: thoughtful, calm, direct — like an engineer who actually read the message
LENGTH: 3–5 sentences, 80–140 words maximum
FORMAT: plain prose only — no greetings like "Hi [name]", no sign-off, no bullet points, no markdown

STRICT RULES:
- Never start with "Thank you for reaching out", "I hope you're doing well", "I appreciate your interest", or any variation
- Never promise specific meetings, timelines, or outcomes
- Reference Kapil's projects only if directly relevant to the inquiry — never force it
- Never fabricate experience or capabilities not described in the context
- If uncertain, stay general rather than inventing specifics
- Write as Kapil in first person

OUTPUT: return only the reply text, nothing else`

export async function generateContactReply(input: ContactInput): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY not set')

  const prompt = `${SYSTEM_INSTRUCTION}

ABOUT KAPIL:
${KAPIL_CONTEXT}

INQUIRY:
Name: ${input.name}
Type: ${input.type}
Message: ${input.message}

Write the reply:`

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000) // 10 second timeout

  const start = Date.now()
  // console.log('[contact/ai] generating reply', { type: input.type })

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.5, maxOutputTokens: 5000 },
        }),
      }
    )

    // console.log('[contact/ai] gemini response received', { status: res.status, ms: Date.now() - start })

    const text = await res.text()
    
    // console.log('[contact/ai] gemini raw response', { text })

    if (!res.ok) {
      // console.warn('[contact/ai] gemini error', { status: res.status, ms: Date.now() - start })
      throw new Error(`Gemini responded with ${res.status}`)
    }

    let data: any

    try {
    data = JSON.parse(text)
    } catch (err) {
    // console.error('[contact/ai] failed to parse response JSON')
    throw err
    }

    const reply: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

    if (!reply.trim()) {
      throw new Error('Empty response from Gemini')
    }

    // console.log('[contact/ai] success', { ms: Date.now() - start })
    return reply.trim()
  } catch (err) {
    // const isAbort = err instanceof Error && err.name === 'AbortError'
    // console.warn('[contact/ai] failed', { reason: isAbort ? 'timeout' : 'error', ms: Date.now() - start })
    throw err
  } finally {
    clearTimeout(timeout)
  }
}

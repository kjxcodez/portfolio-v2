import { NextRequest } from 'next/server'
import { buildFullSystemPrompt } from '@/lib/ai/buildPortfolioContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const messages: Message[] = body.messages

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response('Invalid request: messages are required', { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return new Response(
        'AI chat is not configured yet. Please set GEMINI_API_KEY in your environment variables.',
        { status: 200 }
      )
    }

    const systemPrompt = buildFullSystemPrompt()

    // Build Gemini API request
    const geminiMessages = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model',
        parts: [
          {
            text: "I understand. I'm Kapil's portfolio AI assistant. I will only answer questions about his professional profile, skills, projects, and experience using the context you've provided. I won't invent information.",
          },
        ],
      },
      ...messages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    ]

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:streamGenerateContent?alt=sse`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey || '' },
        body: JSON.stringify({
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    )

    if (!geminiRes.ok) {
      const errText = await geminiRes.text()
      console.error('Gemini API error:', errText)
      return new Response('Sorry, I had trouble thinking. Please try again.', { status: 200 })
    }

    // Stream the response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        const reader = geminiRes.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        const decoder = new TextDecoder()
        let buffer = ''

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })

            // Parse SSE events
            const lines = buffer.split('\n')
            buffer = lines.pop() || ''

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6).trim()
                if (data === '[DONE]') continue

                try {
                  const parsed = JSON.parse(data)
                  const text =
                    parsed?.candidates?.[0]?.content?.parts?.[0]?.text
                  if (text) {
                    controller.enqueue(encoder.encode(text))
                  }
                } catch {
                  // Skip malformed JSON
                }
              }
            }
          }
        } catch (err) {
          console.error('Stream error:', err)
        }

        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return new Response('Something went wrong', { status: 500 })
  }
}

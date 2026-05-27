type InquiryType = 'job' | 'collaboration' | 'opensource' | 'general'

const FALLBACKS: Record<InquiryType, string> = {
  job: `I'm currently open to full-time roles and I'm always genuinely interested in hearing about what people are building. I care a lot about the work itself - the stack, the product, the team's approach to shipping things. I'll read through what you've shared, and if it feels like a good fit I'll follow up within 24-48 hours. Either way, thanks for thinking of me.`,

  collaboration: `Collaborations are some of my favourite things. I've learned more from working alongside other builders than from almost anything else - and the best projects I've been part of started with a simple message like this one. Whether it's a side project, something open source, or an idea you haven't fully shaped yet, I'm interested. Tell me more when I reply.`,

  opensource: `Open source is something I take seriously - not just as a way to share code, but as a way of thinking about software. I maintain a few projects, contribute where I can, and I genuinely read every message that comes in about this stuff. I'll take a proper look at what you've sent and get back to you soon. If it's a bug or a feature request, you're also welcome to open an issue directly on GitHub.`,

  general: `Not every message fits neatly into a category and that's completely fine. I read everything that comes in — whether it's feedback on something I built, a question, or just something you wanted to share. I'll get back to you within a day or two. Thanks for taking the time to write.`,
}

export function fallbackReplyByType(type: string): string {
  return FALLBACKS[type as InquiryType] ?? FALLBACKS.general
}

import { PERSONAL, PROJECTS, SKILLS, EXPERIENCE, CONTRIBUTIONS, CURRENTLY_BUILDING } from '@/lib/data'

// Full system prompt for the chat assistant — includes all portfolio data
export function buildFullSystemPrompt(): string {
  const experienceText = EXPERIENCE.map((exp) => {
    const projects = exp.projects
      .map(
        (p) =>
          `  Project: ${p.name}\n  Achievements:\n${p.achievements.map((a) => `    - ${a}`).join('\n')}`
      )
      .join('\n\n')
    return `Company: ${exp.company}\nRole: ${exp.role}\nType: ${exp.type}\nPeriod: ${exp.period}\n\n${projects}`
  }).join('\n\n---\n\n')

  const projectsText = PROJECTS.map(
    (p) =>
      `- ${p.title}: ${p.description}\n  Tags: ${p.tags.join(', ')}\n  ${p.url ? `URL: ${p.url}` : ''}\n  ${p.github ? `GitHub: ${p.github}` : ''}`
  ).join('\n')

  const skillsText = SKILLS.map((s) => `${s.name} (${s.category}, level ${s.level}/3)`).join(', ')

  const contributionsText = CONTRIBUTIONS.map(
    (c) => `- ${c.title} (${c.repo}) — ${c.type} ${c.status} (${c.date})`
  ).join('\n')

  const buildingText = CURRENTLY_BUILDING.map(
    (c) => `- ${c.title}: ${c.description} (${c.status})`
  ).join('\n')

  return `You are an AI assistant for Kapil Kumar Jangid's portfolio website. You ONLY answer questions related to Kapil's professional profile, skills, projects, experience, and contributions.

RULES:
- Only answer questions about Kapil's portfolio, skills, projects, experience, and professional background.
- If the information is not available in the context below, say "I don't have that information about Kapil."
- NEVER invent or hallucinate information. Only use facts from the context.
- Be concise and professional.
- If asked about unrelated topics, politely redirect to portfolio-related questions.

=== KAPIL'S PROFILE ===
Name: ${PERSONAL.name}
Title: ${PERSONAL.title}
Location: ${PERSONAL.location}
Email: ${PERSONAL.email}
Bio: ${PERSONAL.bio}
Available for work: ${PERSONAL.available ? 'Yes' : 'No'}
GitHub: ${PERSONAL.github}
Twitter: ${PERSONAL.twitter}

=== WORK EXPERIENCE ===
${experienceText}

=== PROJECTS ===
${projectsText}

=== SKILLS ===
${skillsText}

=== OPEN SOURCE CONTRIBUTIONS ===
${contributionsText}

=== CURRENTLY BUILDING ===
${buildingText}
`
}

// Compact context for email auto-replies — kept short to stay within latency budget
export function buildContactContext(): string {
  const featuredProjects = PROJECTS.filter((p) => p.featured)
    .map((p) => `- ${p.title}: ${p.description} (${p.tags.slice(0, 3).join(', ')})`)
    .join('\n')

  const currentWork = EXPERIENCE[0]
    ? `${EXPERIENCE[0].role} at ${EXPERIENCE[0].company} (${EXPERIENCE[0].period})`
    : ''

  const building = CURRENTLY_BUILDING.map((c) => `- ${c.title}: ${c.description}`).join('\n')

  const coreSkills = SKILLS.filter((s) => s.level === 3)
    .slice(0, 8)
    .map((s) => s.name)
    .join(', ')

  return `Kapil Kumar Jangid — Full Stack Developer, Rajasthan, India
Email: ${PERSONAL.email} | GitHub: ${PERSONAL.github}
Available: ${PERSONAL.available ? 'Yes' : 'No'}
Current work: ${currentWork}

Featured projects:
${featuredProjects}

Currently building:
${building}

Core skills: ${coreSkills}`
}

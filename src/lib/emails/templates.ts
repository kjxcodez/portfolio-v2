const FONT_MONO = `monospace, 'Courier New', Courier`
const FONT_SANS = `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

// --- Helper: infer intent from message + type
function inferIntent(type: string, message: string): string {
  const m = message.toLowerCase()
  if (type === 'job') {
    if (m.includes('startup') || m.includes('founder')) return 'Founder Inquiry'
    if (m.includes('full-time') || m.includes('full time')) return 'Full-Time Role'
    if (m.includes('contract') || m.includes('freelance')) return 'Contract / Freelance'
    if (m.includes('intern')) return 'Internship'
    return 'Job Inquiry'
  }
  if (type === 'collaboration') {
    if (m.includes('open source') || m.includes('oss')) return 'OSS Collaboration'
    if (m.includes('project')) return 'Project Collaboration'
    if (m.includes('saas') || m.includes('product')) return 'Product Collaboration'
    return 'Collaboration Inquiry'
  }
  if (type === 'opensource') return 'Open Source'
  return 'General Inquiry'
}

// --- Helper: parse user agent into readable string
function parseDevice(ua?: string): string {
  if (!ua) return 'Unknown'
  const browser = ua.includes('Edg') ? 'Edge'
    : ua.includes('Chrome') ? 'Chrome'
    : ua.includes('Firefox') ? 'Firefox'
    : ua.includes('Safari') ? 'Safari'
    : 'Other'
  const os = ua.includes('Windows') ? 'Windows'
    : ua.includes('Macintosh') ? 'macOS'
    : ua.includes('Linux') ? 'Linux'
    : ua.includes('Android') ? 'Android'
    : ua.includes('iPhone') || ua.includes('iPad') ? 'iOS'
    : 'Unknown'
  return `${browser} / ${os}`
}

// --- Meta row helper
function metaRow(label: string, value: string): string {
  return `<tr>
    <td style="color:#555;font-size:11px;font-family:${FONT_MONO};padding:2px 16px 2px 0;vertical-align:top;white-space:nowrap;">${label}</td>
    <td style="color:#aaa;font-size:11px;font-family:${FONT_MONO};padding:2px 0;">${value}</td>
  </tr>`
}

// ── Terminal-style notification email sent to Kapil ──────────────────────────
export interface NotificationEmailProps {
  name: string
  email: string
  type: string
  message: string
  aiStatus: 'generated' | 'fallback'
  ipHash: string
  userAgent?: string
  timestamp: string
  sourceRoute: string
}

export function renderNotificationEmail(props: NotificationEmailProps): string {
  const { name, email, type, message, aiStatus, ipHash, userAgent, timestamp, sourceRoute } = props

  const typeLabel: Record<string, string> = {
    job: 'Job Opportunity',
    collaboration: 'Collaboration',
    opensource: 'Open Source',
    general: 'General',
  }

  const intent = inferIntent(type, message)
  const device = parseDevice(userAgent)
  const label = typeLabel[type] ?? type
  const escapedMessage = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[contact] ${name}</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:${FONT_MONO};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
          <!-- Main card -->
          <tr>
            <td style="background-color:#111;border:1px solid #1e1e1e;border-radius:8px;padding:28px 32px;">

              <!-- Header -->
              <p style="color:#444;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;margin:0 0 22px;font-family:${FONT_MONO};">kapiljangid.pro / contact</p>

              <!-- From/Type/Intent -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
                ${metaRow('FROM', `${name} &lt;<a href="mailto:${email}" style="color:#666;text-decoration:none;">${email}</a>&gt;`)}
                ${metaRow('TYPE', label)}
                ${metaRow('INTENT', intent)}
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid #1e1e1e;padding:0 0 20px;"></td></tr>
              </table>

              <!-- Message section -->
              <p style="color:#444;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin:0 0 10px;font-family:${FONT_MONO};">Message</p>
              <p style="color:#bbb;font-size:13px;line-height:1.75;margin:0 0 26px;white-space:pre-wrap;font-family:${FONT_SANS};">${escapedMessage}</p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid #1e1e1e;padding:0 0 20px;"></td></tr>
              </table>

              <!-- Meta block -->
              <table cellpadding="0" cellspacing="0" border="0">
                ${metaRow('AI_REPLY', aiStatus === 'generated' ? 'Generated' : 'Fallback')}
                ${metaRow('DEVICE', device)}
                ${metaRow('SOURCE', sourceRoute)}
                ${metaRow('IP', ipHash)}
                ${metaRow('TIME', timestamp)}
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:16px;">
              <p style="color:#2a2a2a;font-size:11px;margin:0;font-family:${FONT_MONO};">kapiljangid.pro</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ── Minimal personal auto-reply sent to the contact ──────────────────────────
export interface AutoReplyEmailProps {
  name: string
  reply: string
}

export function renderAutoReplyEmail({ reply }: AutoReplyEmailProps): string {
  const escapedReply = reply
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n\n/g, '</p><p style="color:#bbb;font-size:15px;line-height:1.85;margin:0 0 0;">')
    .replace(/\n/g, '<br>')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Re: your message</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:${FONT_SANS};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:60px 24px;">
        <table width="520" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;width:100%;">

          <!-- Brand -->
          <tr>
            <td style="padding-bottom:36px;">
              <p style="color:#333;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;margin:0;font-family:${FONT_MONO};">kapiljangid.pro</p>
            </td>
          </tr>

          <!-- AI-generated reply body -->
          <tr>
            <td style="padding-bottom:36px;">
              <p style="color:#bbb;font-size:15px;line-height:1.85;margin:0;">${escapedReply}</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #1a1a1a;padding-bottom:28px;"></td>
          </tr>

          <!-- Signature -->
          <tr>
            <td>
              <p style="color:#444;font-size:13px;line-height:2;margin:0;font-family:${FONT_SANS};">
                Kapil Kumar Jangid<br>
                <a href="https://kapiljangid.pro" style="color:#444;text-decoration:none;">kapiljangid.pro</a>
                &nbsp;&middot;&nbsp;
                <a href="https://github.com/kjxcodez" style="color:#444;text-decoration:none;">GitHub</a>
                &nbsp;&middot;&nbsp;
                <a href="https://x.com/kjxcodez" style="color:#444;text-decoration:none;">X</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

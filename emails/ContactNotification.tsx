import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Link,
  Hr,
  Preview,
} from '@react-email/components'
import { render } from '@react-email/render'

const MONO = `'Geist Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace`
const SANS = `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

const TYPE_LABELS: Record<string, string> = {
  job: 'Job Opportunity',
  collaboration: 'Collaboration',
  opensource: 'Open Source',
  general: 'General',
}

const TYPE_COLORS: Record<string, string> = {
  job: '#3b82f6',
  collaboration: '#f59e0b',
  opensource: '#22c55e',
  general: '#71717a',
}

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

function parseDevice(ua?: string): string {
  if (!ua) return 'Unknown'
  const browser = ua.includes('Edg')
    ? 'Edge'
    : ua.includes('Chrome')
      ? 'Chrome'
      : ua.includes('Firefox')
        ? 'Firefox'
        : ua.includes('Safari')
          ? 'Safari'
          : 'Other'
  const os = ua.includes('Windows')
    ? 'Windows'
    : ua.includes('Macintosh')
      ? 'macOS'
      : ua.includes('Linux')
        ? 'Linux'
        : ua.includes('Android')
          ? 'Android'
          : ua.includes('iPhone') || ua.includes('iPad')
            ? 'iOS'
            : 'Unknown'
  return `${browser} / ${os}`
}

export interface ContactNotificationProps {
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

export function ContactNotification({
  name,
  email,
  type,
  message,
  aiStatus,
  ipHash,
  userAgent,
  timestamp,
  sourceRoute,
}: ContactNotificationProps) {
  const intent = inferIntent(type, message)
  const device = parseDevice(userAgent)
  const label = TYPE_LABELS[type] ?? type
  const badgeColor = TYPE_COLORS[type] ?? '#71717a'
  const firstName = name.split(' ')[0]

  const meta: [string, string][] = [
    ['INTENT', intent],
    ['AI_REPLY', aiStatus === 'generated' ? '✓ generated' : '⚠ fallback'],
    ['DEVICE', device],
    ['SOURCE', sourceRoute],
    ['IP_HASH', ipHash],
    ['TIMESTAMP', timestamp],
  ]

  return (
    <Html lang="en">
      <Head />
      <Preview>
        [{label}] {name} — kapiljangid.pro
      </Preview>
      <Body
        style={{
          margin: '0',
          padding: '0',
          backgroundColor: '#0a0a0a',
          fontFamily: MONO,
        }}
      >
        <Container
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '40px 20px',
          }}
        >
          {/* ── Main card ── */}
          <Section
            style={{
              backgroundColor: '#111111',
              border: '1px solid #1e1e1e',
              borderRadius: '8px',
            }}
          >
            {/* Header bar */}
            <Row
              style={{
                borderBottom: '1px solid #1e1e1e',
                padding: '12px 24px',
              }}
            >
              <Column style={{ width: '36px' }}>
                <Text
                  style={{
                    margin: '0',
                    width: '28px',
                    height: '28px',
                    lineHeight: '28px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    color: '#22c55e',
                    fontSize: '12px',
                    fontWeight: '700',
                    fontFamily: MONO,
                    display: 'inline-block',
                  }}
                >
                  K
                </Text>
              </Column>
              <Column>
                <Text
                  style={{
                    margin: '0',
                    color: '#52525b',
                    fontSize: '11px',
                    letterSpacing: '0.06em',
                    fontFamily: MONO,
                  }}
                >
                  kapiljangid.pro / contact
                </Text>
              </Column>
            </Row>

            {/* Badge + timestamp */}
            <Row style={{ padding: '16px 24px 0' }}>
              <Column>
                <Text
                  style={{
                    margin: '0',
                    display: 'inline-block',
                    backgroundColor: `${badgeColor}18`,
                    border: `1px solid ${badgeColor}38`,
                    color: badgeColor,
                    fontSize: '10px',
                    fontFamily: MONO,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '3px',
                  }}
                >
                  {label}
                </Text>
              </Column>
              <Column style={{ textAlign: 'right' }}>
                <Text
                  style={{
                    margin: '0',
                    color: '#3f3f46',
                    fontSize: '10px',
                    fontFamily: MONO,
                  }}
                >
                  {timestamp}
                </Text>
              </Column>
            </Row>

            {/* Sender */}
            <Row style={{ padding: '20px 24px 0' }}>
              <Column>
                <Text
                  style={{
                    margin: '0 0 10px',
                    color: '#3f3f46',
                    fontSize: '10px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontFamily: MONO,
                  }}
                >
                  NEW MESSAGE
                </Text>
                <Text
                  style={{
                    margin: '0 0 4px',
                    color: '#e4e4e7',
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: MONO,
                  }}
                >
                  {name}
                </Text>
                <Link
                  href={`mailto:${email}`}
                  style={{
                    color: '#22c55e',
                    fontSize: '12px',
                    fontFamily: MONO,
                    textDecoration: 'none',
                  }}
                >
                  {email}
                </Link>
              </Column>
            </Row>

            {/* Message block — narrow left-border column fakes a border-left */}
            <Row style={{ padding: '20px 24px' }}>
              <Column
                style={{
                  backgroundColor: '#0d0d0d',
                  border: '1px solid #1e1e1e',
                  borderRadius: '4px',
                }}
              >
                <Section>
                  <Row>
                    <Column
                      style={{
                        width: '3px',
                        backgroundColor: '#22c55e',
                        fontSize: '0',
                        lineHeight: '0',
                        padding: '0',
                      }}
                    >
                      &nbsp;
                    </Column>
                    <Column style={{ padding: '14px 16px' }}>
                      <Text
                        style={{
                          margin: '0',
                          color: '#a1a1aa',
                          fontSize: '13px',
                          lineHeight: '1.75',
                          fontFamily: SANS,
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {message}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              </Column>
            </Row>

            {/* Reply CTA */}
            <Row style={{ padding: '0 24px 20px' }}>
              <Column>
                <Link
                  href={`mailto:${email}?subject=Re: your message`}
                  style={{
                    display: 'block',
                    backgroundColor: '#22c55e',
                    color: '#000000',
                    fontSize: '11px',
                    fontWeight: '700',
                    letterSpacing: '0.12em',
                    textAlign: 'center',
                    padding: '11px 0',
                    borderRadius: '4px',
                    fontFamily: MONO,
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  ↗ REPLY TO {firstName.toUpperCase()}
                </Link>
              </Column>
            </Row>

            <Hr style={{ borderColor: '#1e1e1e', margin: '0 24px' }} />

            {/* Metadata */}
            <Section style={{ padding: '14px 24px 20px' }}>
              <Row>
                <Column>
                  <Text
                    style={{
                      margin: '0 0 10px',
                      color: '#3f3f46',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      fontFamily: MONO,
                    }}
                  >
                    METADATA
                  </Text>
                </Column>
              </Row>
              {meta.map(([key, value]) => (
                <Row key={key} style={{ marginBottom: '3px' }}>
                  <Column style={{ width: '88px' }}>
                    <Text
                      style={{
                        margin: '0',
                        color: '#3f3f46',
                        fontSize: '10px',
                        fontFamily: MONO,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {key}
                    </Text>
                  </Column>
                  <Column>
                    <Text
                      style={{
                        margin: '0',
                        color: '#71717a',
                        fontSize: '10px',
                        fontFamily: MONO,
                      }}
                    >
                      {value}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{ textAlign: 'center', paddingTop: '16px' }}>
            <Text
              style={{
                margin: '0',
                color: '#27272a',
                fontSize: '10px',
                fontFamily: MONO,
              }}
            >
              automated notification · kapiljangid.pro · contact pipeline
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderContactNotificationEmail(
  props: ContactNotificationProps,
): Promise<string> {
  return render(<ContactNotification {...props} />)
}

// Default export for `email dev` preview server
export default function ContactNotificationPreview() {
  return (
    <ContactNotification
      name="Alex Rivera"
      email="alex@example.com"
      type="job"
      message={`Hey Kapil,\n\nI came across your portfolio and was really impressed by your work on the projects. We're a Series A startup building developer tooling and we'd love to discuss a senior frontend role with you.\n\nThe position is remote-first with a competitive package. Would you be open to a quick call this week?`}
      aiStatus="generated"
      ipHash="192.168.xxx.xxx"
      userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      timestamp={new Date().toISOString()}
      sourceRoute="/contact"
    />
  )
}

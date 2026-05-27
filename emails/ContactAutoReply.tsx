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

const SANS = `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
const MONO = `'Geist Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace`

export interface ContactAutoReplyProps {
  name: string
  reply: string
}

export function ContactAutoReply({ name, reply }: ContactAutoReplyProps) {
  const firstName = name.split(' ')[0]

  return (
    <Html lang="en">
      <Head />
      <Preview>Hey {firstName} — got your message, I'll be in touch.</Preview>
      <Body
        style={{
          margin: '0',
          padding: '0',
          backgroundColor: '#ffffff',
          fontFamily: SANS,
        }}
      >
        <Container
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '0 0 48px',
          }}
        >
          {/* Top accent bar — green→blue gradient with solid fallback for Outlook */}
          <Section>
            <Row>
              <Column>
                <div
                  style={{
                    height: '4px',
                    background: '#22c55e',
                    backgroundImage: 'linear-gradient(90deg, #22c55e 0%, #3b82f6 100%)',
                  }}
                />
              </Column>
            </Row>
          </Section>

          {/* Header */}
          <Section style={{ padding: '40px 40px 0', textAlign: 'center' }}>
            <Row>
              <Column style={{ textAlign: 'center' }}>
                <Text
                  style={{
                    margin: '0 auto 12px',
                    width: '44px',
                    height: '44px',
                    lineHeight: '44px',
                    textAlign: 'center',
                    borderRadius: '50%',
                    backgroundColor: '#f4f4f5',
                    color: '#09090b',
                    fontSize: '16px',
                    fontWeight: '700',
                    fontFamily: MONO,
                    display: 'inline-block',
                  }}
                >
                  K
                </Text>
                <Text
                  style={{
                    margin: '0',
                    color: '#3f3f46',
                    fontSize: '13px',
                    letterSpacing: '0.04em',
                    fontFamily: SANS,
                  }}
                >
                  Kapil Jangid
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Greeting */}
          <Section style={{ padding: '36px 40px 0' }}>
            <Row>
              <Column>
                <Text
                  style={{
                    margin: '0 0 20px',
                    color: '#09090b',
                    fontSize: '22px',
                    fontWeight: '600',
                    lineHeight: '1.3',
                    fontFamily: SANS,
                  }}
                >
                  Hey {firstName},
                </Text>
                <Text
                  style={{
                    margin: '0',
                    color: '#52525b',
                    fontSize: '15px',
                    lineHeight: '1.75',
                    fontFamily: SANS,
                  }}
                >
                  I got your message — thanks for reaching out. I'll get back to you within
                  24–48 hours.
                </Text>
              </Column>
            </Row>
          </Section>

          {/* AI-generated reply block — template controls all layout */}
          <Section style={{ padding: '28px 40px 0' }}>
            <Row>
              <Column>
                <Hr style={{ borderColor: '#e4e4e7', margin: '0 0 24px' }} />
                <Text
                  style={{
                    margin: '0',
                    color: '#09090b',
                    fontSize: '15px',
                    lineHeight: '1.8',
                    fontFamily: SANS,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {reply}
                </Text>
                <Hr style={{ borderColor: '#e4e4e7', margin: '24px 0 0' }} />
              </Column>
            </Row>
          </Section>

          {/* What I'm building */}
          <Section style={{ padding: '28px 40px 0' }}>
            <Row>
              <Column>
                <Text
                  style={{
                    margin: '0 0 16px',
                    color: '#a1a1aa',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontFamily: MONO,
                  }}
                >
                  What I'm building
                </Text>
              </Column>
            </Row>
            <Row>
              <Column
                style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #e4e4e7',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  marginBottom: '8px',
                }}
              >
                <Text
                  style={{
                    margin: '0 0 3px',
                    color: '#09090b',
                    fontSize: '13px',
                    fontWeight: '600',
                    fontFamily: SANS,
                  }}
                >
                  FlowCMS
                </Text>
                <Text
                  style={{
                    margin: '0',
                    color: '#71717a',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    fontFamily: SANS,
                  }}
                >
                  A developer-first headless CMS with live visual editing and type-safe
                  content APIs.
                </Text>
              </Column>
            </Row>
            <Row style={{ paddingTop: '8px' }}>
              <Column
                style={{
                  backgroundColor: '#fafafa',
                  border: '1px solid #e4e4e7',
                  borderRadius: '8px',
                  padding: '14px 16px',
                }}
              >
                <Text
                  style={{
                    margin: '0 0 3px',
                    color: '#09090b',
                    fontSize: '13px',
                    fontWeight: '600',
                    fontFamily: SANS,
                  }}
                >
                  Rune Lang
                </Text>
                <Text
                  style={{
                    margin: '0',
                    color: '#71717a',
                    fontSize: '12px',
                    lineHeight: '1.5',
                    fontFamily: SANS,
                  }}
                >
                  A compiled, statically-typed language designed for performance and
                  expressiveness.
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Signature */}
          <Section style={{ padding: '32px 40px 0' }}>
            <Row>
              <Column>
                <Text
                  style={{
                    margin: '0',
                    color: '#09090b',
                    fontSize: '15px',
                    fontFamily: SANS,
                  }}
                >
                  — Kapil
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Links */}
          <Section style={{ padding: '20px 40px 0' }}>
            <Row>
              <Column>
                <Text
                  style={{
                    margin: '0',
                    color: '#a1a1aa',
                    fontSize: '13px',
                    fontFamily: SANS,
                  }}
                >
                  <Link
                    href="https://kapiljangid.pro"
                    style={{ color: '#52525b', textDecoration: 'none' }}
                  >
                    Site
                  </Link>
                  <span style={{ color: '#d4d4d8' }}> · </span>
                  <Link
                    href="https://github.com/kjxcodez"
                    style={{ color: '#52525b', textDecoration: 'none' }}
                  >
                    GitHub
                  </Link>
                  <span style={{ color: '#d4d4d8' }}> · </span>
                  <Link
                    href="https://x.com/kjxcodez"
                    style={{ color: '#52525b', textDecoration: 'none' }}
                  >
                    X
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Footer */}
          <Section style={{ padding: '28px 40px 0' }}>
            <Row>
              <Column>
                <Hr style={{ borderColor: '#f4f4f5', margin: '0 0 16px' }} />
                <Text
                  style={{
                    margin: '0',
                    color: '#d4d4d8',
                    fontSize: '11px',
                    fontFamily: MONO,
                    lineHeight: '1.6',
                  }}
                >
                  You're receiving this because you filled out the contact form at{' '}
                  <Link
                    href="https://kapiljangid.pro/contact"
                    style={{ color: '#d4d4d8', textDecoration: 'none' }}
                  >
                    kapiljangid.pro/contact
                  </Link>
                  . This is an automated reply.
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export async function renderContactAutoReplyEmail(
  props: ContactAutoReplyProps,
): Promise<string> {
  return render(<ContactAutoReply {...props} />)
}

// Default export for `email dev` preview server
export default function ContactAutoReplyPreview() {
  return (
    <ContactAutoReply
      name="Alex Rivera"
      reply={`Thanks for the kind words about the portfolio — I'm glad it resonated.\n\nYour project sounds genuinely interesting. I've been thinking a lot about developer tooling lately, and the direction you described aligns with some of the problems I've been trying to solve too.\n\nI'd love to learn more. A quick call sounds great — feel free to pick a time that works for you at cal.com/kapil, or just reply here with what works.`}
    />
  )
}

export type SecretId =
  | 'devtools'
  | 'konami'
  | 'secret-page'
  | 'rage-click'
  | 'avatar-click'
  | 'command-palette'
  | 'matrix'
  | 'speedrunner'

export const TOTAL_SECRETS = 8

export const HINTS = [
  'Developers sometimes press F12',
  'Keyboards occasionally unlock things',
  'Not everything responds to clicks',
  'Curiosity helps',
]

export function getFoundSecrets(): SecretId[] {
  try {
    const raw = localStorage.getItem('kapil-secrets')
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data.found) ? data.found : []
  } catch {
    return []
  }
}

export function markSecretFound(id: SecretId): boolean {
  try {
    const found = getFoundSecrets()
    if (found.includes(id)) return false
    localStorage.setItem('kapil-secrets', JSON.stringify({ found: [...found, id] }))
    return true
  } catch {
    return false
  }
}

export function dispatchAchievement(id: SecretId, title: string) {
  window.dispatchEvent(
    new CustomEvent('unlock-achievement', { detail: { id, title } }),
  )
}

// Fetches your contributions and stats at build time
// Cache: ISR revalidate every 3600 seconds

export async function getGitHubStats() {
  const res = await fetch('https://api.github.com/users/kjxcodez', {
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
    next: { revalidate: 3600 },
  })
  return res.json()
}

export async function getContributions() {
  // Use GitHub Search API to find your PRs across repos
  const res = await fetch(
    'https://api.github.com/search/issues?q=author:kjxcodez+type:pr&sort=created&per_page=20',
    {
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
      next: { revalidate: 3600 },
    }
  )
  return res.json()
}
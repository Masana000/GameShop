export interface GameSuggestion {
  gameId: string
  score: number
  fromUser: string
}

export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0
  const intersection = [...a].filter(x => b.has(x)).length
  const union = new Set([...a, ...b]).size
  return intersection / union
}

export function suggestGames(userId: string, libraries: Map<string, Set<string>>): GameSuggestion[] {
  const mine = libraries.get(userId) ?? new Set()
  const best = new Map<string, { score: number; from: string }>()

  for (const [otherId, theirs] of libraries) {
    if (otherId === userId) continue
    const sim = jaccard(mine, theirs)
    if (sim === 0) continue

    for (const gameId of theirs) {
      if (mine.has(gameId)) continue
      const current = best.get(gameId)
      if (!current || sim > current.score) {
        best.set(gameId, { score: sim, from: otherId })
      }
    }
  }

  return Array.from(best.entries())
    .map(([gameId, { score, from }]) => ({ gameId, score, fromUser: from }))
    .sort((a, b) => b.score - a.score)
}

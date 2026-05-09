import { Graph } from '../core/Graph'

export interface FriendSuggestion {
  userId: string
  mutualFriends: string[]
}

export function suggestFriends(graph: Graph, userId: string): FriendSuggestion[] {
  const directFriends = new Set(graph.neighbors(userId))
  const suggestions = new Map<string, string[]>()

  for (const friend of directFriends) {
    for (const candidate of graph.neighbors(friend)) {
      if (candidate === userId || directFriends.has(candidate)) continue
      if (!suggestions.has(candidate)) suggestions.set(candidate, [])
      suggestions.get(candidate)!.push(friend)
    }
  }

  return Array.from(suggestions.entries())
    .map(([id, mutualFriends]) => ({ userId: id, mutualFriends }))
    .sort((a, b) => b.mutualFriends.length - a.mutualFriends.length)
}

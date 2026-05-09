import { Graph } from '../core/Graph'

export interface FriendSuggestion {
  userId: string
  mutualFriends: string[]
}

export interface FriendGameSuggestion {
  gameId: string
  ownedByFriends: string[]
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

export function suggestGamesByFriends(
  social: Graph,
  userId: string,
  libraries: Map<string, Set<string>>
): FriendGameSuggestion[] {
  const mine = libraries.get(userId) ?? new Set()
  const freq = new Map<string, string[]>()

  for (const friendId of social.neighbors(userId)) {
    for (const gameId of libraries.get(friendId) ?? []) {
      if (mine.has(gameId)) continue
      if (!freq.has(gameId)) freq.set(gameId, [])
      freq.get(gameId)!.push(friendId)
    }
  }

  return Array.from(freq.entries())
    .map(([gameId, ownedByFriends]) => ({ gameId, ownedByFriends }))
    .sort((a, b) => b.ownedByFriends.length - a.ownedByFriends.length)
}

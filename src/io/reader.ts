import { Graph } from '../core/Graph'
import type { User, Game, Interaction } from '../core/Graph'

export interface SeedData {
  users: User[]
  games: Game[]
  interactions: Interaction[]
}

export function buildGraphs(data: SeedData) {
  const social = new Graph()
  const bipartite = new Graph()
  const libraries = new Map<string, Set<string>>()

  for (const user of data.users) {
    social.addVertex(user.id)
    libraries.set(user.id, new Set(user.library))
    for (const friendId of user.friends) {
      social.addEdge(user.id, friendId)
    }
  }

  for (const game of data.games) {
    bipartite.addVertex(game.id)
  }

  for (const interaction of data.interactions) {
    bipartite.addEdge(interaction.userId, interaction.gameId, true)
    const lib = libraries.get(interaction.userId) ?? new Set()
    lib.add(interaction.gameId)
    libraries.set(interaction.userId, lib)
  }

  return { social, bipartite, libraries }
}

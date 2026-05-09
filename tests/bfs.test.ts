import { describe, it, expect } from 'vitest'
import { Graph } from '../src/core/Graph'
import { suggestFriends } from '../src/algorithms/bfs'

describe('BFS - suggestFriends', () => {
  it('caso base: sugere amigo de amigo com mutuo correto', () => {
    const g = new Graph()
    g.addEdge('u1', 'u2')
    g.addEdge('u2', 'u3')
    const result = suggestFriends(g, 'u1')
    expect(result[0].userId).toBe('u3')
    expect(result[0].mutualFriends).toContain('u2')
  })

  it('grafo vazio: nenhuma sugestao para usuario sem amigos', () => {
    const g = new Graph()
    g.addVertex('u1')
    expect(suggestFriends(g, 'u1')).toHaveLength(0)
  })

  it('grafo completo: nenhuma sugestao quando todos ja sao amigos', () => {
    const g = new Graph()
    g.addEdge('u1', 'u2')
    g.addEdge('u1', 'u3')
    g.addEdge('u2', 'u3')
    expect(suggestFriends(g, 'u1')).toHaveLength(0)
  })
})

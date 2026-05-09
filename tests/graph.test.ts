import { describe, it, expect } from 'vitest'
import { Graph } from '../src/core/Graph'

describe('Graph', () => {
  it('caso base: conecta vertices e consulta vizinhos', () => {
    const g = new Graph()
    g.addEdge('A', 'B')
    g.addEdge('B', 'C')
    expect(g.neighbors('A')).toContain('B')
    expect(g.neighbors('B')).toContain('A')
    expect(g.neighbors('B')).toContain('C')
  })

  it('grafo vazio: nenhum vertice ou vizinho', () => {
    const g = new Graph()
    expect(g.vertices()).toHaveLength(0)
    expect(g.neighbors('X')).toHaveLength(0)
    expect(g.size()).toBe(0)
  })

  it('grafo completo: todos conectados entre si', () => {
    const g = new Graph()
    const vs = ['A', 'B', 'C', 'D']
    for (const v of vs) for (const u of vs) if (v !== u) g.addEdge(v, u)
    for (const v of vs) expect(g.neighbors(v)).toHaveLength(vs.length - 1)
  })
})

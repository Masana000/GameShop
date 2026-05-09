import { describe, it, expect } from 'vitest'
import { jaccard, suggestGames } from '../src/algorithms/jaccard'

describe('Jaccard', () => {
  it('caso base: calcula similaridade corretamente', () => {
    const a = new Set(['g1', 'g2', 'g3'])
    const b = new Set(['g2', 'g3', 'g4'])
    expect(jaccard(a, b)).toBeCloseTo(0.5)
  })

  it('grafo vazio: similaridade zero para conjuntos vazios', () => {
    expect(jaccard(new Set(), new Set())).toBe(0)
  })

  it('grafo completo: recomenda jogo do usuario mais similar', () => {
    const libs = new Map([
      ['u1', new Set(['g1', 'g2'])],
      ['u2', new Set(['g1', 'g2', 'g3'])],
      ['u3', new Set(['g4', 'g5'])],
    ])
    const result = suggestGames('u1', libs)
    expect(result[0].gameId).toBe('g3')
    expect(result[0].fromUser).toBe('u2')
  })
})

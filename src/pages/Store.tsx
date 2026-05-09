import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../state'
import { buildGraphs } from '../io/reader'
import { suggestGamesByFriends } from '../algorithms/bfs'
import { suggestGames } from '../algorithms/jaccard'
import GameCard from '../components/GameCard'
import Layout from '../components/Layout'

export default function Store() {
  const { currentUserId, users, games, interactions, buyGame } = useStore()
  const navigate = useNavigate()

  const user = users.find(u => u.id === currentUserId)!

  const { social, libraries } = useMemo(
    () => buildGraphs({ users, games, interactions }),
    [users, games, interactions]
  )

  const friendSuggestions = useMemo(
    () => suggestGamesByFriends(social, currentUserId!, libraries),
    [social, currentUserId, libraries]
  )

  const jaccardSuggestions = useMemo(
    () => suggestGames(currentUserId!, libraries),
    [currentUserId, libraries]
  )

  const recommendations = useMemo(() => {
    const seen = new Set<string>()
    const result: { gameId: string; reason: string }[] = []

    for (const r of friendSuggestions.slice(0, 4)) {
      if (seen.has(r.gameId)) continue
      const names = r.ownedByFriends.map(id => users.find(u => u.id === id)?.displayName ?? id)
      result.push({ gameId: r.gameId, reason: `${names.join(', ')} ${names.length === 1 ? 'joga' : 'jogam'}` })
      seen.add(r.gameId)
    }

    for (const r of jaccardSuggestions.slice(0, 4)) {
      if (seen.has(r.gameId)) continue
      const fromName = users.find(u => u.id === r.fromUser)?.displayName ?? r.fromUser
      result.push({ gameId: r.gameId, reason: `Perfil similar a ${fromName} (${(r.score * 100).toFixed(0)}%)` })
      seen.add(r.gameId)
    }

    return result.slice(0, 6)
  }, [friendSuggestions, jaccardSuggestions, users])

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-8 py-10">
        {recommendations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold mb-1">Recomendado para voce</h2>
            <p className="text-xs text-gray-500 mb-6">
              Via grafo de amizades (BFS) e similaridade de perfil (Jaccard)
            </p>
            <div className="grid grid-cols-6 gap-4">
              {recommendations.map(({ gameId, reason }) => {
                const game = games.find(g => g.id === gameId)!
                return (
                  <GameCard
                    key={gameId}
                    game={game}
                    reason={reason}
                    onBuy={() => buyGame(gameId)}
                    onClick={() => navigate(`/game/${gameId}`)}
                  />
                )
              })}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold mb-6">Todos os jogos</h2>
          <div className="grid grid-cols-5 gap-4">
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                owned={user.library.includes(game.id)}
                onBuy={() => buyGame(game.id)}
                onClick={() => navigate(`/game/${game.id}`)}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}

import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../state'
import { buildGraphs } from '../io/reader'
import { suggestGamesByFriends } from '../algorithms/bfs'
import { suggestGames } from '../algorithms/jaccard'
import GameCard from '../components/GameCard'

export default function Store() {
  const { currentUserId, users, games, interactions, buyGame, logout } = useStore()
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
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-lg font-bold">GameShop</h1>
        <nav className="flex gap-8 text-sm text-gray-400">
          <button className="text-white font-medium">Loja</button>
          <button onClick={() => navigate('/profile')} className="hover:text-white transition-colors">
            Biblioteca
          </button>
          <button onClick={() => navigate('/profile')} className="hover:text-white transition-colors">
            Amigos
          </button>
          <button onClick={() => navigate('/admin')} className="hover:text-white transition-colors">
            Admin
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">{user.displayName}</span>
          <button
            onClick={logout}
            className="text-xs text-gray-500 hover:text-white transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
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
      </main>
    </div>
  )
}

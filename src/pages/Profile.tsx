import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../state'
import { buildGraphs } from '../io/reader'
import { suggestFriends } from '../algorithms/bfs'
import Layout from '../components/Layout'
import GameCard from '../components/GameCard'

export default function Profile() {
  const { currentUserId, users, games, interactions, addFriend } = useStore()
  const navigate = useNavigate()

  const user = users.find(u => u.id === currentUserId)!

  const { social } = useMemo(
    () => buildGraphs({ users, games, interactions }),
    [users, games, interactions]
  )

  const friendSuggestions = useMemo(
    () => suggestFriends(social, currentUserId!),
    [social, currentUserId]
  )

  const ownedGames = games.filter(g => user.library.includes(g.id))
  const friends = user.friends.map(id => users.find(u => u.id === id)).filter(Boolean) as typeof users

  const categoryCount = ownedGames.reduce<Record<string, number>>((acc, g) => {
    acc[g.category] = (acc[g.category] ?? 0) + 1
    return acc
  }, {})

  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-16 h-16 rounded-full bg-indigo-700 flex items-center justify-center text-2xl font-bold">
            {user.displayName[0]}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="text-gray-500 text-sm">@{user.username}</p>
            {topCategories.length > 0 && (
              <p className="text-gray-400 text-xs mt-1">
                Favoritos: {topCategories.map(([cat, n]) => `${cat} (${n})`).join(', ')}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Biblioteca — {ownedGames.length} jogos
            </h2>
            {ownedGames.length === 0 ? (
              <p className="text-gray-600 text-sm">Nenhum jogo na biblioteca ainda.</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {ownedGames.map(game => (
                  <GameCard
                    key={game.id}
                    game={game}
                    owned
                    onClick={() => navigate(`/game/${game.id}`)}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Amigos — {friends.length}
            </h2>
            <ul className="space-y-2 mb-8">
              {friends.length === 0 && (
                <p className="text-gray-600 text-sm">Nenhum amigo ainda.</p>
              )}
              {friends.map(f => (
                <li key={f.id} className="flex items-center gap-3 bg-gray-800 rounded-lg px-3 py-2">
                  <div className="w-7 h-7 rounded-full bg-indigo-700 flex items-center justify-center text-xs font-bold">
                    {f.displayName[0]}
                  </div>
                  <span className="text-sm">{f.displayName}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Sugestoes de amizade — BFS
            </h2>
            {friendSuggestions.length === 0 ? (
              <p className="text-gray-600 text-sm">Nenhuma sugestao no momento.</p>
            ) : (
              <ul className="space-y-2">
                {friendSuggestions.map(s => {
                  const suggested = users.find(u => u.id === s.userId)!
                  const mutuals = s.mutualFriends.map(id => users.find(u => u.id === id)?.displayName)
                  return (
                    <li key={s.userId} className="bg-gray-800 rounded-lg px-3 py-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold">
                            {suggested.displayName[0]}
                          </div>
                          <span className="text-sm">{suggested.displayName}</span>
                        </div>
                        <button
                          onClick={() => addFriend(s.userId)}
                          className="text-xs bg-indigo-600 hover:bg-indigo-500 px-2 py-1 rounded transition-colors"
                        >
                          Adicionar
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 ml-9">
                        {s.mutualFriends.length} em comum: {mutuals.join(', ')}
                      </p>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

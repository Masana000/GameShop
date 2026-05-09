import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Game, Interaction } from './core/Graph'
import type { SeedData } from './io/reader'
import seedRaw from '../data/seed.json'

const seed = seedRaw as SeedData

interface State {
  currentUserId: string | null
  users: User[]
  games: Game[]
  interactions: Interaction[]
  login: (id: string) => void
  logout: () => void
  buyGame: (gameId: string) => void
  addFriend: (targetId: string) => void
  addGame: (game: Omit<Game, 'id'>) => void
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      currentUserId: null,
      users: seed.users,
      games: seed.games,
      interactions: seed.interactions,

      login: (id) => set({ currentUserId: id }),

      logout: () => set({ currentUserId: null }),

      buyGame: (gameId) => {
        const { currentUserId, interactions, users } = get()
        if (!currentUserId) return
        if (interactions.some(i => i.userId === currentUserId && i.gameId === gameId)) return
        set({
          interactions: [
            ...interactions,
            { userId: currentUserId, gameId, purchasedAt: new Date().toISOString().split('T')[0] },
          ],
          users: users.map(u =>
            u.id === currentUserId ? { ...u, library: [...u.library, gameId] } : u
          ),
        })
      },

      addFriend: (targetId) => {
        const { currentUserId, users } = get()
        if (!currentUserId || currentUserId === targetId) return
        set({
          users: users.map(u => {
            if (u.id === currentUserId && !u.friends.includes(targetId))
              return { ...u, friends: [...u.friends, targetId] }
            if (u.id === targetId && !u.friends.includes(currentUserId))
              return { ...u, friends: [...u.friends, currentUserId] }
            return u
          }),
        })
      },

      addGame: (gameData) => {
        const { games } = get()
        set({ games: [...games, { ...gameData, id: `g${Date.now()}` }] })
      },
    }),
    { name: 'gameshop' }
  )
)

import { useNavigate } from 'react-router-dom'
import { useStore } from '../state'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { currentUserId, users, logout } = useStore()
  const navigate = useNavigate()
  const user = users.find(u => u.id === currentUserId)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/store')} className="text-lg font-bold hover:text-gray-300 transition-colors">
          GameShop
        </button>
        <nav className="flex gap-8 text-sm text-gray-400">
          <button onClick={() => navigate('/store')} className="hover:text-white transition-colors">
            Loja
          </button>
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
          <span className="text-sm text-gray-300">{user?.displayName}</span>
          <button onClick={logout} className="text-xs text-gray-500 hover:text-white transition-colors">
            Sair
          </button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { useStore } from '../state'

export default function Login() {
  const { users, login } = useStore()
  const navigate = useNavigate()

  const handleSelect = (id: string) => {
    login(id)
    navigate('/store')
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-2">GameShop</h1>
      <p className="text-gray-500 text-sm mb-12">Quem esta jogando?</p>

      <div className="grid grid-cols-4 gap-6">
        {users.map(user => (
          <button
            key={user.id}
            onClick={() => handleSelect(user.id)}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-24 h-24 rounded-xl bg-gray-800 group-hover:bg-indigo-600 transition-colors flex items-center justify-center text-2xl font-bold text-gray-300 group-hover:text-white">
              {user.displayName[0].toUpperCase()}
            </div>
            <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
              {user.displayName}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

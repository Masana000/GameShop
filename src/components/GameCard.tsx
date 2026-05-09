import type { Game } from '../core/Graph'

interface Props {
  game: Game
  owned?: boolean
  reason?: string
  onBuy?: () => void
  onClick?: () => void
}

const GRADIENTS: Record<string, string> = {
  RPG: 'from-purple-900 to-purple-950',
  Action: 'from-red-900 to-red-950',
  FPS: 'from-sky-900 to-sky-950',
  Simulation: 'from-green-900 to-green-950',
  Sandbox: 'from-amber-900 to-amber-950',
}

export default function GameCard({ game, owned, reason, onBuy, onClick }: Props) {
  const gradient = GRADIENTS[game.category] ?? 'from-gray-700 to-gray-900'

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all"
    >
      <div className={`h-36 bg-gradient-to-b ${gradient} relative`}>
        <img
          src={game.cover}
          alt={game.title}
          className="w-full h-full object-cover"
          onError={e => {
            ;(e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        {owned && (
          <span className="absolute top-2 right-2 bg-green-700 text-white text-xs px-2 py-0.5 rounded">
            Na biblioteca
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="font-semibold text-sm truncate">{game.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{game.category}</p>

        {reason && (
          <p className="text-xs text-indigo-400 mt-1 truncate" title={reason}>
            {reason}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium">
            {game.price === 0 ? 'Gratuito' : `R$ ${game.price.toFixed(2)}`}
          </span>
          {!owned && onBuy && (
            <button
              onClick={e => {
                e.stopPropagation()
                onBuy()
              }}
              className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded transition-colors"
            >
              Comprar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

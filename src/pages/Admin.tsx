import { useState, useRef } from 'react'
import { useStore } from '../state'
import Layout from '../components/Layout'

const CATEGORIES = ['RPG', 'Action', 'FPS', 'Simulation', 'Sandbox']
const EMPTY = { title: '', category: '', description: '', price: '' }

export default function Admin() {
  const { games, addGame, deleteGame, generateRandom, resetData } = useStore()
  const [form, setForm] = useState(EMPTY)
  const [cover, setCover] = useState('')
  const [preview, setPreview] = useState('')
  const [success, setSuccess] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setCover(result)
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.category.trim()) return
    addGame({
      title: form.title.trim(),
      category: form.category.trim(),
      description: form.description.trim(),
      cover,
      price: parseFloat(form.price) || 0,
    })
    setForm(EMPTY)
    setCover('')
    setPreview('')
    if (fileRef.current) fileRef.current.value = ''
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Painel Admin</h1>
          <div className="flex gap-3">
            <button
              onClick={generateRandom}
              className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
            >
              Gerar dados aleatorios
            </button>
            <button
              onClick={resetData}
              className="text-sm bg-red-900 hover:bg-red-800 px-4 py-2 rounded transition-colors"
            >
              Resetar tudo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Adicionar jogo
            </h2>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Titulo</label>
              <input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white"
                placeholder="Ex: Dark Souls III"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Categoria</label>
              <input
                list="categories"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white"
                placeholder="RPG, Action, FPS..."
              />
              <datalist id="categories">
                {CATEGORIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Descricao</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white resize-none"
                rows={3}
                placeholder="Descricao do jogo..."
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Preco (G$)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Capa</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="w-full text-sm text-gray-400 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-gray-700 file:text-white hover:file:bg-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded text-sm font-medium transition-colors"
            >
              {success ? 'Jogo adicionado!' : 'Adicionar jogo'}
            </button>
          </form>

          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
              Previa
            </h2>
            <div className="bg-gray-800 rounded-lg overflow-hidden w-48">
              <div className="h-36 bg-gray-700 flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-600 text-xs">sem imagem</span>
                )}
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm truncate">{form.title || 'Titulo do jogo'}</p>
                <p className="text-xs text-gray-500 mt-0.5">{form.category || 'Categoria'}</p>
                <p className="text-sm font-medium mt-2">
                  {form.price ? `R$ ${parseFloat(form.price).toFixed(2)}` : 'R$ 0.00'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Jogos cadastrados — {games.length}
          </h2>
          <div className="space-y-2">
            {games.map(game => (
              <div key={game.id} className="flex items-center justify-between bg-gray-800 rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{game.title}</p>
                  <p className="text-xs text-gray-500">{game.category} — R$ {game.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => deleteGame(game.id)}
                  className="text-xs text-red-500 hover:text-red-400 transition-colors"
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

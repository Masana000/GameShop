import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './state'
import Login from './pages/Login'
import Store from './pages/Store'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const currentUserId = useStore(s => s.currentUserId)
  return currentUserId ? <>{children}</> : <Navigate to="/" />
}

export default function App() {
  const currentUserId = useStore(s => s.currentUserId)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUserId ? <Navigate to="/store" /> : <Login />} />
        <Route path="/store" element={<PrivateRoute><Store /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

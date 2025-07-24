import { Routes, Route } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App

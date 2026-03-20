import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import Home from './pages/Home'
import Explainer from './pages/Explainer'
import Features from './pages/Features'
import Contact from './pages/Contact'
import ComingSoon from './pages/ComingSoon'
import AuthPage from './pages/auth/AuthPage'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import { ROUTES } from './config/routes'

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.EXPLAINER} element={<Explainer />} />
          <Route path={ROUTES.FEATURES} element={<Features />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={ROUTES.COMING_SOON} element={<ComingSoon />} />
        <Route path={ROUTES.AUTH} element={<AuthPage />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App

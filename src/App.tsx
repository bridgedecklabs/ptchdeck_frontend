import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'

// auth
import AuthPage from './pages/auth/AuthPage'
import AuthAction from './pages/auth/AuthAction'
import InviteAcceptPage from './pages/auth/InviteAcceptPage'

// dashboard
import Dashboard from './pages/dashboard/Dashboard'

// marketing
import Home from './pages/marketing/Home'
import Explainer from './pages/marketing/Explainer'
import Features from './pages/marketing/Features'
import Contact from './pages/marketing/Contact'
import ComingSoon from './pages/marketing/ComingSoon'
import Blog from './pages/marketing/Blog'
import BlogPost from './pages/marketing/BlogPost'
import VCDirectory from './pages/marketing/VCDirectory'
import VCProfile from './pages/marketing/VCProfile'
import Glossary from './pages/marketing/Glossary'
import GlossaryTerm from './pages/marketing/GlossaryTerm'

// legal
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsOfService from './pages/legal/TermsOfService'

// misc
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
          <Route path={ROUTES.BLOG} element={<Blog />} />
          <Route path={ROUTES.BLOG_POST} element={<BlogPost />} />
          <Route path={ROUTES.VC_DIRECTORY} element={<VCDirectory />} />
          <Route path={ROUTES.VC_PROFILE} element={<VCProfile />} />
          <Route path={ROUTES.GLOSSARY} element={<Glossary />} />
          <Route path={ROUTES.GLOSSARY_TERM} element={<GlossaryTerm />} />
          <Route path={ROUTES.PRIVACY} element={<PrivacyPolicy />} />
          <Route path={ROUTES.TERMS} element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={ROUTES.COMING_SOON} element={<ComingSoon />} />
        <Route
          path={ROUTES.AUTH}
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route path={ROUTES.AUTH_ACTION} element={<AuthAction />} />
        <Route path={ROUTES.INVITE_ACCEPT} element={<InviteAcceptPage />} />
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

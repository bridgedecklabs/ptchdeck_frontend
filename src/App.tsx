import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'
import DashboardLayout from './components/dashboard/DashboardLayout'
import Home from './pages/Home'
import Explainer from './pages/Explainer'
import Features from './pages/Features'
import Contact from './pages/Contact'
import ComingSoon from './pages/ComingSoon'
import AuthPage from './pages/auth/AuthPage'
import AuthAction from './pages/AuthAction'
import NotFound from './pages/NotFound'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import VCDirectory from './pages/VCDirectory'
import VCProfile from './pages/VCProfile'
import Glossary from './pages/Glossary'
import GlossaryTerm from './pages/GlossaryTerm'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import Overview from './pages/dashboard/Overview'
import Upload from './pages/dashboard/Upload'
import Scoreboard from './pages/dashboard/Scoreboard'
import Pipeline from './pages/dashboard/Pipeline'
import Portfolio from './pages/dashboard/Portfolio'
import MarketTrends from './pages/dashboard/MarketTrends'
import StartupDetail from './pages/dashboard/StartupDetail'
import Users from './pages/dashboard/Users'
import Connectors from './pages/dashboard/Connectors'
import Settings from './pages/dashboard/Settings'
import Billing from './pages/dashboard/Billing'
import { ROUTES } from './config/routes'

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* Public landing site */}
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

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="upload" element={<Upload />} />
          <Route path="scoreboard" element={<Scoreboard />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="market" element={<MarketTrends />} />
          <Route path="market/startup/:id" element={<StartupDetail />} />
          <Route path="users" element={<Users />} />
          <Route path="connectors" element={<Connectors />} />
          <Route path="settings" element={<Settings />} />
          <Route path="billing" element={<Billing />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Explainer from './pages/Explainer'
import Features from './pages/Features'
import Contact from './pages/Contact'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'
import { ROUTES } from './config/routes'

function App() {
  return (
    <>
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
      </Routes>
    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import ScrollToHash from './components/ScrollToHash'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import ProjectPage from './pages/ProjectPage'

/** 首页：首屏 → 项目 → 关于 → 联系。章节编号与这里的顺序保持一致。 */
function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-ink">
      <ScrollToHash />
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  )
}

export default App

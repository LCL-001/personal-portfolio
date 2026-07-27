import { Route, Routes } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectDetail from './components/ProjectDetail'
import Projects from './components/Projects'
import ScrollToHash from './components/ScrollToHash'
import Timeline from './components/Timeline'
import avatarPlaceholder from './assets/avatar-placeholder.svg'

function HomePage() {
  return <><Hero avatarSrc={avatarPlaceholder} /><About /><Projects /><Timeline /><Contact /></>
}

function App() {
  return (
    <div className="min-h-screen bg-[var(--page-background)] text-[var(--text)] transition-colors duration-300">
      <ScrollToHash />
      <Header />
      <main><Routes><Route path="/" element={<HomePage />} /><Route path="/projects/:slug" element={<ProjectDetail />} /></Routes></main>
      <Footer />
    </div>
  )
}

export default App

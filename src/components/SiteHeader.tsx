import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * 站内跳转一律用 react-router 的 Link：它会把部署前缀（basename）算进去。
 * 这里如果用裸 <a href="/#projects">，部署到 GitHub Pages 子路径后会跳到站点根，
 * 直接 404。
 */
const NAV = [
  { to: '/#projects', label: '项目' },
  { to: '/#about', label: '关于' },
  { to: '/#contact', label: '联系' },
]

/**
 * 顶部导航。编辑风的处理方式：不用卡片、不用阴影，
 * 只用一条发丝线和一层半透明底，让内容保持在视觉主角位置。
 */
function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? 'border-rule bg-ink/85 backdrop-blur-sm' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 py-5">
        <Link to="/" className="font-serif text-lg tracking-tight text-white">
          刘灿霖
        </Link>

        <nav className="flex items-baseline gap-6">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-mono text-xs tracking-[0.16em] text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/LCL-001"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs tracking-[0.16em] text-muted transition-colors hover:text-accent"
          >
            GITHUB
          </a>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader

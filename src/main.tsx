import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

/**
 * 部署在 GitHub Pages 的项目子路径下时，地址栏路径是 /personal-portfolio/...，
 * 而不是 /...。BrowserRouter 必须知道这段前缀（basename），否则所有路由都匹配不上，
 * 页面会只渲染页头页脚、主体空白。
 *
 * Vite 会把构建时的 base 注入 import.meta.env.BASE_URL：
 * 本地开发与绑定自有域名时是 "/"，部署到子路径时是 "/personal-portfolio/"。
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

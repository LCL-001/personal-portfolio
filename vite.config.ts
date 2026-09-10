import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 部署到 GitHub Pages 子路径时用 CLI 覆盖：vite build --base=/personal-portfolio/
// 见 package.json 的 build:pages 脚本。这里保持根路径，便于本地开发与后续绑定自有域名。
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

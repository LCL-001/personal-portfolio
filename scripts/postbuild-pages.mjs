/**
 * GitHub Pages 后处理。
 *
 * Pages 不做 SPA 重写，直接访问 /projects/react-tool-agent 会 404，
 * 所以在产物里补一份 404.html（GitHub Pages 会用 404.html 兜底，
 * 浏览器随后按 URL 做客户端路由，页面即可正常渲染）。
 */
import { copyFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const index = resolve(root, 'dist/index.html')
const fallback = resolve(root, 'dist/404.html')

if (!existsSync(index)) {
  console.error('dist/index.html 不存在，请先执行构建')
  process.exit(1)
}

copyFileSync(index, fallback)
console.log('已生成 dist/404.html（SPA 深链接兜底）')

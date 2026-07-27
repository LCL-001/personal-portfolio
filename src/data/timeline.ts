import type { LocalizedText } from './locale'

export type TimelineEntry = {
  period: string
  title: LocalizedText
  description: LocalizedText
}

/** Education and delivery milestones displayed in chronological order. */
export const timeline: TimelineEntry[] = [
  {
    period: '2024.09 — 2028.07',
    title: { zh: '华南农业大学 · 计算机科学与技术', en: 'South China Agricultural University · Computer Science' },
    description: { zh: '本科在读，系统学习计算机基础与软件工程实践。', en: 'Undergraduate study focused on computer science fundamentals and software engineering.' },
  },
  {
    period: '2025.12 — 2026.02',
    title: { zh: 'AI 智能体平台 · 全栈开发', en: 'AI Agent Platform · Full-stack development' },
    description: { zh: '实现会话记忆、RAG 检索、工具调用、任务规划与 SSE 流式输出。', en: 'Built conversation memory, RAG retrieval, tool calling, task planning, and SSE streaming.' },
  },
  {
    period: '2026.02 — 2026.05',
    title: { zh: '火山图库 · 后端开发', en: 'Volcano Gallery · Backend development' },
    description: { zh: '完成 RBAC 权限、多级缓存、AI 扩图与多人协同编辑能力。', en: 'Delivered RBAC, multi-level caching, AI image expansion, and collaborative editing.' },
  },
]

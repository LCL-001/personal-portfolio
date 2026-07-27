import analyticsScreenshot from '../assets/project-insights.svg'
import storefrontScreenshot from '../assets/project-storefront.svg'
import type { LocalizedText } from './locale'

export type ProjectMetric = {
  value: string
  label: LocalizedText
}

export type Project = {
  slug: string
  title: LocalizedText
  description: LocalizedText
  image: string
  imageAlt: LocalizedText
  period: string
  role: LocalizedText
  technologies: string[]
  highlights: LocalizedText[]
  metrics: ProjectMetric[]
  href: string
}

/** Centralized project content makes portfolio updates straightforward. */
export const projects: Project[] = [
  {
    slug: 'volcano-gallery',
    title: { zh: '火山图库', en: 'Volcano Gallery' },
    description: {
      zh: '图片与素材管理后端，支持空间权限、多级缓存、批量抓取、AI 扩图及多人协同编辑。',
      en: 'An image asset management backend with space permissions, multi-level caching, bulk collection, AI expansion, and collaborative editing.',
    },
    image: analyticsScreenshot,
    imageAlt: { zh: '火山图库的项目展示截图', en: 'Volcano Gallery project preview' },
    period: '2026.02 — 2026.05',
    role: { zh: '后端开发', en: 'Backend development' },
    technologies: ['Spring Boot 3', 'Redis', 'Caffeine', 'WebSocket', '腾讯云 COS'],
    highlights: [
      { zh: '使用 Sa-Token 构建多租户 RBAC 权限模型，并通过自定义注解实现方法级鉴权。', en: 'Built a multi-tenant RBAC model with Sa-Token and custom annotations for method-level authorization.' },
      { zh: '设计 Redis + Caffeine 两级缓存，通过随机过期策略降低缓存雪崩风险。', en: 'Designed Redis and Caffeine multi-level caching with randomized expiry to reduce cache avalanche risk.' },
      { zh: '基于 WebSocket、Disruptor 与事件驱动实现多人协同编辑，并维护图片级编辑锁。', en: 'Implemented collaborative editing with WebSocket, Disruptor, event-driven flows, and image-level editing locks.' },
    ],
    metrics: [
      { value: '7.6×', label: { zh: 'QPS 提升', en: 'QPS improvement' } },
      { value: '8.2×', label: { zh: '平均响应加速', en: 'Average response speedup' } },
      { value: '100', label: { zh: '并发压测', en: 'Concurrent test users' } },
    ],
    href: 'https://www.lincode.online',
  },
  {
    slug: 'ai-agent-platform',
    title: { zh: 'AI 智能体平台', en: 'AI Agent Platform' },
    description: {
      zh: '企业级 AI 智能体平台，支持多轮对话、RAG 知识库检索、工具调用与自主任务规划。',
      en: 'An enterprise AI agent platform with multi-turn conversation, RAG retrieval, tool calling, and autonomous task planning.',
    },
    image: storefrontScreenshot,
    imageAlt: { zh: 'AI 智能体平台的项目展示截图', en: 'AI Agent Platform project preview' },
    period: '2025.12 — 2026.02',
    role: { zh: '全栈开发', en: 'Full-stack development' },
    technologies: ['Spring AI', 'PgVector', 'PostgreSQL', 'SSE', 'Tool Calling'],
    highlights: [
      { zh: '自定义 DataBaseChatMemory，以 MySQL 持久化会话历史并保障多轮上下文连贯。', en: 'Created DataBaseChatMemory to persist conversation history in MySQL for coherent multi-turn context.' },
      { zh: '结合 PgVector、EmbeddingModel 与 PostgreSQL，实现语义相似度检索和多维过滤。', en: 'Combined PgVector, EmbeddingModel, and PostgreSQL for semantic retrieval with multi-dimensional filtering.' },
      { zh: '构建 BaseAgent → ReActAgent → ToolCallAgent 三层架构，并使用 SSE 流式推送任务状态。', en: 'Built a BaseAgent → ReActAgent → ToolCallAgent architecture and streamed task states with SSE.' },
    ],
    metrics: [
      { value: '80%', label: { zh: '等待感知降低', en: 'Lower perceived waiting' } },
      { value: '3', label: { zh: 'Agent 分层', en: 'Agent layers' } },
      { value: '6+', label: { zh: '可调用工具', en: 'Callable tools' } },
    ],
    href: 'https://github.com/LCL-001/my-ai-agent',
  },
]

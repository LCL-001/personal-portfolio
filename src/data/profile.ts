import type { LocalizedText } from './locale'

export type ContactLink = {
  label: string
  href: string
  external?: boolean
}

/** Replace the values here with your own profile and contact details. */
export const profile: {
  name: string
  heroTitle: LocalizedText
  heroDescription: LocalizedText
  avatarAlt: LocalizedText
  about: LocalizedText[]
  email: string
  contactLinks: ContactLink[]
} = {
  name: '刘灿霖',
  heroTitle: { zh: '你好，我是刘灿霖', en: 'Hi, I’m Canlin Liu' },
  heroDescription: {
    zh: '华南农业大学计算机科学与技术专业本科在读，专注于 Java 后端开发、AI 应用与高可用服务设计。',
    en: 'An undergraduate Computer Science student focused on Java backend development, AI applications, and reliable services.',
  },
  avatarAlt: { zh: '刘灿霖的头像占位图', en: 'Avatar placeholder for Canlin Liu' },
  about: [
    {
      zh: '我熟悉 Java 基础、并发编程和 JVM 运行机制，能够使用 Spring Boot 3、Spring MVC 与 MyBatis-Plus 构建清晰、可维护的后端服务。',
      en: 'I build clear, maintainable backend services with Java, Spring Boot 3, Spring MVC, and MyBatis-Plus, backed by knowledge of concurrency and the JVM.',
    },
    {
      zh: '我关注缓存、权限和异步任务等工程细节，也持续探索 Spring AI、RAG、ReAct Agent 与 MCP 工具扩展在真实场景中的落地方式。',
      en: 'I care about caching, access control, and asynchronous work while applying Spring AI, RAG, ReAct Agents, and MCP tool extensions to real scenarios.',
    },
  ],
  email: '3613503569@qq.com',
  contactLinks: [{ label: 'GitHub', href: 'https://github.com/LCL-001', external: true }],
}

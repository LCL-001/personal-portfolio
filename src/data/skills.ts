export type SkillGroup = {
  category: string
  items: string[]
}

/**
 * 技能清单只列在项目里真实用过的技术——简历上写"熟悉"而代码里找不到，
 * 是面试最容易翻车的地方。
 *
 * 注意：`mq-demo` 用的是 spring-boot-starter-amqp（RabbitMQ），
 * 而简历写的是 RocketMQ，两者需要你自己统一口径。
 */
export const skillGroups: SkillGroup[] = [
  {
    category: '后端',
    items: ['Java', 'Spring Boot 3', 'Spring MVC', 'MyBatis-Plus', 'Sa-Token', 'AOP 方法级鉴权'],
  },
  {
    category: '数据',
    items: ['MySQL', 'Redis', 'Caffeine', 'RabbitMQ', 'pgvector'],
  },
  {
    category: 'AI 应用',
    items: ['Spring AI', 'RAG 检索增强', 'ReAct Agent', 'MCP 工具扩展', 'SSE 流式输出'],
  },
  {
    category: '工程',
    items: ['Git', 'Maven', 'Docker', 'JMeter 压测', 'Nginx'],
  },
]

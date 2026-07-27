export type Skill = {
  name: string
  category: 'Backend' | 'Data' | 'AI' | 'Engineering'
}

/** Skills are grouped by discipline so the About section can stay data-driven. */
export const skills: Skill[] = [
  { name: 'Java', category: 'Backend' },
  { name: 'Spring Boot 3', category: 'Backend' },
  { name: 'Spring MVC', category: 'Backend' },
  { name: 'MyBatis-Plus', category: 'Backend' },
  { name: 'MySQL', category: 'Data' },
  { name: 'Redis', category: 'Data' },
  { name: 'RabbitMQ', category: 'Data' },
  { name: 'Spring AI', category: 'AI' },
  { name: 'RAG', category: 'AI' },
  { name: 'MCP', category: 'AI' },
  { name: 'ReAct Agent', category: 'AI' },
  { name: 'Git', category: 'Engineering' },
  { name: 'Maven', category: 'Engineering' },
  { name: 'Docker', category: 'Engineering' },
]

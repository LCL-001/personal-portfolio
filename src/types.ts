/**
 * 作品集内容模型。
 *
 * 这里的核心设计是：每个数字都必须挂一条 `source`。
 * 作品集最容易塌房的地方是"指标漂亮但讲不出来源"——面试官一追问就露馅。
 * 把出处写进数据结构，等于把"可核验"变成编译期约束，而不是写文案时的自觉。
 */

/** 可核验指标。source 会直接渲染在页面上，读者可据此追问。 */
export type Metric = {
  /** 展示值，如 "204.95" */
  value: string
  /** 单位，如 "ms" */
  unit?: string
  /** 指标名，如 "缓存路径 p95" */
  label: string
  /** 原始出处：文件路径 / 场景名 / 数据集 */
  source: string
  /** 测量方法，回答"这个数是怎么来的" */
  method: string
}

/** 关键技术决策。面试追问几乎都落在这五段上。 */
export type Decision = {
  /** 什么场景下遇到了什么麻烦，要具体到数量级 */
  problem: string
  /** 具体怎么做 */
  approach: string
  /** 为什么这么选 */
  rationale: string
  /** 被否掉的替代方案及原因 */
  rejected: string
  /** 这个方案的代价与局限——主动交底比被问出来好 */
  tradeoff: string
}

export type ProjectLink = {
  label: string
  href: string
  /** 说明这个链接能证明什么，避免读者点进去不知道看什么 */
  note?: string
}

/** 项目工程量，用来替代"企业级""高并发"这类无法验证的形容词。 */
export type ScaleItem = {
  label: string
  value: string
}

/** 架构图的一层。数据驱动渲染，避免为每个项目手搓一张 SVG 而后期失修。 */
export type ArchitectureLayer = {
  /** 层名，如 "接入" / "服务" / "存储" */
  label: string
  nodes: {
    name: string
    /** 一句话说明这层在做什么 */
    note?: string
    /** true = 自己写的；false/省略 = 中间件或现成组件。图上会有视觉区分 */
    selfBuilt?: boolean
  }[]
}

export type Project = {
  slug: string
  title: string
  /** 一句话定位：是什么、解决什么问题，不用形容词 */
  oneLiner: string
  role: string
  period: string
  stack: string[]
  links: ProjectLink[]
  scale: ScaleItem[]
  metrics: Metric[]
  architecture: ArchitectureLayer[]
  decisions: Decision[]
  /** 压测或使用中暴露的瓶颈 */
  bottlenecks: { title: string; body: string }[]
  /** 已知短板：主动交底，反而增加可信度 */
  limitations: string[]
}

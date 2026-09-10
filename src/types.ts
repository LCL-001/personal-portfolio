/**
 * 作品集内容模型。
 *
 * 写作基调：先说做成什么、值钱在哪，数字必须真实。
 * 每条指标挂一条 source，来源直接渲染在页面上——
 * 讲不出来的数字没有地方放。
 */

/** 可核验指标。source 是一行出处说明，随指标一起展示。 */
export type Metric = {
  /** 展示值，如 "204.95" */
  value: string
  /** 单位，如 "ms" */
  unit?: string
  /** 指标名，如 "缓存路径 p95" */
  label: string
  /** 出处：文件路径 / 场景名 / 数据集 */
  source: string
}

/** 核心亮点：做成了什么、量级多少。是项目页的主要卖点。 */
export type Highlight = {
  title: string
  body: string
}

/** 关键取舍：当时为什么这么做，用叙事而不是表单写。 */
export type Story = {
  title: string
  body: string
}

export type ProjectLink = {
  label: string
  href: string
  /** 说明这个链接能证明什么 */
  note?: string
}

/** 项目工程量，用数字代替"企业级""高并发"这类无法验证的形容词。 */
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
    /** true = 自己写的；省略 = 中间件或现成组件。图上会有视觉区分 */
    selfBuilt?: boolean
  }[]
}

export type Project = {
  slug: string
  title: string
  /** 一句话定位：是什么、解决什么问题 */
  oneLiner: string
  role: string
  period: string
  stack: string[]
  links: ProjectLink[]
  scale: ScaleItem[]
  metrics: Metric[]
  architecture: ArchitectureLayer[]
  /** 项目配图（真实截图），可选 */
  image?: string
  imageAlt?: string
  highlights: Highlight[]
  stories: Story[]
}

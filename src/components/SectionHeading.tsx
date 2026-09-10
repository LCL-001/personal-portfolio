type SectionHeadingProps = {
  /** 章节编号，如 "01"——编辑风用编号建立阅读节奏 */
  index: string
  title: string
  /** 章节导语，说明这一节回答什么问题 */
  lede?: string
}

/** 章节标题。上方一条发丝线 + 等宽编号 + 衬线标题，构成统一的章节入口。 */
function SectionHeading({ index, title, lede }: SectionHeadingProps) {
  return (
    <div className="border-t border-rule pt-6">
      <p className="section-index">{index}</p>
      <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">{title}</h2>
      {lede ? <p className="measure mt-4 text-base leading-8 text-muted">{lede}</p> : null}
    </div>
  )
}

export default SectionHeading

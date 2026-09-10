import type { Story } from '../types'

/**
 * 关键取舍：一条一个标题、一段正文，用叙事写。
 * 不再拆成"问题/做法/为什么/否掉的方案/代价"五个格子——
 * 那种写法读起来像验收表，不像一个工程师在讲自己怎么想问题。
 */
function StoryBlock({ story, index }: { story: Story; index: number }) {
  return (
    <article className="border-t border-rule pt-8">
      <p className="font-mono text-xs tracking-[0.16em] text-accent">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="mt-4 font-serif text-xl font-normal tracking-tight text-white sm:text-2xl">
        {story.title}
      </h3>
      <p className="measure mt-4 text-sm leading-8 text-body">{story.body}</p>
    </article>
  )
}

export default StoryBlock

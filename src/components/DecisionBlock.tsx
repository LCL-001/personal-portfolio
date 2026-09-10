import type { Decision } from '../types'

const FIELDS: { key: keyof Decision; label: string }[] = [
  { key: 'problem', label: '问题' },
  { key: 'approach', label: '做法' },
  { key: 'rationale', label: '为什么这样选' },
  { key: 'rejected', label: '否掉的方案' },
  { key: 'tradeoff', label: '代价与局限' },
]

/**
 * 单个技术决策。五段式结构对应面试追问的顺序：
 * 为什么要做 → 怎么做 → 为什么不用别的 → 有什么代价。
 * 「代价与局限」主动写出来，比被追问出来好。
 */
function DecisionBlock({ decision, index }: { decision: Decision; index: number }) {
  return (
    <article className="border-t border-rule pt-8">
      <p className="font-mono text-xs tracking-[0.16em] text-accent">
        决策 {String(index + 1).padStart(2, '0')}
      </p>

      <dl className="mt-6 space-y-5">
        {FIELDS.map((field) => (
          <div key={field.key} className="grid gap-2 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
            <dt className="font-mono text-xs leading-7 tracking-[0.08em] text-muted">
              {field.label}
            </dt>
            <dd className="measure text-sm leading-7 text-body">{decision[field.key]}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

export default DecisionBlock

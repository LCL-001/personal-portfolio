import type { Metric } from '../types'

/**
 * 指标网格。每个数字下面永远带着出处和方法——
 * 这是这个作品集最重要的一个设计决定：让"讲不出来源"的数字没地方藏。
 */
function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <li key={metric.label + metric.value} className="border-t border-rule py-6 sm:pr-8">
          <p className="font-mono text-3xl tracking-tight text-white">
            {metric.value}
            {metric.unit ? <span className="ml-1 text-sm text-muted">{metric.unit}</span> : null}
          </p>
          <p className="mt-3 text-sm text-body">{metric.label}</p>

          <dl className="mt-5 space-y-2">
            <div className="flex gap-2">
              <dt className="shrink-0 font-mono text-[0.65rem] tracking-[0.12em] text-muted">出处</dt>
              <dd className="font-mono text-[0.65rem] leading-4 text-muted">{metric.source}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-mono text-[0.65rem] tracking-[0.12em] text-muted">方法</dt>
              <dd className="font-mono text-[0.65rem] leading-4 text-muted">{metric.method}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  )
}

export default MetricGrid

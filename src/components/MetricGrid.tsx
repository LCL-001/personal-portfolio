import type { Metric } from '../types'

/**
 * 指标网格：大数字 + 一行出处。
 * 出处保留但收成一行小字，不再展开测量方法——方法的细节留给面试口头讲。
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
          <p className="mt-3 font-mono text-[0.65rem] leading-4 text-muted">{metric.source}</p>
        </li>
      ))}
    </ul>
  )
}

export default MetricGrid

import type { ArchitectureLayer } from '../types'

/**
 * 架构分层图。用排版而不是装饰来表达层次：
 * 每层一条横向发丝线 + 等宽层名，节点用细边框方块。
 * 自研组件用强调色左边框标记——面试官一眼能看出哪些是自己写的。
 */
function ArchitectureFlow({ layers }: { layers: ArchitectureLayer[] }) {
  return (
    <div className="space-y-px">
      {layers.map((layer) => (
        <div key={layer.label} className="grid gap-4 border-t border-rule py-5 sm:grid-cols-[7rem_minmax(0,1fr)]">
          <p className="font-mono text-xs tracking-[0.16em] text-muted">{layer.label}</p>

          <ul className="flex flex-wrap gap-3">
            {layer.nodes.map((node) => (
              <li
                key={node.name}
                className={`border-y border-r border-rule bg-surface px-4 py-3 ${
                  node.selfBuilt ? 'border-l-2 border-l-accent' : 'border-l border-l-rule'
                }`}
              >
                <p className="font-mono text-sm text-white">{node.name}</p>
                {node.note ? (
                  <p className="mt-1.5 max-w-xs text-xs leading-5 text-muted">{node.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <p className="border-t border-rule pt-4 font-mono text-xs text-muted">
        左侧带强调色边框 = 自己实现的部分
      </p>
    </div>
  )
}

export default ArchitectureFlow

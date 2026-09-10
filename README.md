# 个人作品集网站

刘灿霖的个人作品集。深色编辑风，中文单语，三个后端项目的完整工程记录。

线上地址：https://lcl-001.github.io/personal-portfolio/

## 这个项目想解决什么

作品集最容易塌房的地方是：**指标写得很漂亮，但讲不出来源**。面试官问一句"这个 8.2 倍是怎么测出来的"，整份简历的可信度就跟着塌了。

所以这个站点的核心不是视觉，而是一条内容约束：

> **每个数字都必须挂一条 `source`。**

这条约束被写进了数据类型，而不是停留在写作时的自觉：

```ts
// src/types.ts
export type Metric = {
  value: string      // 展示值
  unit?: string      // 单位
  label: string      // 指标名
  source: string     // 原始出处：文件路径 / JMeter 场景名 / 代码行号
  method: string     // 测量方法，回答"这个数是怎么来的"
}
```

`source` 和 `method` 会直接渲染在页面上。一个找不到出处的数字，在这个结构里没有地方可放。

同样出于这个考虑，每个项目的「已知短板」是数据模型里的必填字段（`Project.limitations`），主动交底内容包括没有单元测试、没有 CI、分表未启用、压测未覆盖写路径等。主动写在前面，比被追问出来好。

## 技术栈

- React 19 + TypeScript + Vite 8
- Tailwind CSS 4（设计令牌集中在 `src/index.css` 的 `@theme` 块）
- React Router 7（首页单页 + `/projects/:slug` 三个项目长文页）
- oxlint

## 设计约束

深色编辑风，刻意避开三样最典型的"AI 模板"视觉指纹：

| 不用 | 改用 |
|---|---|
| 多段渐变文字 | 衬线大标题，单色 |
| blur 光晕色斑 | 排版层级与留白 |
| 圆角胶囊标签堆叠 | 等宽字体的分隔列表 |

- **强调色只有一支**赭红 `#cf6a4a`，全站不做第二色
- **字体全部走系统栈**，不引 web font，避免首屏字体请求拖慢和 FOUT；标题用衬线、数据用等宽
- **正文行长限制在 68ch**（`measure` 工具类），保证长文可读性
- 章节用等宽编号（01/02/03）建立阅读节奏
- 尊重 `prefers-reduced-motion`，不为动效而加动效

## 本地开发

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint     # oxlint
```

## 目录结构

```
src/
  components/          展示组件：Hero / Projects / About / Contact / 各类排版与图表组件
    ArchitectureFlow   架构分层图，数据驱动渲染
    DecisionBlock      技术决策五段式：问题/做法/为什么/否掉的方案/代价与局限
    MetricGrid         指标网格，强制展示 source 与 method
  pages/
    ProjectPage        项目长文页
  data/
    projects.ts        三个项目的内容与全部指标出处
    profile.ts         个人资料与首屏数据条
    skills.ts          技术清单（只列代码里真实用过的）
  types.ts             内容模型
  index.css            设计令牌
```

## 内容维护约定

改 `src/data/projects.ts` 时请遵守三条：

1. 每个 `metric` 必须能追到原始文件（JMeter 的 `statistics.json`、源码行号、测试输出），不写没有出处的数字。
2. 技术栈版本号从 `pom.xml` 实读，不凭印象。三个项目的 Spring Boot 版本并不相同（2.7.6 / 3.5.13 / 3.5.15）。
3. 不要为了好看删掉 `limitations`。它是这个作品集可信度的主要来源。

## 部署

一行命令发布到 GitHub Pages：

```bash
npm run deploy
```

它会做三件事：用 `--base=/personal-portfolio/` 构建（项目站点位于仓库子路径下）、
生成 `dist/404.html` 作为 SPA 深链接兜底、把 `dist` 推进 `gh-pages` 分支。
Pages 的来源设置为 `gh-pages` 分支。

绑定自有域名或迁到 Vercel / Cloudflare Pages 时，把 `build:pages` 脚本里的
`--base=/personal-portfolio/` 改成 `--base=/` 即可（`src/index.css` 与组件里没有
任何硬编码的路径前缀，构建产物可以放在根路径）。

### 关于自动化部署

当前用 `npm run deploy` 手动发布。如果想改成推送 `main` 后由 GitHub Actions 自动发布，
需要先给 gh 的 token 补上 `workflow` 权限（否则 GitHub 会拒绝推送工作流文件）：

```bash
gh auth refresh -s workflow
```

然后新增 `.github/workflows/deploy.yml`，用 `actions/deploy-pages` 发布 `dist`，
并在 Pages 设置里把来源改为 GitHub Actions。


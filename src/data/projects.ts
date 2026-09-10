import volcanoScreenshot from '../assets/volcano-gallery.jpg'
import type { Project } from '../types'

/**
 * 作品集项目内容，按时间倒序。
 *
 * 写作约定：
 * 1. 数字必须真实，能追到 statistics.json / 源码行号 / 测试输出。
 * 2. 技术栈版本号从 pom.xml 实读，不凭印象。
 * 3. 先写成什么、值钱在哪；"为什么这么做"放进 stories，一段一个观点。
 */
export const projects: Project[] = [
  {
    slug: 'volcano-gallery',
    title: '火山图库',
    oneLiner:
      '已上线的图片素材管理平台后端：空间级权限隔离、两级缓存扛热点读、多人实时协同编辑。页面上的压测数据全部来自线上真实环境。',
    role: '后端开发',
    period: '2026.02 — 2026.05',
    stack: [
      'Java 17',
      'Spring Boot 2.7.6',
      'MyBatis-Plus 3.5.15',
      'Sa-Token 1.39.0',
      'Redis',
      'Caffeine 3.1.8',
      'Disruptor 3.4.2',
      'WebSocket',
      '腾讯云 COS 5.6.227',
      'Jsoup 1.22.1',
    ],
    links: [
      {
        label: '线上服务',
        href: 'https://www.lincode.online',
        note: '真实部署，可直接访问',
      },
      {
        label: '后端仓库',
        href: 'https://github.com/LCL-001/yun-picture-base',
        note: '84 次提交',
      },
      {
        label: '前端仓库',
        href: 'https://github.com/LCL-001/yun-picture-frontend',
        note: 'Vue 3',
      },
    ],
    scale: [
      { label: 'Java 文件', value: '171 个' },
      { label: 'Controller', value: '11 个' },
      { label: '数据表', value: '9 张' },
      { label: '压测场景', value: '10 个' },
    ],
    metrics: [
      {
        value: '86.9 万',
        label: '累计压测请求，0 错误',
        source: 'jmeter/report*/statistics.json，10 个场景合计 868,579 样本',
      },
      {
        value: '742.68',
        unit: 'req/s',
        label: '单机聚合吞吐（100 并发）',
        source: 'report01-ano-100/statistics.json · Total.throughput',
      },
      {
        value: '204.95',
        unit: 'ms',
        label: '缓存路径 p95（走 DB 对照 240ms）',
        source: 'report01-ano-100/statistics.json · 两个采样器对照',
      },
      {
        value: '3.1',
        unit: '×',
        label: '20→100 并发的吞吐扩展',
        source: 'report01-ano-20 / -50 / -100 的 Total.throughput',
      },
      {
        value: '262144',
        label: 'Disruptor 环形队列容量',
        source: 'PictureEditEventDisruptorConfig.java:25',
      },
      {
        value: '10000',
        label: 'Caffeine 本地缓存上限，每条独立随机 TTL',
        source: 'PictureServiceImpl.java:143-167',
      },
    ],
    architecture: [
      {
        label: '接入',
        nodes: [
          { name: 'Nginx', note: 'TLS、安全响应头、前端静态资源、反向代理' },
          { name: 'Spring MVC', note: 'Tomcat，生产 8123 端口，context-path=/api' },
        ],
      },
      {
        label: '鉴权',
        nodes: [
          {
            name: '@AuthCheck + AuthInterceptor',
            note: 'AOP 实现用户角色方法级校验',
            selfBuilt: true,
          },
          {
            name: '@SaSpaceCheckPermission',
            note: '组合注解转发到 Sa-Token 空间权限体系',
            selfBuilt: true,
          },
          { name: 'StpInterfaceImpl', note: '归属与角色一律查库，不信任请求体', selfBuilt: true },
        ],
      },
      {
        label: '缓存',
        nodes: [
          { name: 'Caffeine（L1）', note: '10000 条，每条独立随机 TTL 5~10 分钟' },
          { name: 'Redis（L2）', note: '列表缓存 key 带版本号；锁用 UUID + Lua 校验释放' },
        ],
      },
      {
        label: '异步与协同',
        nodes: [
          { name: 'Disruptor RingBuffer', note: '协同事件削峰，单消费者串行，自定义异常处理器' },
          {
            name: 'PictureEditHandler',
            note: '图片粒度编辑锁（putIfAbsent CAS），断连回收',
            selfBuilt: true,
          },
          {
            name: 'pictureUploadExecutor',
            note: '批量抓图线程池，CallerRunsPolicy 形成背压',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '存储与外部',
        nodes: [
          { name: 'MySQL', note: '9 张表；空间额度用条件原子 UPDATE 防并发超限' },
          { name: '腾讯云 COS', note: '原图 + webp 压缩图 + 256×256 缩略图' },
          { name: '阿里云百炼', note: 'AI 扩图异步任务（创建 + 轮询）' },
        ],
      },
    ],
    image: volcanoScreenshot,
    imageAlt: '火山图库线上页面：图片素材网格与分类标签',
    highlights: [
      {
        title: '86.9 万次压测请求，0 错误',
        body: '用 JMeter 对线上服务做全链路压测：按真实流量结构划成匿名读、登录、登录态读、混合四类场景，20→100 并发阶梯加压。10 个场景 errorCount 全部为 0，实测单机聚合吞吐 742 req/s。',
      },
      {
        title: '热点列表读的 p95 压到 204.95ms',
        body: 'Redis + Caffeine 两级缓存：随机过期 TTL 防雪崩、分布式锁防击穿、空结果短 TTL 防穿透；失效不删 key 而是对版本号 INCR。对照实验里，走缓存的 p95 比直接走数据库低 35ms，同时把热点读从数据库整个移走。',
      },
      {
        title: '多人同时编辑同一张图，不打架',
        body: 'WebSocket 消息只封装成事件丢进 Disruptor 环形队列，由单个消费者串行广播，从根上避免多线程并发写同一个会话；编辑锁用 putIfAbsent 做 CAS 占位，粒度是一张图一个锁，断连自动回收。',
      },
      {
        title: '空间级数据权限，从授权模型上防越权',
        body: 'Sa-Token 独立账号体系挂自定义组合注解，权限上下文只保留标量 id，归属关系与成员角色一律现查数据库——客户端伪造的任何字段都进不了授权判定。',
      },
    ],
    stories: [
      {
        title: '缓存失效不删 key，而是给版本号加一',
        body: '分页列表的缓存 key 由十几个查询条件组合而成，失效时既不能遍历删除（KEYS 会阻塞 Redis 单线程），也不可能穷举出所有条件组合。把失效动作改成对版本号做一次 INCR：新请求天然落到新 key，旧 key 靠 TTL 自己过期。清理动作注册在事务提交之后执行，保证不会把未提交的数据刷进缓存。',
      },
      {
        title: '批量抓图：并发要自己管，URL 要逐跳校验',
        body: '批量抓取走 CompletableFuture 提交到独立线程池——不指定线程池会落到全局公共池，重 IO 任务会把别的并行流全部饿死。拒绝策略用 CallerRunsPolicy，任务堆积时由提交线程自己执行，天然形成背压。安全侧，"服务端下载用户给的 URL"是教科书级 SSRF 入口：禁掉自动重定向、每一跳都重新解析 DNS 并比对内网黑名单、下载流式限制 2MB、再校验一次文件魔数。',
      },
      {
        title: 'AI 扩图的任务结果，不能谁拿到 taskId 都能看',
        body: '大模型的扩图是异步任务：创建后立刻返回 taskId，云端跑几十秒。任何拿到 taskId 的人都能查询任务结果，这是典型的越权。创建时把 taskId 到用户的归属关系写进 Redis（TTL 一天），查询先查归属再查结果；错误处理上做双检查——状态码非 2xx 抛异常，状态码 200 但响应体里带错误码也抛异常。',
      },
    ],
  },
  {
    slug: 'react-tool-agent',
    title: 'AI 智能体对话应用',
    oneLiner:
      '两个智能体共用一套会话体系：通用任务智能体负责多步工具调用，领域对话应用负责情感场景问答。技术上最核心的是会话记忆——一条水位线让绝大多数读取不再触发摘要模型调用。',
    role: '全栈开发（后端 + Vue 3 前端）',
    period: '2025.12 — 至今',
    stack: [
      'Java 21',
      'Spring Boot 3.5.13',
      'Spring AI Alibaba 1.1.2',
      'MyBatis-Plus 3.5.15',
      'MySQL 8',
      'Redis',
      'Ollama / DashScope',
      'Vue 3.5 + Vite 6',
    ],
    links: [
      {
        label: 'GitHub 仓库',
        href: 'https://github.com/LCL-001/my-ai-agent',
        note: '后端 + Vue 3 前端 + 独立的图片搜索 MCP Server 子项目',
      },
    ],
    scale: [
      { label: 'Java 主代码', value: '83 个文件' },
      { label: '单元测试', value: '19 类 / 61 用例' },
      { label: '注册工具', value: '8 个' },
      { label: 'Agent 继承链', value: '4 层' },
    ],
    metrics: [
      {
        value: '4096',
        unit: 'token',
        label: '会话记忆的上下文预算',
        source: 'FlowWindowBasedChatMemory.java:29',
      },
      {
        value: '52%',
        label: '摘要长度 / 压缩输入（6 次实测，34%~74%）',
        source: 'app3.log 摘要模型调用日志，输入 918~1582 字符、返回 386~814 字符',
      },
      {
        value: '8',
        unit: '个',
        label: '注册给 Agent 的工具',
        source: 'ToolRegistration.java:25-36',
      },
      {
        value: '61',
        unit: '个',
        label: '单元测试用例（19 个测试类）',
        source: 'src/test/java 下 @Test 方法统计',
      },
      {
        value: '3349',
        unit: '行',
        label: '产品收敛时主动删除的代码',
        source: '提交 bab874c，75 个文件变更',
      },
      {
        value: '7',
        unit: '条',
        label: 'Agent 任务终止路径',
        source: 'ToolCallAgent.java / BaseAgent.java',
      },
    ],
    architecture: [
      {
        label: '接入',
        nodes: [
          { name: 'Vue 3 SPA', note: 'EventSource 消费 SSE，Markdown 经 DOMPurify 再渲染' },
          { name: 'Nginx', note: 'SPA 回退 + /api 反代，SSE 长连接关缓冲' },
          { name: 'AiController', note: '/ai/manus/chat 与 /ai/love_app/* 两类入口' },
        ],
      },
      {
        label: '智能体',
        nodes: [
          {
            name: 'MyManus',
            note: '通用任务智能体，最大 20 步，按请求新建实例',
            selfBuilt: true,
          },
          {
            name: '四层继承链',
            note: 'BaseAgent → ReActAgent → ToolCallAgent，状态机驱动 think→act 循环',
            selfBuilt: true,
          },
          {
            name: '循环检测',
            note: '助手文本重复 2 次判定卡住，累计 3 次强制终止',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '记忆',
        nodes: [
          {
            name: 'FlowWindowBasedChatMemory',
            note: '写全量、读裁剪，水位线命中即复用摘要',
            selfBuilt: true,
          },
          { name: 'ChatSummary', note: '一个会话一条摘要，last_message_id 即水位线' },
          { name: 'DataBaseChatMemory', note: '领域对话应用走全量读链路', selfBuilt: true },
        ],
      },
      {
        label: '能力',
        nodes: [
          { name: '8 个注册工具', note: '文件、搜索、抓取、下载、PDF、询问、终止', selfBuilt: true },
          {
            name: 'ChatHistoryAssembler',
            note: '把落库消息还原成「轮 + 执行步骤」，供前端折叠条展示',
            selfBuilt: true,
          },
          {
            name: 'ConversationTitleService',
            note: '首条消息后异步生成会话标题',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '模型',
        nodes: [
          {
            name: 'Ollama（默认）/ DashScope',
            note: 'Profile + 环境变量切换，业务代码零改动',
          },
        ],
      },
    ],
    highlights: [
      {
        title: '一条水位线，把记忆压缩的成本摊平',
        body: '多步 Agent 每一步都要读一次历史。写入永远全量落库，读取时按 4096 token 预算组装：摘要加新消息没超预算就直接复用，一次模型调用都不发；超预算才做增量合并，把水位线之后除最近 10 条之外的部分并进已有摘要。6 次真实压缩实测，摘要长度约为压缩输入的 52%。',
      },
      {
        title: '自研 ReAct 循环，执行过程全程可见',
        body: '关闭模型的内置工具执行，自己写状态机驱动 think→act 循环，才能把每一步分类成「思考」或「工具执行」推给前端——执行时自动展开、结束后折叠成"已执行 N 步（用时 X 秒）"。7 条终止路径加循环检测，保证任务必然收敛。',
      },
      {
        title: '做完四块功能，再主动砍掉',
        body: '私有知识库、JD 差距分析、学习计划、模拟面试——做完后发现它们稀释了核心聊天产品的定位，于是整体移除：75 个文件、3349 行，连专用文档和测试一起删。同时写了一个测试断言这些路由不再存在，防止以后被无意复活。',
      },
      {
        title: '本地与云端模型，一行环境变量切换',
        body: '模型的运行时选项按提供方分别装配，Agent 只依赖抽象接口：默认指向本地 Ollama（省额度、可离线调试），改一个环境变量即切云端 DashScope，业务代码零改动。',
      },
    ],
    stories: [
      {
        title: '空摘要比压缩失败更危险',
        body: '模型调用可能因为内容风控、网络抖动而返回空串——它不抛异常，只是一个空字符串。如果照常落库，水位线就会指向一段没有任何信息的摘要，之后每一次读取都拿到空上下文，问题被永久固化。所以这里把空返回主动抛成异常，走降级硬裁剪：宁可丢掉压缩优化，也不让坏数据进库。',
      },
      {
        title: '工具的返回值被框架偷偷序列化过一次',
        body: '我靠一个固定前缀判断「模型是否在请求人工介入」，上线后这个判断永远不成立。排查到最后发现：Spring AI 会把工具返回的字符串再按 JSON 序列化一遍，文本前后多了引号、内部引号被转义，前缀自然匹配不上。解决办法是在使用工具结果前先按 JSON 解析还原一次。这类问题最麻烦的地方在于症状有误导性——看起来像模型没调对工具，其实是返回值被二次编码。',
      },
      {
        title: '为什么不用框架自带的自动工具调用',
        body: '自动模式把「调工具、拿结果、再问模型」整段封装掉，循环不可观测：前端只能看到一个转圈，我也没法在模型开始重复自己时干预。自己写循环的代价是多维护一层继承链，换到的是每一步都可推送、可检测、可干预——对一个要做流式执行过程展示的应用来说，这笔交易是值得的。',
      },
    ],
  },
  {
    slug: 'contract-review-agent',
    title: 'AI 合同风险审查',
    oneLiner:
      '整份合同体检和单条法条咨询合并进同一个对话入口，由一套纯规则的意图路由自动分发——用户不用先选模式，路由本身不发一次模型调用。',
    role: '全栈开发（后端 + Vue 3 前端）',
    period: '2026.08 — 至今',
    stack: [
      'Java 21',
      'Spring Boot 3.5.15',
      'Spring AI 1.1.8',
      'MyBatis-Plus 3.5.15',
      'MySQL 8',
      'PostgreSQL + pgvector',
      'iText 9.1.0',
      'Vue 3 + Vite 6',
    ],
    links: [
      {
        label: 'GitHub 仓库',
        href: 'https://github.com/LCL-001/ai-contract-review',
        note: '含记忆体系的设计笔记（docs/teaching）',
      },
    ],
    scale: [
      { label: 'Java 文件', value: '95 个' },
      { label: '单元测试', value: '86 个 / 18 类' },
      { label: '数据源', value: '2 个物理隔离' },
      { label: '记忆单测', value: '24 个' },
    ],
    metrics: [
      {
        value: '0',
        unit: '次',
        label: '意图路由引入的模型调用',
        source: 'gateway/IntentRouter.java 全文无 ChatModel 依赖',
      },
      {
        value: '86',
        unit: '个',
        label: '单元测试（18 个测试类）',
        source: 'src/test/java 下 @Test 方法统计',
      },
      {
        value: '8',
        unit: '轮',
        label: '上下文滑窗保留的对话轮数',
        source: 'ChatHistoryWindower.java / ChatMemoryProperties.java:20',
      },
      {
        value: '10',
        unit: '分钟',
        label: '单次思考的流式聚合作超时',
        source: 'ToolCallAgent.java:101，配合 Nginx 300s 读超时',
      },
      {
        value: '1024',
        unit: '维',
        label: '向量检索：HNSW + COSINE，法规与记忆同表隔离',
        source: 'PgVectorVectorStoreConfig.java:14-15, 43-44',
      },
      {
        value: '15',
        unit: '步',
        label: '审查 Agent 步数上限（工具白名单 5 个）',
        source: 'ContractReviewAgent.java:89, 36-37',
      },
    ],
    architecture: [
      {
        label: '编排',
        nodes: [
          {
            name: 'ContractChatGateway',
            note: '归属校验 → 意图路由 → 分支执行 → 归一为事件流',
            selfBuilt: true,
          },
          {
            name: 'IntentRouter',
            note: '四级优先级：显式指定 > 消息级信号 > 会话粘性 > 兜底',
            selfBuilt: true,
          },
          {
            name: 'ChatEvent',
            note: 'mode / token / step / final / error / done 统一事件协议',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '审查链路',
        nodes: [
          {
            name: 'ContractReviewAgent',
            note: '工具白名单 5 个，最大 15 步',
            selfBuilt: true,
          },
          { name: 'ReAct 循环', note: '粘滞检测 + 反问中断 + 步数上限', selfBuilt: true },
          { name: '法规 RAG', note: '按章切分 + 元数据过滤，topK 5 阈值 0.5' },
        ],
      },
      {
        label: '咨询链路',
        nodes: [
          { name: 'ContractConsultApp', note: 'token 级流式问答', selfBuilt: true },
          {
            name: 'WindowedChatMemory',
            note: '装饰器接入，读时滑窗、写时全量透传',
            selfBuilt: true,
          },
          {
            name: 'UserMemoryRetriever',
            note: '跨会话长期记忆召回，结果注入 system 提示词',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '记忆',
        nodes: [
          {
            name: 'ChatHistoryWindower',
            note: '读取时滑窗 + 工具压实，保留 id/name 维持工具配对',
            selfBuilt: true,
          },
          {
            name: 'MemoryExtractionService',
            note: '审查结束后异步抽取偏好/事实/结论，双落 MySQL 与向量库',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '存储',
        nodes: [
          { name: 'MySQL', note: '用户 / 会话 / 消息 / 用户长期记忆' },
          { name: 'PostgreSQL + pgvector', note: '独立数据源，仅存向量' },
        ],
      },
    ],
    highlights: [
      {
        title: '意图路由，零模型调用',
        body: '审查和咨询合并成一个流式入口，靠四级优先级判定该走哪条链路：前端显式指定 > 消息级信号（引用合同文件名 + 审查动词）> 会话粘性 > 兜底咨询。判定全部由关键词与正则完成——代码里没有任何模型依赖，路由不增加一次调用、不增加一毫秒延迟。',
      },
      {
        title: '法规检索与用户记忆，共用一张向量表',
        body: '1024 维向量、HNSW 索引、COSINE 距离。法规检索 topK 5 阈值 0.5，用户长期记忆检索 topK 3 阈值 0.3，两者靠 doc_type 与 user_id 元数据在同一张表里隔离——不引入第二套向量组件，检索侧用双重过滤保证用户之间互不可见。',
      },
      {
        title: '流式聚合，绕开网关的空闲超时',
        body: '推理型模型单次思考可以长达数分钟，非流式请求会因为网关侧没有数据下行被掐断（504）。把思考调用改成流式聚合并阻塞等待：连接上持续有字节，就不会被判空闲。由于经过 Advisor 后拿到的是分片流，还要自己拼接文本增量、合并工具调用的增量分片。',
      },
      {
        title: '长期记忆：抽取、双落、检索',
        body: '审查完成后异步用模型抽取记忆，分成偏好、事实、审查结论三类；正文去重后落 MySQL，向量带用户标识落 pgvector。下次会话检索召回，拼进 system 提示词——新会话不必重新交代立场和偏好。',
      },
    ],
    stories: [
      {
        title: '滑窗放在读取时，而不是写入时',
        body: '审查的每轮结束都是「先清空该会话历史、再全量写入」。如果裁剪发生在写入时，被裁掉的历史就永久丢了。所以持久化层始终全量落库，上下文组装层在读取时按用户消息轮切窗：保留最近 8 轮，更早轮次的工具结果替换成占位摘要。切点必须落在用户消息之前——模型协议要求工具调用与它的响应紧跟成对，切开整个请求会被直接拒绝。',
      },
      {
        title: '长期记忆注入 system，而不是 user 消息',
        body: '记忆 Advisor 会把 user 消息原样写回会话记忆。如果把记忆块拼在用户消息里，它会被当成对话内容再存一遍，下一轮再拼一次，越滚越大。注入 system 提示词则完全避开了这条写路径。这个坑只有把「检索」和「存储」两条链路对着看才会发现。',
      },
      {
        title: '归属校验放在统一入口，而不是每个接口各写一遍',
        body: '聊天链路的读写都以会话 id 为键，只在接口层校验挡不住「拿别人的会话 id 直接对话」这种注入。把校验下沉到记忆读写的公共入口：会话已存在时，归属为空或不匹配直接拒绝。网关和两个旧端点统一走这一个点，未登录仍可对话但不落库。',
      },
    ],
  },
]

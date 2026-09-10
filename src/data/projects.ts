import type { Project } from '../types'

/**
 * 项目内容。排序为时间倒序。
 *
 * 写作约束（改这个文件时请遵守）：
 * 1. 每个 metric 必须能追到原始文件（statistics.json / 源码行号），不写没有出处的数字。
 * 2. 技术栈版本号从 pom.xml 实读，不凭印象。
 * 3. limitations 是主动交底，不要为了好看删掉——它是这个作品集最核心的可信度来源。
 */
export const projects: Project[] = [
  {
    slug: 'volcano-gallery',
    title: '火山图库',
    oneLiner:
      '面向个人与团队空间的图片素材管理后端。真正要解决的是三件事：热点列表读怎么扛、数据权限怎么按空间隔离、多个人同时编辑同一张图怎么不打架。',
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
      'ShardingSphere 5.2.0',
    ],
    links: [
      {
        label: '线上服务',
        href: 'https://www.lincode.online',
        note: '真实部署、可直接访问。下面的压测数据就是打在这个环境上的',
      },
      {
        label: '后端仓库',
        href: 'https://github.com/LCL-001/yun-picture-base',
        note: '主仓库，84 次提交',
      },
      {
        label: '前端仓库',
        href: 'https://github.com/LCL-001/yun-picture-frontend',
        note: 'Vue 3 前端（非本人主要工作）',
      },
    ],
    scale: [
      { label: 'Java 文件', value: '171 个' },
      { label: 'Controller', value: '11 个' },
      { label: '数据表', value: '9 张' },
      { label: '压测样本', value: '86.9 万' },
    ],
    metrics: [
      {
        value: '204.95',
        unit: 'ms',
        label: '图片分页列表 p95（走缓存）',
        source: 'jmeter/report01-ano-100/statistics.json「图片分页列表-走三级缓存」',
        method:
          'JMeter 100 并发、300 秒稳态，与同一轮里的「走 DB」对照采样器对比（对照 p95 = 240.0ms，降低 14.6%）',
      },
      {
        value: '742.68',
        unit: 'req/s',
        label: '单机聚合吞吐（100 并发）',
        source: 'jmeter/report01-ano-100/statistics.json 的 Total.throughput',
        method: '匿名读场景 100 线程、300 秒稳态，10 个采样器并行',
      },
      {
        value: '86.9 万',
        label: '累计压测请求，0 错误',
        source: 'jmeter/report*/statistics.json 共 10 个场景的 sampleCount 合计 = 868,579',
        method: '四类场景（匿名读 / 登录 / 登录态读 / 混合）逐级加压，所有场景 errorCount 均为 0',
      },
      {
        value: '239.78 → 495.88 → 742.68',
        unit: 'req/s',
        label: '20 / 50 / 100 并发的吞吐扩展',
        source: 'jmeter/report01-ano-20、-ano-50、-ano-100 的 Total.throughput',
        method: '同一脚本逐级加压，吞吐近线性增长到约 742 req/s，代价是 p95 从 107ms 退化到 240ms',
      },
      {
        value: '1479.45',
        unit: 'ms',
        label: '登录接口 p95（10 并发）',
        source: 'jmeter/report02-login-10/statistics.json',
        method: '与同并发的匿名读（p95 107ms）、登录态读（p95 84ms）对照，定位到 BCrypt 校验的 CPU 开销',
      },
      {
        value: '262144',
        label: 'Disruptor 环形队列容量',
        source: 'manager/websocket/disruptor/PictureEditEventDisruptorConfig.java:25',
        method: '1024 × 256 预分配，单 WorkHandler 串行消费',
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
            name: 'HttpRequestWrapperFilter',
            note: '只对 JSON 请求体做包装，让鉴权环节可以重复读取 body',
            selfBuilt: true,
          },
          { name: 'SaInterceptor', note: '读合并注解，驱动方法级鉴权' },
          {
            name: '@AuthCheck + AuthInterceptor',
            note: 'Spring AOP 实现用户角色（user/admin）校验',
            selfBuilt: true,
          },
          {
            name: '@SaSpaceCheckPermission',
            note: '自定义组合注解，用 @AliasFor 转发到 Sa-Token 的空间权限体系',
            selfBuilt: true,
          },
          {
            name: 'StpInterfaceImpl',
            note: '权限加载：归属与角色一律查库，不信任请求体',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '业务',
        nodes: [
          { name: '11 个 Controller', note: '图片 / 空间 / 空间成员 / 用户 / 通知等' },
          { name: 'Service + Manager 层', note: '图片上传、权限、缓存、协同、额度', selfBuilt: true },
        ],
      },
      {
        label: '缓存',
        nodes: [
          { name: 'Caffeine（L1）', note: '上限 10000 条，每条独立随机 TTL 5~10 分钟' },
          {
            name: 'Redis（L2）',
            note: '列表缓存 key 带版本号；分布式锁用 UUID + Lua 校验后释放',
          },
        ],
      },
      {
        label: '异步与协同',
        nodes: [
          {
            name: 'Disruptor RingBuffer',
            note: '协同编辑事件削峰，单消费者串行，自定义异常处理器防消费线程被打死',
          },
          {
            name: 'PictureEditHandler',
            note: 'WebSocket 会话表 + 图片粒度编辑锁（putIfAbsent CAS 占位），断连回收',
            selfBuilt: true,
          },
          {
            name: 'pictureUploadExecutor',
            note: '批量抓图线程池：core=N、max=2N、队列 100、CallerRunsPolicy 形成背压',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '存储',
        nodes: [
          { name: 'MySQL', note: '9 张表；空间额度用条件原子 UPDATE 保证并发不超限' },
          { name: '腾讯云 COS', note: '上传原图同时回传 webp 压缩图与 256×256 缩略图' },
        ],
      },
      {
        label: '外部',
        nodes: [{ name: '阿里云百炼 DashScope', note: 'AI 扩图异步任务（创建 + 轮询查询）' }],
      },
    ],
    decisions: [
      {
        problem:
          '图片分页列表是读多写少的热点接口，列表还得联查用户表填充 VO。缓存 key 由十几个查询条件组合而成，写入后要把所有相关缓存全部失效，用 KEYS 或 SCAN 遍历删除会阻塞 Redis。',
        approach:
          '把影响结果的全部条件字段拼成 JSON 再做 MD5 作为 key；失效时不删 key，而是对一个版本号做 INCR，新 key 自然指向新版本，旧 key 靠 TTL 过期。清理动作注册在事务的 afterCommit 之后执行，避免脏读未提交数据。',
        rationale:
          'INCR 是 O(1) 原子操作，不需要枚举「任意查询条件组合」这种无法穷举的 key 集合，也不会阻塞 Redis 主线程。L1 的 Caffeine 不带版本号，用整体 invalidateAll 对齐。',
        rejected:
          'KEYS/SCAN 遍历删除。Redis 单线程模型下 KEYS 会阻塞全库，而 SCAN 也无法枚举出所有条件组合产生的 key，注定漏删。',
        tradeoff:
          '多实例部署时其它节点的 Caffeine 收不到 invalidateAll，只能等 5~10 分钟 TTL 自然过期，最坏情况下会读到略旧的数据。缓存的 value 是整个 Page 的 JSON，属于潜在大 key。另外版本号 key 前缀是 yupicture: 而数据 key 前缀是 huoshantuku:，前缀不统一是遗留问题。',
      },
      {
        problem:
          '登录态只能回答「你是谁」，回答不了「你能不能动这条资源」。如果直接用请求体里的 id 去构造权限上下文，水平越权和自提权都拦不住——项目自查时确实出现过请求体里写 spaceRole:admin 就能给自己提权的情况。',
        approach:
          '做成两套并行的鉴权：接口级用 Spring AOP 的 @AuthCheck 校验用户角色（user/admin）；数据级用自定义组合注解 @SaSpaceCheckPermission，它通过 @AliasFor 把属性转发给 Sa-Token 的 @SaCheckPermission，挂在独立的 StpLogic("space") 账号体系上。权限上下文只保留 4 个标量 id 字段，归属关系与成员角色一律现查数据库。',
        rationale:
          'Sa-Token 原生支持一个应用内挂多套登录与权限体系，不需要拼多个 Security FilterChain。上下文只留标量、其余查库，是从根上切断「客户端可伪造输入影响授权判定」这条路径。',
        rejected:
          'Spring Security。多账号体系要用多层 FilterChain 拼装，对这个体量偏重，而项目已经基于 Sa-Token 建了空间体系。',
        tradeoff:
          '双会话并存：Spring Session 承载登录态、Sa-Token 承载空间权限，登录要写两处、登出要清两处，每个请求两次 Redis 读取。角色到权限的映射放在 JSON 文件里，改权限要重新部署。StpInterfaceImpl 每次判定要查 1~3 次库且无缓存。批量编辑接口只放行空间属主，比单张编辑更严，这个不一致我还没有修。',
      },
      {
        problem:
          '多人同时编辑同一张图时，消息短而频繁。如果直接在容器 IO 线程里做广播，多线程并发写同一个 WebSocketSession 会触发底层 TEXT_PARTIAL_WRITING 异常，导致消息丢失。',
        approach:
          '消息到达后不直接处理，只封装成事件发布到 Disruptor 的 RingBuffer，由单个 WorkHandler 串行消费。编辑锁用 ConcurrentHashMap 配合 putIfAbsent 做 CAS 占位，粒度是「一张图一个锁」。会话集合用 newKeySet 保证线程安全，单个会话再用 ConcurrentWebSocketSessionDecorator 包一层，顺带对慢客户端做熔断，避免一个卡住的连接拖垮广播。',
        rationale:
          'Disruptor 预分配环形数组、序列号 CAS 无锁、缓存行填充防伪共享；单消费者意味着 check-then-act 天然串行，不需要额外加锁。',
        rejected:
          '引入进程内消息队列（Kafka/RocketMQ）。这里的量级是「一张图几个人同时编辑」，MQ 的跨网络、持久化、消费组成本完全不匹配。',
        tradeoff:
          '编辑锁没有 TTL，释放完全依赖断线回调，回调丢了锁就永久占用。握手时校验一次权限，之后连接生命周期内不再复验，被移出空间的成员不会被踢下线。编辑动作只有通知语义，真正的像素保存在各客户端的 HTTP 请求里，不是 OT/CRDT。锁、会话表、Disruptor 全在进程内存，扩到多实例要改三处。',
      },
      {
        problem:
          '从 Bing 批量抓图时逐张串行下载、校验、上传、入库太慢；而「让服务端下载用户给的 URL」是教科书级的 SSRF 入口。',
        approach:
          '用 CompletableFuture.supplyAsync 提交到独立线程池并发处理，每张图内部单独 try-catch 并返回带 index 的结果对象，失败只记日志不影响整批。线程池 core 取核数、max 取 2 倍核数、队列 100、拒绝策略用 CallerRunsPolicy。SSRF 侧禁掉自动重定向，手写最多 3 跳的逐跳重校验，每跳都重新解析 DNS 并比对内网黑名单，直接用已校验的 IP 发起连接并保留 Host 头，下载流式限制 2MB 并校验文件魔数。',
        rationale:
          'supplyAsync 不传 executor 会落到 ForkJoinPool.commonPool，重 IO 任务会把全局公共池占满并饿死其它并行流，所以批量 IO 必须用自己的、有界且可观测的池。CallerRunsPolicy 既保证不丢任务，又让提交线程被拖慢形成天然背压。SSRF 逐跳校验是因为只校验初始 URL 会被重定向绕过，实测能用 httpbingo 的重定向端点探测内网存活。',
        rejected:
          '用默认的 ForkJoinPool.commonPool；以及用任务表 + 消息队列做异步抓取。前者是明确的坑，后者对单机量级是过度设计。',
        tradeoff:
          '同步阻塞等待 allOf().join()，长任务会顶到网关超时，用户关掉页面任务也照跑。强依赖 Bing 的 DOM 结构（.iusc / m 属性），没有契约测试，页面改版只能等运行时报错。对 Bing 没有显式限流。COS 上传成功但事务回滚会留下孤儿文件，目前没有补偿任务扫描。',
      },
      {
        problem:
          'AI 扩图是异步任务模型：创建后立刻返回 taskId，云端跑几十秒。任何拿到 taskId 的人都能查询任务结果，这是典型的 IDOR。',
        approach:
          '创建任务时强制带上 X-DashScope-Async: enable 头，成功后把 taskId 到 userId 的归属关系写进 Redis，TTL 设 1 天。查询时先查归属：查不到返回 NOT_FOUND，对不上返回 NO_AUTH。错误处理上做双检查：HTTP 状态码非 2xx 抛异常，HTTP 200 但响应体里带 code 字段也抛统一文案。',
        rationale:
          '轮询方案零基建、量级匹配，每次查询都是权威查询，不需要回调补偿逻辑。归属映射是「不超过一天、可丢失、丢了也没有资损」的临时状态，Redis 的 TTL 语义正好贴合。',
        rejected:
          '回调或 WebSocket 推送结果。需要公网可达的回调端点并做验签，而扩图本身是低频操作，成本不划算。',
        tradeoff:
          '没有幂等、没有进行中任务互斥、没有限流，用户连点会创建多次真实计费任务。轮询间隔由前端写死，服务端不引导退避。任务记录不落库，超过一天就查不到历史。',
      },
      {
        problem:
          '多个成员同时往同一个团队空间上传时，「先查额度再累加」会超限；删除图片时同一张图可能被多条记录引用，直接删文件会误删共享资源。',
        approach:
          '上传时把落库与额度累加放进显式事务模板，额度用条件原子更新（totalSize + ? <= maxSize、totalCount + 1 <= maxCount），影响行数为 0 就抛异常回滚。删除时用 GREATEST(totalSize - ?, 0) 保证不会算成负数。文件清理先做引用计数查询，只有引用数等于 1 才触发删除，且把清理逻辑拆成独立 Bean，避免同类自调用让 @Async 失效。',
        rationale:
          '把并发正确性下沉到数据库的行锁与 MVCC，不需要应用层做协调，代码量最小且天然对多实例有效。',
        rejected:
          '应用层「先查后改 + 进程内锁」在多实例下锁不共享；改用分布式锁则要处理获取、释放、续期，复杂度上升还会压低并发度。',
        tradeoff:
          '同一个 space 行在高频上传时会有行锁竞争。引用计数查询与删除之间存在竞态窗口，没有加锁。缺少孤儿文件的定期回收任务。',
      },
    ],
    bottlenecks: [
      {
        title: '登录链路是整条链路的 CPU 瓶颈，不是数据库',
        body: '20 并发下，匿名读接口 p95 是 107ms、登录态读接口 p95 是 84ms，而同并发的登录接口 p95 是 1296ms，10 并发时更是达到 1479ms——高出一个数量级。把并发数除以平均延迟得到的值，与实测吞吐基本吻合，说明瓶颈就是登录处理本身的串行算力，而不是排队。定位到代码是 BCrypt 校验：PasswordConfig 用的是默认构造，Spring Security 的 strength 默认为 10，而 BCrypt 本身就是故意设计成慢哈希的抗爆破算法。目前登录走的是 Tomcat 默认线程池，没有做线程隔离或信号量保护。可能的优化方向是调整强度系数、把校验异步化，或者给登录单独隔离线程池并加上结果缓存，但这几条都还没有做。',
      },
      {
        title: '缓存对照实验只能证明延迟差，证明不了吞吐倍数',
        body: '很多关于这个项目的说法会引用「QPS 提升 7.6 倍、响应加速 8.2 倍」。但在现存的 JMeter 报告里找不到支持这个倍数的原始数据。实测的对照组是：20 / 50 / 100 并发下，走缓存的 p95 分别是 99 / 132 / 204.95ms，走 DB 的 p95 分别是 117 / 154 / 240ms，延迟改善约 15%~20%。吞吐之所以看不出差别，是因为两个采样器在同一线程组循环里各占一半请求，吞吐被循环节拍锁死，两边都接近 124 req/s。所以这份数据能支撑的结论是「缓存把热点读的 p95 降了 15%~20%，并且把读压力从数据库移走」，不能支撑任何吞吐倍数。这也是我把这条写进「已知短板」的原因。',
      },
    ],
    limitations: [
      '几乎没有自动化测试：src/test 下只有 2 个文件，缓存三防、空间级 RBAC、编辑锁、额度并发这些关键路径都没有单元测试。',
      '没有 CI，也没有监控告警。pom.xml 未引入 actuator 或 micrometer，/api/health 只是返回一个 "ok" 字符串，不检查 MySQL 和 Redis 是否真的可用。',
      '动态分表当前处于未启用状态：DynamicShardingManager 上的 @Component 和唯一的调用点都被注释掉了，配置里的 actual-data-nodes 只指向逻辑表。',
      '压测只覆盖了读接口和登录，写路径（上传、删除）完全没压过，读写混合下的收益会比现在打折。',
      '编辑锁没有 TTL，释放依赖断线回调；回调丢失时锁会一直被占用。',
      '多实例部署下 Caffeine 无法被其它节点失效，只能靠 5~10 分钟的 TTL 兜底。',
      '项目文档与代码存在多处不一致（缓存 key 前缀、分表是否启用、密钥管理表述等）。这个页面上的描述以代码实际行为为准，与旧文档冲突时以这里为准。',
      '应用的生产配置里对环境变量保留了硬编码的默认值，而不是强依赖环境变量注入。文件虽然被 gitignore 排除、没有进仓库，但这个做法本身不够干净。',
    ],
  },
  {
    slug: 'react-tool-agent',
    title: 'AI 智能体对话应用',
    oneLiner:
      '两个智能体共用一个会话体系：通用任务智能体 MyManus 负责多步工具调用，领域对话应用「恋爱大师」负责情感场景问答。技术上最花心思的是会话记忆——多步任务每一步都要读一次历史，如果每次都把历史整段重压成摘要，模型调用会被放大数倍，所以我用一条水位线把绝大多数读取变成零模型调用。',
    role: '全栈开发（后端 + Vue 3 前端）',
    period: '2025.12 — 至今',
    stack: [
      'Java 21',
      'Spring Boot 3.5.13',
      'Spring AI Alibaba 1.1.2',
      'MyBatis-Plus 3.5.15',
      'MySQL 8',
      'Redis（Session 共享）',
      'Ollama / DashScope',
      'Vue 3.5 + Vite 6',
      'iText 9.1.0',
    ],
    links: [
      {
        label: 'GitHub 仓库',
        href: 'https://github.com/LCL-001/my-ai-agent',
        note: '后端、Vue 3 前端，以及一个可独立运行的图片搜索 MCP Server 子项目',
      },
    ],
    scale: [
      { label: 'Java 主代码', value: '83 个文件' },
      { label: '单元测试', value: '19 类 / 61 个用例' },
      { label: '注册工具', value: '8 个' },
      { label: 'Agent 继承链', value: '4 层' },
    ],
    metrics: [
      {
        value: '4096',
        unit: 'token',
        label: '会话记忆的上下文预算',
        source: 'chatmemory/FlowWindowBasedChatMemory.java:29',
        method:
          '读取时估算全量历史的 token（按 1 字符 ≈ 1.5 token 粗估，非真实分词器），未超预算原样返回，超预算才进入摘要压缩',
      },
      {
        value: '51.8%',
        label: '摘要长度 / 模型输入长度（6 次实测）',
        source: 'app3.log 中「摘要模型调用完成, 输入长度 X, 返回长度 Y」共 6 条记录',
        method:
          '同一次真实会话内触发的 6 次增量压缩：输入 918~1582 字符、返回 386~814 字符，比例区间 34.4%~74%。因为输入还包含提示词模板与上一版摘要，这个比例对「摘要比原文小多少」是保守上界',
      },
      {
        value: '10',
        unit: '条',
        label: '保留原文的最近消息数',
        source: 'chatmemory/FlowWindowBasedChatMemory.java:74',
        method:
          '最近 10 条（约 5 轮）不参与压缩，更早轮次合并进摘要；水位线记录摘要已覆盖到哪条消息，按雪花 id 排序而非创建时间，避免同秒消息导致边界切错',
      },
      {
        value: '8',
        unit: '个',
        label: '注册给 Agent 的工具',
        source: 'config/ToolRegistration.java:25-36',
        method:
          '文件读写、网页搜索、网页抓取、资源下载、PDF 生成、人类询问、任务终止。另有 1 个终端命令工具声明了 @Tool 但未注册，Agent 实际不可达',
      },
      {
        value: '3349',
        unit: '行',
        label: '主动删除的代码（产品收敛）',
        source: '提交 bab874c「收敛为双智能体应用」，75 个文件变更',
        method:
          '私有知识库、差距分析、学习计划、模拟面试四块功能做完后整体移除，并用一个测试断言这些路由不再存在，防止后续被误复活',
      },
      {
        value: '61',
        unit: '个',
        label: '活跃单元测试用例（19 个测试类）',
        source: 'src/test/java 下 @Test 方法统计',
        method:
          '其中记忆相关 5 个用例用 Mockito 桩住模型，含一条断言「复用摘要时模型一次都不被调用」；另有约 14 个 @SpringBootTest 用例依赖真实 MySQL / Redis / Ollama，无法在无外部环境的机器上跑完',
      },
    ],
    architecture: [
      {
        label: '接入',
        nodes: [
          { name: 'Vue 3 SPA', note: '用 EventSource 消费 SSE 事件流，Markdown 经 DOMPurify 后再渲染' },
          {
            name: 'Nginx',
            note: 'SPA 回退 + /api 反代；proxy_buffering off、读超时 300s，为 SSE 长连接准备',
          },
          { name: 'AiController', note: '/ai/manus/chat 与 /ai/love_app/* 两类入口' },
        ],
      },
      {
        label: '智能体',
        nodes: [
          {
            name: 'MyManus',
            note: '通用任务智能体，最大 20 步。按请求新建实例而不注册成单例，避免跨请求共享消息列表',
            selfBuilt: true,
          },
          {
            name: 'BaseAgent → ReActAgent → ToolCallAgent',
            note: '自建状态机驱动 think→act→observe 循环，含粘滞检测与反问中断',
            selfBuilt: true,
          },
          {
            name: '循环检测',
            note: '最后一条助手文本重复出现 2 次判定卡住，累计 3 次强制终止；用引用比较定位消息，避免按内容误判',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '记忆',
        nodes: [
          {
            name: 'FlowWindowBasedChatMemory',
            note: '水位线增量摘要压缩：写全量、读裁剪，超预算时把旧摘要与新对话合并，未超预算直接复用',
            selfBuilt: true,
          },
          {
            name: 'ChatSummary',
            note: '一个会话一条摘要，last_message_id 即水位线，唯一键保证 upsert 而不是重复插入',
          },
          {
            name: 'DataBaseChatMemory',
            note: '领域对话应用走这条：全量读、不做压缩，与上面的压缩链路行为不一致',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '能力',
        nodes: [
          { name: 'tools/（8 个注册工具）', note: '文件、搜索、抓取、下载、PDF、询问、终止', selfBuilt: true },
          {
            name: 'ChatHistoryAssembler',
            note: '把落库的原始消息还原成「轮 + 执行步骤」，供前端折叠条展示',
            selfBuilt: true,
          },
          {
            name: 'ConversationTitleService',
            note: '首条消息后异步生成不超过 18 字的会话标题，只在标题仍是默认值时更新',
            selfBuilt: true,
          },
          { name: 'advisors/', note: '模型调用日志等 ChatClient Advisor', selfBuilt: true },
        ],
      },
      {
        label: '会话与用户',
        nodes: [
          { name: 'ConversationController / Service', note: '会话增删改查与历史消息，含归属校验' },
          {
            name: 'UserController',
            note: 'Session 登录，密码 BCrypt 优先并兼容旧 MD5 加盐格式',
          },
          { name: 'Redis Session', note: '多实例部署时登录态自动共享' },
        ],
      },
      {
        label: '存储',
        nodes: [
          {
            name: 'MySQL',
            note: 'user / conversation / chat_message / chat_summary 四张表',
          },
          { name: 'Redis', note: '登录态' },
          { name: '本地磁盘', note: 'Agent 生成的 PDF 与下载文件' },
        ],
      },
      {
        label: '模型',
        nodes: [
          {
            name: 'Ollama（默认）/ DashScope',
            note: '通过 Profile 与环境变量切换，业务代码零改动；默认配置已指向本地 Ollama',
          },
        ],
      },
      {
        label: '扩展',
        nodes: [
          {
            name: 'image-search-mcp-server',
            note: '独立可运行的 MCP Server（Pexels 图片搜索），主应用侧未接线',
            selfBuilt: true,
          },
        ],
      },
    ],
    decisions: [
      {
        problem:
          '多步 Agent 每一步都要读一次会话历史。官方按消息条数裁剪，不管 token；而审查类任务里单条工具结果可能就有几千字，按条数裁根本挡不住上下文溢出。更麻烦的是，如果每次读取都把超限的历史整段重新摘要一遍，一次 N 步的任务就会产生 N 次摘要模型调用，成本和延迟都被放大。',
        approach:
          '把「写」和「读」拆开：写入永远全量落库、绝不裁剪；读取时才按 token 预算组装。摘要压缩的结果连同一条水位线（摘要已覆盖到的消息 id）一起存表。读取时先看「摘要 + 水位线之后的新消息」是否还在预算内——是就直接复用，一次模型调用都不发；超预算才做增量压缩，把新出现的旧消息合并进已有摘要，而不是整段重压。',
        rationale:
          '水位线是这里的关键：它把「摘要覆盖到哪儿」变成可判定的状态，于是「要不要重新压缩」从每次都必须问模型，变成一次本地比较。绝大多数步骤因此走零调用路径，只有真正越过分界线时才付一次模型成本。',
        rejected:
          '官方 MessageWindowChatMemory 式的按条数裁剪——不感知 token，单条巨型工具结果会直接撑爆窗口。以及每次读取都整段重压——实现更简单，但模型调用次数随步数线性增长，正是要避免的。',
        tradeoff:
          'token 数是粗估的（字符数 × 1.5），不是真实分词，跨模型也不一致，所以预算只能当近似阈值用。每次读取仍然要把该会话全部历史查出来再在内存里过滤，数据库侧的读放大没有解决，优化只作用在模型调用上。',
      },
      {
        problem:
          'Spring AI 的自动工具调用把「调工具、拿结果、再问模型」整段封装，无法插入粘滞检测、反问中断和步骤级推送；不同模型提供方下行为也不一致。',
        approach:
          '自己写执行循环：状态机驱动，把一步拆成思考与执行两段；关闭模型的内置工具执行，改为手动调用工具调用管理器并把返回的对话历史回写到消息列表。工具返回的是纯文本，还要额外做一层规范化处理。',
        rationale:
          '只有掌握循环，才能把每一步分类成「思考」或「工具执行」并推送 step 事件，前端才有执行过程折叠条；也才能在模型开始重复自己时注入新的策略提示并强制收敛。',
        rejected:
          '直接用框架的全自动工具调用。循环不可观测，前端只能看到一个转圈。',
        tradeoff:
          '关掉的只是框架的「内置自动执行」开关，工具调用管理器仍是被手动调用的——这个表述容易被误解。另外清理方法不重置消息列表，长会话的内存占用会随轮次增长。',
      },
      {
        problem:
          '模型调用失败、内容风控返回空串、网络超时都会让摘要这一步不可靠。而摘要是「优化」而不是「功能」——它失败不应该让整个对话不可用。',
        approach:
          '分三层兜底：任何异常都捕获并降级为按 token 的硬裁剪，保证返回的上下文永远不超预算；模型返回空摘要视为失败并主动抛异常，绝不把空摘要写进表、污染水位线；当水位线之后的新消息不足保留条数却依然超预算时（单条巨大的情况），直接走硬裁剪而不是压缩。',
        rationale:
          '空摘要如果落库，水位线就会指向一个没有任何信息的摘要，之后所有读取都会拿到空上下文——这比压缩失败严重得多。所以宁可抛异常走降级。',
        rejected:
          '把空返回当作正常结果落库，或用 try-catch 吞掉后返回原始超长历史（会直接撑爆上下文）。',
        tradeoff:
          '降级路径是静默的，只在日志里留一行警告，用户与调用方无法感知当前上下文已经被硬裁剪——更早的对话内容实际丢失了。',
      },
      {
        problem:
          '项目一度扩张成「面试准备工作台」：私有文档知识库、JD 差距分析、学习计划、有状态模拟面试，四块功能都做完了。但核心聊天产品的定位因此变得分散，用户打开首页不知道该干什么。',
        approach:
          '把这四块功能整体移除——业务代码、Controller、前端页面、专用文档与测试一并删掉，75 个文件、3300 多行；保留数据库迁移记录不删，让已部署的库仍能正常启动。同时新增一个测试，断言这四类路由在应用里不再存在。',
        rationale:
          '用测试锁死「移除」这个决定，是为了防止它们在某次重构中被无意复活——删掉的功能最容易在后续开发里悄悄长回来。保留 Flyway 迁移记录则是因为已部署库的版本历史里已经记录了这些版本，删掉迁移文件会让普通聊天都起不来。',
        rejected:
          '继续做下去，把工作台做完——功能越多看起来越充实，但主线会被稀释；或者重写 Git 历史让仓库看起来从没做过这些——会造成已部署库无法升级。',
        tradeoff:
          '那几个包的目录还留在代码树里（现在是空目录），删除得不够干净；被删功能的专用文档也随之消失，面试时如果被问到「为什么砍掉」只能口头解释，没有留下决策记录。',
      },
      {
        problem:
          '工具方法返回的是纯文本，据此判断「模型是否在请求人工介入」，靠的是一个固定前缀。但实际运行时这个判断永远不成立。',
        approach:
          '排查后发现框架会把工具返回的字符串再按 JSON 序列化一次，于是文本前后被加上了引号、内部引号被转义，前缀自然匹配不上。解决办法是在使用工具结果前做一层规范化：先尝试按 JSON 解析，成功就取回原始字符串，失败则沿用原文。',
        rationale:
          '这是框架行为与直觉不一致导致的问题，且症状具有误导性——看起来像模型的工具调用没生效，实际是返回值被二次编码。把它收敛到一个独立方法里，后续新增工具都不会再踩。',
        rejected:
          '在每个用到工具返回值的地方各写一遍判断——重复且容易漏。',
        tradeoff:
          '规范化只处理「能被解析成 JSON 字符串」的情况，如果工具本身返回的就是一段合法 JSON 文本，会被误解成需要还原的字符串。当前工具集里没有这种返回，所以没暴露问题，但这是一个隐含前提。',
      },
    ],
    bottlenecks: [
      {
        title: '记忆压缩的收益目前只有单测证据，缺运行期度量',
        body: '水位线设计的目标是「绝大多数步骤零模型调用」。代码里那条复用分支确实存在，也有单元测试用「模型一次都不被调用」的断言把它锁住了。但我在全部运行日志里搜不到任何一条复用命中记录——真实的摘要调用只有 6 次，全部发生在同一次会话里，摘要从 386 字逐步增长到 814 字。这意味着「零调用」这个收益在那次会话中并没有被观测到，我无法给出命中率。要证明它，需要在复用分支上加计数埋点，统计「读取次数 / 实际压缩次数」的比例。这是这个功能目前最欠缺的一块证据。',
      },
      {
        title: '测试套件不自洽，也没有全量跑绿的记录',
        body: '61 个活跃用例里约 14 个是 @SpringBootTest，依赖真实的 MySQL、Redis、Ollama 或云端模型 Key，在没有这些外部环境的机器上会直接失败。更明确的问题是有个测试类注入了一个刻意没有注册成 Spring Bean 的类（设计上它就要求每次请求新建实例，不能做单例），因此必然失败。仓库没有 CI，我找到的运行记录只覆盖单个测试类的 7 个用例。所以「测试全绿」这件事目前拿不出可复现的证据——对于要拿去面试的项目，这是比任何性能数字都更容易被追问的地方。',
      },
    ],
    limitations: [
      '会话记忆压缩只覆盖通用智能体这条链路，领域对话应用仍然用全量读的实现，同一套会话体系里两种记忆行为并存。',
      '水位线依赖的摘要表只写在 Docker 首次初始化的建表脚本里，没有对应的数据库迁移文件。用迁移工具建库的新环境不会自动有这张表，届时压缩会静默降级为硬裁剪，功能看起来「没坏但没生效」。',
      '有两个配置开关在文档里被描述为可开关，实际因为相关的配置类被整段注释掉而失效——设置了环境变量也不会生效，恢复需要改代码。文档与实现不一致。',
      'RAG 能力当前完全停用（依赖与配置类都被注释），不是「配置一下就能用」的状态。',
      '文件读写工具的路径是直接拼接的，没有做规范化校验；相比之下文件下载接口做了双重防穿越，说明这个防护意识没有横向铺开。',
      'README 与代码约有十处不一致，其中三处容易被现场追问：默认模型提供方写成了云端而实际默认是本地、声称没有 SQL 初始化脚本但实际有、技术栈里列了已停用的向量库。',
      '存在死代码：两个只有注解没有任何方法的空 Controller、一个没有任何调用点的文件版记忆实现、以及大段被注释掉的旧实现。',
      '没有 CI，没有链路追踪，没有模型调用的 token 与成本统计。',
      '数据库默认口令仍是弱口令（可用环境变量覆盖）。',
      'Docker 编排里的初始化脚本建的库名与后端连接的库名不一致，一键启动起来后表会建在另一个库里。',
      '图片搜索 MCP 仍是可独立运行的示例服务，没有接入主应用。',
      '前端同时保留了独立入口页与会话内嵌两种交互，功能重复；首页组件只是一个重定向。',
    ],
  },
  {
    slug: 'contract-review-agent',
    title: 'AI 合同风险审查',
    oneLiner:
      '把「整份合同系统性体检」和「单条法条咨询」合进同一个对话入口：上传合同后由 ReAct Agent 逐条对照风险清单、检索法规库引用法条依据、必要时反问澄清，最后生成 PDF 审查报告。用户不需要事先选模式——由一套纯规则的意图路由自动分发。',
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
      'Nginx',
    ],
    links: [
      {
        label: 'GitHub 仓库',
        href: 'https://github.com/LCL-001/ai-contract-review',
        note: '后端与 Vue 3 前端同仓。记忆体系的设计笔记在 docs/teaching 下',
      },
    ],
    scale: [
      { label: 'Java 文件', value: '95 个' },
      { label: '单元测试', value: '86 个 / 18 个类' },
      { label: '数据源', value: '2 个（物理隔离）' },
      { label: '记忆相关单测', value: '24 个' },
    ],
    metrics: [
      {
        value: '0',
        unit: '次',
        label: '意图路由引入的额外模型调用',
        source: 'gateway/IntentRouter.java 全文无 ChatModel 依赖',
        method:
          '四级判定全部由正则与关键词匹配完成，连兜底分支也不调用模型；路由结果作为 mode 事件推给前端',
      },
      {
        value: '86',
        unit: '个',
        label: '单元测试用例（18 个测试类）',
        source: 'src/test/java 下 @Test 方法统计',
        method:
          '全部是 Mockito 单测，不连真实数据库与模型；其中记忆体系相关 24 个（滑窗 13、长期记忆 11），是唯一被单测覆盖的核心逻辑',
      },
      {
        value: '8',
        unit: '轮',
        label: '上下文滑窗保留的用户消息轮数',
        source: 'chatmemory/ChatMemoryProperties.java:20、application.yaml:53',
        method:
          '读取时按用户消息轮切窗，更早轮次的工具结果与工具参数被替换成占位摘要，只保留最近 1 轮完整工具结果；落库仍是全量',
      },
      {
        value: '10',
        unit: '分钟',
        label: '单次模型流式聚合作超时',
        source: 'agent/ToolCallAgent.java:101',
        method:
          '把思考调用改成流式聚合并阻塞等待，靠持续下行字节规避网关空闲超时；Nginx 侧同时关闭 proxy_buffering 并把读超时放到 300 秒',
      },
      {
        value: '1024 维 · HNSW · COSINE',
        label: '向量检索参数（法规与记忆共用一张表）',
        source:
          'application.yaml:48、rag/PgVectorVectorStoreConfig.java:14-15, 43-44',
        method:
          '法规检索 topK 5、阈值 0.5；用户长期记忆检索 topK 3、阈值 0.3。两者共用同一张 vector_store 表，靠 doc_type 与 user_id 元数据隔离',
      },
      {
        value: '15',
        unit: '步',
        label: '审查 Agent 最大步数（白名单 5 个工具）',
        source: 'agent/ContractReviewAgent.java:89、:36-37',
        method:
          '从全部工具里过滤出 5 个：读文件、取风险清单、生成 PDF、询问人类、主动终止。工具越少，小参数模型选错工具的概率越低',
      },
    ],
    architecture: [
      {
        label: '接入',
        nodes: [
          { name: 'Vue 3 SPA', note: '用 EventSource 消费统一 JSON 事件流' },
          { name: 'Nginx', note: 'proxy_buffering off、读超时 300s，长生成场景必需' },
          { name: 'AiController', note: '统一入口 /ai/chat/stream' },
        ],
      },
      {
        label: '编排',
        nodes: [
          {
            name: 'ContractChatGateway',
            note: '统一网关：归属校验 → 意图路由 → 分支执行 → 归一为事件流',
            selfBuilt: true,
          },
          {
            name: 'IntentRouter',
            note: '四级优先级：显式指定 > 消息级信号 > 会话粘性 > 兜底',
            selfBuilt: true,
          },
          {
            name: 'ChatEvent',
            note: 'mode / token / step / final / error / done 六类事件的统一协议',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '审查链路',
        nodes: [
          {
            name: 'ContractReviewAgent',
            note: '继承自工具调用 Agent，带 5 个工具白名单与 15 步上限',
            selfBuilt: true,
          },
          {
            name: 'BaseAgent / ReActAgent / ToolCallAgent',
            note: '自建状态机驱动 think→act→observe 循环，含粘滞检测与反问中断',
            selfBuilt: true,
          },
          { name: 'ToolCallingManager', note: '关闭模型内置工具执行后，手动编排工具调用上下文' },
          { name: 'RetrievalAugmentationAdvisor', note: '法规库检索增强，带元数据过滤' },
        ],
      },
      {
        label: '咨询链路',
        nodes: [
          { name: 'ContractConsultApp', note: 'ChatClient 走 token 级流式问答', selfBuilt: true },
          {
            name: 'WindowedChatMemory',
            note: '以装饰器形式零侵入接入记忆 Advisor，读时走滑窗、写时全量透传',
            selfBuilt: true,
          },
          {
            name: 'UserMemoryRetriever',
            note: '跨会话长期记忆的向量召回，结果注入 system 提示词',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '记忆',
        nodes: [
          {
            name: 'ChatHistoryWindower',
            note: '读取时滑窗 + 工具压实：只替换正文与参数，保留 id/name 以维持工具调用配对',
            selfBuilt: true,
          },
          { name: 'DataBaseChatMemory', note: '消息全量落库 MySQL，工具响应手工序列化', selfBuilt: true },
          {
            name: 'MemoryExtractionService',
            note: '审查结束后异步用模型抽取偏好/事实/结论，双落 MySQL 与向量库',
            selfBuilt: true,
          },
        ],
      },
      {
        label: '存储',
        nodes: [
          { name: 'MySQL（主数据源）', note: 'user / conversation / chat_message / user_memory 四张表' },
          {
            name: 'PostgreSQL + pgvector',
            note: '独立数据源，仅存向量：法规与用户记忆同表，靠元数据隔离',
          },
          { name: '本地磁盘', note: '合同原文与生成的审查报告 PDF' },
        ],
      },
      {
        label: '模型',
        nodes: [
          {
            name: 'DashScope / Ollama / OpenAI 兼容网关',
            note: '按配置档案切换，三条链路都从同一处取运行时选项',
          },
        ],
      },
    ],
    decisions: [
      {
        problem:
          '咨询（单点问答）和审查（多步 Agent）原本是两个端点，前端得先让用户选模式，选错就答非所问。要合并成一个入口，就得判断这条消息该走哪条链路。',
        approach:
          '合并为一个流式端点，用四级优先级判定意图：前端显式指定 > 消息级信号（引用了合同文件名，或出现审查动词与风险词）> 会话粘性 > 兜底走咨询。判定结果作为 mode 事件推给前端，两种模式的差异被归一为同一个事件协议。',
        rationale:
          '规则判定零延迟零成本。更重要的是本地小模型做意图分类不稳定，而审查链路本身的延迟已经很高，再加一次模型调用会进一步拉长首字时间。代码里没有任何模型依赖，这一点是可验证的。',
        rejected:
          '用模型做意图分类，多一次调用且小模型分类不稳定；或在前端强制用户二选一，体验退化。',
        tradeoff:
          '关键词表白名单必然漏词，引用的文件类型正则也只认几种常见文档格式。这种路由的准确率我目前没有实测数据，所以这个页面上不写具体数字——它在真实语料上的表现是需要补的功课。',
      },
      {
        problem:
          'Spring AI 的自动工具调用把「调工具、拿结果、再问模型」整段封装掉了，没法在里面插入粘滞检测、反问中断和步骤级推送；不同模型提供方下的行为也不一致。',
        approach:
          '自己写执行循环：用状态机驱动循环，把一步拆成思考与执行两段；关闭模型的内置工具执行，改成手动调用工具调用管理器并把返回的对话历史回写到消息列表。只有在执行段里，才能对工具结果做白名单过滤和步骤推送。',
        rationale:
          '只有自己掌握循环，才能做到每一步都往 SSE 推一个 step 事件，前端才有「审查进度」这个概念；也才能在模型开始重复自己时注入新策略提示并强制收敛。',
        rejected:
          '直接用框架的全自动工具调用模式。循环不可观测，无法逐步推送，前端就只剩一个转圈。',
        tradeoff:
          '这里有个表述容易误导的地方值得说清：关掉的是框架的「内置自动执行」开关，工具调用管理器仍然是被手动调用的，不是完全弃用它。另外清理方法虽然幂等，但不清理消息列表，长会话的内存占用会随轮次增长。',
      },
      {
        problem:
          '审查链路每一步都会把合同全文和完整报告写进历史，下一轮全量进上下文。多轮之后既撑爆小模型的上下文窗口，又会让请求卡到网关超时。',
        approach:
          '把「写」和「读」拆开：持久化层始终全量落库，上下文组装层在读取时按用户消息轮切窗，只保留最近 8 轮，更早轮次的工具结果和工具参数被替换成占位摘要，最近 1 轮保留完整工具结果。切点永远落在用户消息之前，保证 assistant 的工具调用与对应响应不被切开。',
        rationale:
          '审查每轮结束都是先清空再全量重写，如果在写入时裁剪就永久丢数据；读取时裁剪让策略随时可调且数据零丢失。切点必须在用户消息之前，是因为模型方的协议要求工具调用消息紧跟对应的工具响应，切开会被直接拒绝。',
        rejected:
          '写入时滑窗会丢数据；把短期记忆放 Redis 当主存，重启即丢且双写一致性成本高，而且它并没有解决「上下文长度」这个真正的瓶颈；滚动摘要需要模型调用、有成本和不确定性，我刻意留到了后面做。',
        tradeoff:
          '窗口轮数（8）和保留轮数（1）是拍出来的经验值，没有基于 token 计数的动态窗口——因为拿不到可靠的分词器，跨模型的 token 计数本身也不一致。压实只替换正文，不压缩语义，所以更早轮次的信息实际是消失而不是被摘要保留。这条路径有 24 个单测覆盖，其中包括边界轮次与工具配对保持的用例。',
      },
      {
        problem:
          '希望跨会话记住用户的立场偏好、稳定事实和历史审查结论，新会话不必重新交代一遍；同时法规检索也需要向量库。',
        approach:
          '审查完成、推完最终事件之后异步触发抽取：一次模型调用产出结构化的记忆条目，分成偏好、事实、审查结论三类。正文按用户加内容精确去重后落 MySQL，向量带类型与用户标识落向量库——复用法规用的那张向量表，靠元数据过滤隔离，检索时做双重条件过滤，结果拼成一段文本注入系统提示词。',
        rationale:
          'MySQL 负责结构化查询、去重和审计，向量库负责语义召回，各用所长，不额外引入组件。注入到系统提示词而不是用户消息，是因为记忆 Advisor 会把用户消息原样写回会话记忆，拼在用户消息里会被反复污染、越滚越大——这是踩过的坑。',
        rejected:
          '只存 MySQL 就没有跨会话语义召回；另建独立向量表要多一套数据源和运维；中文法律术语用关键词检索召回率很差。',
        tradeoff:
          '双落不是事务性的。两个数据源之间没有事务、也没有补偿和对账，MySQL 写成功而向量写失败就会出现「查得到但搜不到」的记忆。全仓库事务注解出现 0 次，这是明确的技术债。去重是精确字符串匹配且没有唯一索引兜底，换个说法就会被重复写入。记忆只增不更新，冲突的事实无法覆盖。抽取用的是公共 ForkJoinPool，长时阻塞调用会挤占它。',
      },
      {
        problem:
          '推理型模型单次思考可能长达数分钟。非流式的 HTTP 调用在网关侧会因为没有数据下行而被判定空闲，直接被掐断返回 504。',
        approach:
          '把思考调用改成流式聚合并阻塞等待结果：流式连接持续有字节下行，就不会触发网关的空闲超时；因为经过 Advisor 之后拿到的仍是分片流，所以自己拼接文本增量、合并工具调用的增量分片（首片带 id 与名称，后续片只有参数增量），并保留最后一片的元数据。Nginx 侧同时关闭缓冲、把读超时提到 300 秒。',
        rationale:
          '流式是上游模型接口的既定协议，同时天然规避了网关的空闲判定，一个改动同时解决两个问题。',
        rejected:
          '非流式调用。长思考场景下必然被网关掐断，这一点在代码注释里写明了。',
        tradeoff:
          '本质上是「阻塞式伪流式」：对模型是流式，对用户是步骤级推送。单步最长阻塞 10 分钟，但没有整体的时间预算，如果某一步卡住会一直占着线程。而且旧端点的超时设的是 5 分钟，比单步上限还短，这两个数字目前不自洽。',
      },
      {
        problem:
          '聊天链路的读写都以会话 id 为键，只在接口层做校验挡不住「拿别人的会话 id 直接对话」这种注入。另外所有会话标题都是「新对话」，用户没法辨认。',
        approach:
          '把归属校验下沉到记忆读写的统一入口：会话已存在时，归属为空或不匹配就直接拒绝；网关和两个旧端点统一走这一个校验点。标题在首条消息时用消息前 24 个字自动替换，用户手动改过就跳过。',
        rationale:
          '拦截点放在最容易漏的公共入口，而不是在每个端点各写一遍。未登录用户仍然可以聊，只是不落库，保持了原有语义。',
        rejected:
          '引入安全框架做注解式鉴权。这个项目没有引入安全框架，用统一入口的方式更轻。',
        tradeoff:
          '校验前会先按 id 取一次会话，路由之后才校验，存在一个很小的时序窗口，影响可以忽略。另外会话的改名与删除接口用了另一套手写的归属判断写法，风格不统一。',
      },
    ],
    bottlenecks: [
      {
        title: '双数据源之间没有事务，这是目前最大的架构债',
        body: '业务数据在 MySQL、向量在 PostgreSQL，这是两个独立数据源。长期记忆的「双落」是先在 MySQL 写正文、再往向量库写向量，中间没有事务也没有补偿，全仓库的事务注解出现次数是 0。一旦第二步失败，就会产生「用 SQL 能查到、用语义搜不到」的记忆，而且没有任何对账机制能发现它。我在设计时把物理隔离当作优点来写——便于单独扩缩容、避免向量扩展污染业务库——但必须承认故障隔离目前是宣称而不是事实：记忆检索在两条链路里都是同步调用，向量库挂掉整个对话链路就挂，做不到「互相独立」。',
      },
      {
        title: '并发会话没有控制，同一会话的并发请求会互相覆盖',
        body: '每轮结束时是「先清空该会话的历史、再写入内存中的完整列表」这种全量重写，没有加锁也没有版本号。如果同一个会话同时来两个请求，后完成的那个会覆盖前一个的消息；更糟的是清空与写入之间的窗口里读到的会是空历史。正确做法是引入会话级写入锁或乐观版本号，这块目前是空白。',
      },
      {
        title: '管理接口缺鉴权，文件工具缺路径校验',
        body: '法规库重载接口没有任何鉴权，只要能访问到端口，任何人都能触发「删光法规向量并全量重载」。同时审查 Agent 使用的文件读写工具是直接把文件名拼到目录后面的，相对路径可以穿越出去——对比之下，文件下载接口是做了双重防穿越的，说明这个意识没有横向铺开。这两项是我当前优先级最高的待修项。',
      },
    ],
    limitations: [
      '意图路由准确率、法规检索命中率、响应延迟、并发上限都没有实测数据。这个页面上不写这些数字，因为我拿不出可复现的依据。',
      '记忆只增不更新，冲突的事实无法覆盖；去重是精确字符串匹配且没有唯一索引兜底。也没有对外暴露记忆的管理接口，写错了只能改库。',
      '审查完成后触发记忆抽取用的是公共 ForkJoinPool，没有独立线程池，长时阻塞的模型调用会挤占它。',
      '客户端断开连接时只记一行日志，不会取消已经在跑的 Agent 循环，任务会继续跑到步数上限，白烧 token。',
      '没有 CI，没有监控告警，没有链路追踪，也没有模型调用的 token 与成本统计。',
      '数据库变更靠手写 SQL 脚本执行，没有引入迁移工具。',
      'Dockerfile 指定的生产配置档案在仓库里并不存在，所以一键部署链路我还没有真正验证过。',
      '没有集成测试与端到端测试，86 个单测全部是 Mockito 的，测试全绿不等于功能可用。',
    ],
  },
]

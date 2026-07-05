# flowEdge AI Trading Agent / flowEdge AI 港股智能投研系统

<div align="center">

![flowEdge](https://img.shields.io/badge/flowEdge-Trading%20Agent-007acc)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

**5位投资大师辩论 · 两阶段闸门决策 · 时间机器回放验证 · 学习闭环权重更新**

**5-Legendary-Investor Debate · Two-Stage Gate Decision · Time-Machine Replay · Learning Loop**

</div>

---

## 中文

### 产品简介

**flowEdge** 是一个面向港股的 AI 智能交易决策系统。它不只是简单调用大语言模型给出买卖建议，而是模拟一个真实的"投资委员会"工作流——从数据采集、闸门诊断、场景分类，到5位大师并行辩论、加权投票、风控审核、交易者方程硬检查，再到模拟下单与时间机器回放验证，每一步决策路径都完全可视化。

### 核心功能

1. **数据采集** — 拉取真实港股日K线 + 实时行情 + 技术指标（RSI / ATR / ADX / MA）
2. **闸门诊断**（Gate Engine） — 数据充足？→ 周期可识别？→ 高潮风险？→ 风控熔断？任一拒绝直接短路，不浪费Token
3. **场景分类** — 自动识别突破 / 回调 / 超跌 / 区间 / 恐慌 / 追高等10种市场场景，为不同大师动态分配策略权重
4. **5位大师并行分析** — 巴菲特 / 索罗斯 / 达利欧 / 林奇 / 利弗莫尔 基于各自投资哲学独立给出信号与陈词
5. **加权投票** — Multiplicative Weights 算法按场景权重 + 历史胜率聚合信号
6. **风控评估** — 波动率仓位调整 / 止损止盈 / 熔断检查 / 凯利仓位
7. **交易者方程** — 盈亏比 R:R ≥ 1.5 且正期望 EV 才放行
8. **下单裁决** — BUY / SELL / REJECT，模拟盘执行
9. **时间机器回放** — 回到历史任意一天，只用那天之前的数据做决策，回放后续真实K线验证对错
10. **学习闭环** — 大师权重根据回放结果自动更新，下次同场景胜率高的大师话语权更大

### 核心卖点（Demo演示重点）

- **决策路径可视化**：8 个节点实时点亮，评委可以看到 Agent 在思考什么
- **5大师辩论**：每个大师有独立 persona、投资哲学、中文陈词，不是模板套话
- **时间机器回放**：回到过去验证策略对错，不是事后诸葛亮
- **交易者方程硬规则**：没有正期望的交易直接拒绝
- **学习闭环**：大师错了权重降，对了权重升，类似对冲基金 PM 考核机制

### 5位投资大师

| 大师 | 风格 | 关注维度 |
|---|---|---|
| 沃伦·巴菲特 Warren Buffett | 价值投资 | 护城河 / ROE / 安全边际 / 长期持有 |
| 乔治·索罗斯 George Soros | 宏观反身性 | 泡沫 / 趋势反转 / 宏观冲击 / 反射性 |
| 瑞·达利欧 Ray Dalio | 风险平价 / 宏观 | 波动率 / 相关性 / 分散化 / 经济机器 |
| 彼得·林奇 Peter Lynch | GARP 成长 | PEG / 十倍股 / 简单生意 / 内部人士 |
| 杰西·利弗莫尔 Jesse Livermore | 技术关键点 | 突破 / 关键点 / 量价 / 市场情绪 |

### 决策路径

```
数据充足? → 周期可识别? → 高潮风险? → 风控熔断? → 场景分类 → 5大师辩论 → 交易者方程 → BUY/SELL/REJECT
   ✓           ✓           ✗           ✗       回调买入   3多1空1中性   R:R=2.3✓      BUY
```

绿色 ✓ = 通过 / 红色 ✗ = 警告或拒绝 / 蓝色 = 进行中脉冲动画

### 技术栈

- **前端**：Next.js 16 (App Router) + React 19 + TailwindCSS v4 + Recharts
- **后端**：Next.js Route Handlers（SSE 流式输出）
- **AI**：豆包大模型 `doubao-seed-2-1-pro`（5位大师并行调用，支持任何 OpenAI 兼容 API）
- **数据源**：腾讯财经实时行情接口（gtimg.cn）+ 日K历史数据
- **部署**：Zeabur

### 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入 DOUBAO_API_KEY（不配置也可跑 mock 演示模式）

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问 http://localhost:3000
```

### 环境变量

```env
# 豆包 LLM（必填；不填则走确定性规则 fallback，Demo可跑）
DOUBAO_API_KEY=your-doubao-api-key
DOUBAO_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
DOUBAO_MODEL=doubao-seed-2-1-pro-260628

# AI 调用超时（毫秒）
AI_TIMEOUT_MS=60000

# 初始模拟资金（HKD）
INITIAL_PAPER_BALANCE=1000000
```

### 项目结构

```
src/
├── app/                         # Next.js App Router
│   ├── api/court/run/           # SSE 流式分析 API
│   ├── api/cases/               # 案件列表 / 详情 API
│   ├── api/portfolio/           # 组合查询 API
│   ├── api/traces/              # 调用溯源 API
│   ├── workspace/               # 交易台（选股票 + 输入想法）
│   ├── court/                   # 分析庭（核心页面）
│   ├── cases/                   # 卷宗列表
│   ├── case/[id]/               # 案件详情
│   ├── memory/                  # 大师战绩
│   ├── trace/                   # 调用溯源
│   ├── settings/                # 设置
│   └── page.tsx                 # 根路由 → 重定向到 /workspace
├── components/
│   ├── pages/                   # 页面组件（WorkspacePage, CourtPage ...）
│   ├── shell/                   # 布局（AppShell, Sidebar, Header, Footer）
│   └── ui/                      # UI 组件库
└── lib/
    ├── server/
    │   ├── court-runner.ts      # 主控：两阶段决策流水线 + SSE 事件流
    │   ├── gate-engine.ts       # 4 步闸门诊断
    │   ├── scenario-router.ts   # 场景分类 + 权重分配
    │   ├── trader-equation.ts   # 交易者方程硬检查（R:R + EV）
    │   ├── replay-engine.ts     # 时间机器回放引擎
    │   ├── weight-store.ts      # 大师权重学习更新
    │   ├── risk-engine.ts       # 风控评估
    │   ├── portfolio-manager.ts # 组合 / 模拟盘管理
    │   ├── data-source.ts       # 港股数据源（腾讯财经 / mock）
    │   ├── ai-service.ts        # LLM 调用封装（OpenAI 兼容协议）
    │   ├── trace-utils.ts       # 哈希 / 脱敏工具
    │   ├── case-store.ts        # 案件持久化
    │   ├── preset-cases.ts      # 预设 Demo 案例
    │   └── agents/              # 5 位大师 prompt + 分析逻辑
    │       ├── buffett.ts
    │       ├── soros.ts
    │       ├── dalio.ts
    │       ├── lynch.ts
    │       ├── livermore.ts
    │       └── shared.ts
    ├── types.ts                 # 全局 TypeScript 类型
    ├── navigation.ts            # 导航配置
    ├── i18n.ts                  # 中英双语字典
    ├── filters.ts               # 过滤器工具
    └── ai-types.ts              # AI 服务类型
```

### SSE 事件流

前端通过 Server-Sent Events 实时接收事件，UI 节点即时点亮：

| 事件类型 | 含义 |
|---|---|
| `case_started` | 案件启动 |
| `data_loaded` | 行情数据加载完成，K线图渲染 |
| `gate_result` | 闸门诊断结果 |
| `scenario_classified` | 场景分类完成 |
| `agent_started` | 某大师开始分析 |
| `agent_signal` | 某大师给出信号与陈词 |
| `risk_assessed` | 风控评估结果 |
| `trader_equation` | 交易者方程判定 |
| `decision_made` | 最终裁决 BUY/SELL/REJECT |
| `order_executed` | 模拟订单执行 |
| `replay_started` | 时间机器回放开始 |
| `case_completed` | 案件完结 |
| `error` | 错误（可恢复） |

### 部署到 Zeabur

1. 将代码推送到 GitHub 仓库
2. 在 Zeabur Dashboard → New Project → Import from GitHub → 选择本仓库
3. Framework 自动识别为 **Next.js**
4. 在 Environment Variables 中添加：
   - `DOUBAO_API_KEY`
   - `DOUBAO_BASE_URL=https://ark.cn-beijing.volces.com/api/v3`
   - `DOUBAO_MODEL=doubao-seed-2-1-pro-260628`
   - `AI_TIMEOUT_MS=60000`
   - `INITIAL_PAPER_BALANCE=1000000`
5. Deploy → 分配域名即可访问

### 预设 Demo 案例

| # | 股票 | 决策日期 | 场景 | 预期结果 | 证明点 |
|---|---|---|---|---|---|
| 1 | 0700 腾讯 | 2025-04-07 | 恐慌抄底（关税底） | BUY ✓ 后5日涨 | 别人恐惧时贪婪 |
| 2 | 0981 中芯国际 | 2025-05-20 | 高潮 FOMO 陷阱 | REJECT ✗ 追高被套 | 闸门拦截救命 |
| 3 | 1810 小米 | 2025-03-25 | SU7 发布突破 | BUY ✓ 突破有效 | 技术关键点捕捉 |
| 4 | 9988 阿里 | 2025-06-10 | 学习闭环演示 | 先亏后盈 | 权重自动更新 |

### License

MIT

---

## English

### Product Overview

**flowEdge** is an AI-powered trading decision system for Hong Kong stocks. Rather than simply calling an LLM for buy/sell suggestions, it simulates a real "Investment Committee" workflow — from data ingestion, gate diagnosis, and scenario classification, through parallel analysis by five legendary investors, weighted voting, risk control, trader's equation checks, simulated execution, and time-machine replay verification. Every step of the decision path is fully visualized.

### Core Features

1. **Data Ingestion** — Real HK stock daily K-lines, live quotes, and technical indicators (RSI / ATR / ADX / MA)
2. **Gate Diagnosis** — Data sufficiency? → Cycle identifiable? → Climax risk? → Circuit breaker? Any rejection short-circuits the pipeline
3. **Scenario Classification** — Automatically identifies breakout / pullback / oversold / range / panic / FOMO chase and dynamically assigns strategy weights
4. **5 Master Analysts in Parallel** — Buffett, Soros, Dalio, Lynch, and Livermore independently generate signals and theses based on their own investment philosophies
5. **Weighted Voting** — Multiplicative Weights algorithm aggregates signals by scenario weights + historical win rates
6. **Risk Assessment** — Volatility-based position sizing / stop-loss / circuit breaker / Kelly criterion
7. **Trader's Equation** — R:R ≥ 1.5 and positive expected value required
8. **Verdict** — BUY / SELL / REJECT, executed in paper trading
9. **Time-Machine Replay** — Go back to any historical date, make decisions using only data available up to that day, then replay real subsequent K-lines to verify
10. **Learning Loop** — Master weights update automatically based on replay results; higher win-rate masters get more say in similar future scenarios

### Key Highlights

- **Visualized Decision Path**: 8 nodes light up in real time — judges see exactly what the agent is thinking
- **5 Master Debates**: Each master has a distinct persona, investment philosophy, and native-language thesis — no template filler
- **Time-Machine Replay**: Validate strategies against history, no hindsight bias
- **Hard Trader's Equation**: Trades without positive expectancy are rejected outright
- **Learning Loop**: Masters who are wrong lose weight; those who are right gain weight — like a real hedge fund PM evaluation

### The Five Legendary Investors

| Master | Style | Focus |
|---|---|---|
| Warren Buffett | Value Investing | Moat / ROE / Margin of Safety / Long-term Hold |
| George Soros | Macro Reflexivity | Bubbles / Trend Reversals / Macro Shocks / Reflexivity |
| Ray Dalio | Risk Parity / Macro | Volatility / Correlation / Diversification / Economic Machine |
| Peter Lynch | GARP Growth | PEG / Ten-baggers / Simple Businesses / Insiders |
| Jesse Livermore | Technical Pivots | Breakouts / Pivot Points / Price-Volume / Market Sentiment |

### Decision Pipeline

```
Data OK? → Cycle OK? → Climax Risk? → Circuit Breaker? → Scenario → 5-Master Debate → Trader Eq → BUY/SELL/REJECT
  ✓          ✓            ✗              ✗         Pullback    3B/1S/1N      R:R=2.3✓      BUY
```

Green ✓ = pass / Red ✗ = warn or reject / Blue = pulsing (in progress)

### Tech Stack

- **Frontend**: Next.js 16 (App Router) + React 19 + TailwindCSS v4 + Recharts
- **Backend**: Next.js Route Handlers (SSE streaming)
- **AI**: Doubao LLM (`doubao-seed-2-1-pro`) — 5 parallel master calls; any OpenAI-compatible API supported
- **Data**: Tencent Finance real-time quote API (gtimg.cn) + daily K-line historical data
- **Deployment**: Zeabur

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
# Edit .env.local and set DOUBAO_API_KEY (mock demo mode works without it)

# 3. Start dev server
npm run dev

# 4. Open http://localhost:3000 in your browser
```

### Environment Variables

```env
# Doubao LLM (required for real LLM; mock/deterministic fallback works without it)
DOUBAO_API_KEY=your-doubao-api-key
DOUBAO_BASE_URL=https://ark.cn-beijing.volces.com/api/v3
DOUBAO_MODEL=doubao-seed-2-1-pro-260628

# AI timeout (ms)
AI_TIMEOUT_MS=60000

# Initial paper-trading balance (HKD)
INITIAL_PAPER_BALANCE=1000000
```

### Deployment (Zeabur)

1. Push code to a GitHub repository
2. In Zeabur Dashboard → New Project → Import from GitHub → select this repo
3. Framework is auto-detected as **Next.js**
4. Add Environment Variables:
   - `DOUBAO_API_KEY`
   - `DOUBAO_BASE_URL=https://ark.cn-beijing.volces.com/api/v3`
   - `DOUBAO_MODEL=doubao-seed-2-1-pro-260628`
   - `AI_TIMEOUT_MS=60000`
   - `INITIAL_PAPER_BALANCE=1000000`
5. Deploy → assign a domain → done

### License

MIT

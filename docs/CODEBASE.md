# flowEdge 代码清单

本仓库包含 flowEdge 港股 AI 交易 Agent 的**完整可运行源码**（93+ 个文件）。

## 核心后端模块（`src/lib/server/`）

| 文件 | 说明 |
|---|---|
| `court-runner.ts` | 主控编排器，SSE 流式决策流水线 |
| `gate-engine.ts` | 四步闸门诊断 |
| `scenario-router.ts` | 场景分类与大师权重 |
| `trader-equation.ts` | 交易者方程硬检查 |
| `replay-engine.ts` | 时间机器回放 |
| `weight-store.ts` | 大师权重学习闭环 |
| `risk-engine.ts` | 风控评估 |
| `portfolio-manager.ts` | 模拟盘组合管理 |
| `data-source.ts` | 腾讯财经港股数据 |
| `ai-service.ts` | 豆包 LLM 封装 |
| `case-store.ts` | 案件持久化 |
| `trace-utils.ts` | 调用溯源哈希 |
| `preset-cases.ts` | 预设 Demo 案例 |
| `agents/*.ts` | 五位投资大师 Agent |

## 前端页面（`src/components/pages/`）

| 文件 | 路由 |
|---|---|
| `WorkspacePage.tsx` | `/workspace` 交易台 |
| `CourtPage.tsx` | `/court` 分析庭（核心） |
| `CasesPage.tsx` | `/cases` 卷宗列表 |
| `CaseDetailPage.tsx` | `/case/[id]` 案件详情 |
| `MemoryPage.tsx` | `/memory` 大师战绩 |
| `TracePage.tsx` | `/trace` 调用溯源 |
| `SettingsPage.tsx` | `/settings` 设置 |

## 已移除（ChainPulse 遗留，不属于 flowEdge）

以下文件已在清理中删除，**不影响 flowEdge 运行**：

- `contracts/SignalAttestation.sol`、`scripts/sepolia.mjs`（Web3 存证）
- `src/lib/server/xapi-*.ts`（xAPI 数据层）
- `src/components/ui/ProofChain.tsx`（链上证明 UI）
- ChainPulse 相关文档

## 验证方式

```bash
git clone https://github.com/jessicaruan6688-byte/flowedge-ai-trading-agent.git
cd flowedge-ai-trading-agent
npm ci
npm run test
npm run build
npm run dev
```

# DeepSource 项目配置说明文档

本文档详细说明项目中各配置文件的作用和含义，便于理解和汇报。

---

## 一、DeepSource 配置文件 (`.deepsource.toml`)

这是 DeepSource 代码质量分析平台的核心配置文件，放置在项目根目录。

```toml
version = 1
# 配置文件版本号，目前固定为 1

test_patterns = ["**/test/**", "**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"]
# 测试文件匹配模式
# - **/test/**        : 匹配任意 test 目录下的所有文件
# - **/*.test.ts      : 匹配所有 .test.ts 结尾的文件
# - **/*.test.tsx     : 匹配所有 .test.tsx 结尾的文件
# - **/*.spec.ts      : 匹配所有 .spec.ts 结尾的文件
# - **/*.spec.tsx     : 匹配所有 .spec.tsx 结尾的文件
# 作用：告诉 DeepSource 哪些是测试文件，分析时会区别对待

exclude_patterns = ["dist/**", "node_modules/**", "coverage/**"]
# 排除分析的目录
# - dist/**           : 构建输出目录，不需要分析
# - node_modules/**   : 第三方依赖目录，不需要分析
# - coverage/**       : 覆盖率报告目录，不需要分析

[[analyzers]]
name = "javascript"
enabled = true
# 启用 JavaScript/TypeScript 分析器
# DeepSource 用同一个分析器处理 JS 和 TS

[analyzers.meta]
# 分析器的元数据配置

plugins = ["react"]
# 启用的框架插件，这里启用 React 插件
# 可选值：react, vue, ember, meteor, angular, angularjs

environment = ["browser", "nodejs", "vitest"]
# 运行环境，用于识别全局变量
# - browser  : 浏览器环境（window, document 等）
# - nodejs   : Node.js 环境（process, require 等）
# - vitest   : Vitest 测试框架的全局变量

dialect = "typescript"
# 代码方言，指定使用 TypeScript
# 可选值：typescript, flow

module_system = "es-modules"
# 模块系统类型
# - es-modules : ES6 模块 (import/export)
# - commonjs   : CommonJS 模块 (require/exports)
# - amd        : AMD 模块

[[analyzers]]
name = "test-coverage"
enabled = true
# 启用测试覆盖率分析器
# 用于收集和展示代码覆盖率指标

[[code_formatters]]
name = "prettier"
enabled = true
# 启用 Prettier 代码格式化器
# DeepSource 会建议代码格式化修复
```

### 配置项汇总表

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `version` | 1 | 配置版本 |
| `test_patterns` | 测试文件匹配规则 | 标识测试文件 |
| `exclude_patterns` | 排除目录 | 不参与分析的目录 |
| `analyzers.javascript` | 启用 | JS/TS 代码分析 |
| `analyzers.test-coverage` | 启用 | 覆盖率分析 |
| `plugins` | react | React 框架支持 |
| `dialect` | typescript | TypeScript 支持 |
| `code_formatters` | prettier | 代码格式化建议 |

---

## 二、测试配置文件 (`vitest.config.ts`)

Vitest 是基于 Vite 的测试框架，速度快，配置简单。

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],          // 使用 React 插件，支持 JSX 语法
  
  test: {
    globals: true,             // 启用全局 API (describe, it, expect 等)
                               // 不需要每个文件都 import

    environment: 'jsdom',      // 测试环境使用 jsdom
                               // 模拟浏览器 DOM 环境，用于测试 React 组件

    setupFiles: './src/test/setup.ts',  
                               // 测试启动前执行的配置文件
                               // 用于全局配置，如引入 jest-dom 匹配器

    include: ['src/**/*.{test,spec}.{ts,tsx}'],
                               // 包含哪些测试文件
                               // 匹配 src 目录下所有 .test.ts/.spec.tsx 等文件

    coverage: {
      provider: 'v8',          // 覆盖率提供程序，使用 V8 引擎内置的覆盖率
                               // 速度快，准确度高

      reporter: ['text', 'json', 'html', 'cobertura'],
                               // 覆盖率报告格式：
                               // - text      : 终端文本输出
                               // - json      : JSON 格式文件
                               // - html      : HTML 可视化报告
                               // - cobertura : XML 格式，DeepSource 需要这个格式

      reportsDirectory: './coverage',
                               // 报告输出目录

      include: ['src/**/*.{ts,tsx}'],
                               // 计算覆盖率时包含的源文件

      exclude: [
        'src/test/**',                    // 排除测试配置目录
        'src/**/*.test.{ts,tsx}',         // 排除测试文件
        'src/**/*.spec.{ts,tsx}',         // 排除测试文件
        'src/vite-env.d.ts',              // 排除类型声明文件
        'src/main.tsx'                    // 排除入口文件
      ]
    }
  }
})
```

### 覆盖率报告格式说明

| 格式 | 文件 | 用途 |
|------|------|------|
| `text` | 终端输出 | 开发时快速查看 |
| `html` | `coverage/index.html` | 浏览器查看详细报告 |
| `json` | `coverage-final.json` | 程序处理用 |
| `cobertura` | `cobertura-coverage.xml` | **上传到 DeepSource** |

---

## 三、GitHub Actions 工作流 (`.github/workflows/deepsource.yml`)

这是 CI/CD 自动化配置，每次推送代码时自动运行测试并上传覆盖率。

```yaml
name: DeepSource                    # 工作流名称，在 GitHub Actions 页面显示

on:                                 # 触发条件
  push:
    branches:
      - main                        # 推送到 main 分支时触发
      - master                      # 推送到 master 分支时触发
  pull_request:
    types: [opened, synchronize, reopened]
                                    # PR 创建、更新、重新打开时触发

jobs:
  test-coverage:                    # 任务 ID
    name: Test and Report Coverage  # 任务名称
    runs-on: ubuntu-latest          # 运行环境：最新版 Ubuntu

    steps:                          # 执行步骤
      - name: Checkout code         # 步骤1：检出代码
        uses: actions/checkout@v4
        with:
          fetch-depth: 0            # 获取完整 Git 历史，某些分析需要

      - name: Setup Node.js         # 步骤2：安装 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'        # Node.js 版本 20
          cache: 'npm'              # 缓存 npm 依赖，加速构建

      - name: Install dependencies  # 步骤3：安装项目依赖
        run: npm ci                 # npm ci 比 npm install 更快更可靠

      - name: Run tests with coverage  # 步骤4：运行测试并生成覆盖率
        run: npm run test:coverage

      - name: Install DeepSource CLI   # 步骤5：安装 DeepSource 命令行工具
        run: curl https://deepsource.io/cli | sh

      - name: Report coverage to DeepSource  # 步骤6：上传覆盖率到 DeepSource
        run: |
          ./bin/deepsource report --analyzer test-coverage --key javascript --value-file ./coverage/cobertura-coverage.xml
        env:
          DEEPSOURCE_DSN: ${{ secrets.DEEPSOURCE_DSN }}
                                    # 从 GitHub Secrets 读取 DeepSource DSN
                                    # DSN 是 DeepSource 的认证密钥
```

### 工作流执行流程图

```
代码推送到 GitHub
       ↓
GitHub Actions 触发
       ↓
┌─────────────────────────────────┐
│  1. 检出代码                     │
│  2. 安装 Node.js 20             │
│  3. 安装项目依赖 (npm ci)        │
│  4. 运行测试 + 生成覆盖率报告     │
│  5. 安装 DeepSource CLI         │
│  6. 上传覆盖率到 DeepSource      │
└─────────────────────────────────┘
       ↓
DeepSource 显示覆盖率数据
```

---

## 四、项目配置 (`package.json`) 关键部分

```json
{
  "scripts": {
    "dev": "vite",                          // 启动开发服务器
    "build": "tsc -b && vite build",        // 类型检查 + 生产构建
    "lint": "eslint .",                     // 代码规范检查
    "preview": "vite preview",              // 预览生产构建
    "test": "vitest run",                   // 运行测试（单次）
    "test:watch": "vitest",                 // 运行测试（监听模式）
    "test:coverage": "vitest run --coverage" // 运行测试 + 覆盖率
  }
}
```

### 主要依赖说明

| 依赖 | 类型 | 说明 |
|------|------|------|
| `react` | 运行时 | React 核心库 |
| `react-dom` | 运行时 | React DOM 渲染 |
| `typescript` | 开发 | TypeScript 编译器 |
| `vite` | 开发 | 构建工具 |
| `vitest` | 开发 | 测试框架 |
| `@vitest/coverage-v8` | 开发 | V8 覆盖率提供程序 |
| `@testing-library/react` | 开发 | React 测试工具 |
| `@testing-library/jest-dom` | 开发 | DOM 断言匹配器 |
| `eslint` | 开发 | 代码规范检查 |
| `jsdom` | 开发 | 浏览器 DOM 模拟 |

---

## 五、配置 DeepSource 的步骤

### 1. 在 DeepSource 上激活仓库

1. 访问 [app.deepsource.com](https://app.deepsource.com)
2. 使用 GitHub 账号登录
3. 选择要分析的仓库并激活

### 2. 获取 DEEPSOURCE_DSN

1. 在 DeepSource 仓库页面，点击 **Settings**
2. 找到 **DSN** 部分，复制 DSN 值
3. DSN 格式类似：`https://xxx@deepsource.io`

### 3. 在 GitHub 添加 Secret

1. 进入 GitHub 仓库 → **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**
3. Name: `DEEPSOURCE_DSN`
4. Value: 粘贴复制的 DSN
5. 点击 **Add secret**

### 4. 推送代码

```bash
git add .
git commit -m "Add DeepSource configuration"
git push origin main
```

推送后：
- DeepSource 自动分析代码质量
- GitHub Actions 自动运行测试并上传覆盖率
- 在 DeepSource 仪表板查看分析结果

---

## 六、预期效果

配置完成后，DeepSource 将提供：

| 功能 | 说明 |
|------|------|
| **代码质量分析** | 检测代码中的问题和反模式 |
| **安全漏洞扫描** | 发现潜在的安全风险 |
| **代码覆盖率** | 显示测试覆盖的代码比例 |
| **代码格式化建议** | 基于 Prettier 的格式化建议 |
| **PR 检查** | 每个 PR 自动运行检查 |

---

*文档生成时间：2026-02-02*

# DeepSource Test App

这是一个用于测试 DeepSource 代码质量分析的 React + TypeScript 前端项目。

## 项目特点

- **React 18** + **TypeScript** 现代前端技术栈
- **Vite** 快速构建工具
- **ESLint** 代码规范检查
- 包含多种代码质量问题供 DeepSource 检测

## 包含的代码质量问题示例

本项目故意包含以下代码质量问题，用于测试 DeepSource 的检测能力：

### TypeScript 相关

- `any` 类型的使用
- 不安全的类型断言
- 非空断言操作符滥用
- 未使用的变量和函数

### React 相关

- 使用数组 index 作为 key
- 缺少 useMemo/useCallback 优化
- 直接修改状态数组

### 代码风格

- 过高的圈复杂度
- 重复代码
- 魔法数字
- 冗余的条件表达式

### 安全问题

- 硬编码的敏感信息
- eval() 的使用
- 可能的 ReDoS 正则表达式

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

### 运行测试

```bash
npm run test
```

### 运行测试并生成覆盖率报告

```bash
npm run test:coverage
```

## 项目结构

```
src/
├── components/           # React 组件
│   ├── Counter.tsx      # 计数器组件
│   ├── TodoList.tsx     # 待办事项组件
│   └── UserList.tsx     # 用户列表组件
├── types/               # TypeScript 类型定义
│   └── index.ts
├── utils/               # 工具函数
│   └── helpers.ts
├── App.tsx              # 主应用组件
├── App.css              # 应用样式
├── main.tsx             # 入口文件
└── index.css            # 全局样式
```

## DeepSource 配置

项目根目录包含 `.deepsource.toml` 配置文件，已配置：

- JavaScript/TypeScript 分析器
- React 插件支持
- Prettier 格式化器
- 测试覆盖率分析器

## 代码覆盖率

项目使用 **Vitest** 作为测试框架，配置了 V8 覆盖率提供程序。

覆盖率报告格式：

- `text` - 终端输出
- `html` - HTML 报告 (`coverage/index.html`)
- `cobertura` - XML 格式 (用于 DeepSource)

## 使用 DeepSource

### 基本设置

1. 将项目推送到 GitHub/GitLab/Bitbucket
2. 在 [DeepSource](https://deepsource.io) 上连接仓库
3. DeepSource 将自动分析代码并报告问题

### 上传代码覆盖率

项目已配置 GitHub Actions (`.github/workflows/deepsource.yml`)，会自动：

1. 运行测试并生成覆盖率报告
2. 上传覆盖率到 DeepSource

**配置步骤：**

1. 在 DeepSource 仓库设置页面获取 `DEEPSOURCE_DSN`
2. 在 GitHub 仓库的 Settings → Secrets → Actions 中添加 `DEEPSOURCE_DSN` 密钥
3. 推送代码后，GitHub Actions 将自动运行并上传覆盖率

**手动上传覆盖率：**

```bash
# 运行测试生成覆盖率
npm run test:coverage

# 安装 DeepSource CLI
curl https://deepsource.io/cli | sh

# 设置 DSN 环境变量
export DEEPSOURCE_DSN=https://your-dsn@deepsource.io

# 上传覆盖率
./bin/deepsource report --analyzer test-coverage --key javascript --value-file ./coverage/cobertura-coverage.xml
```

## 许可证

MIT

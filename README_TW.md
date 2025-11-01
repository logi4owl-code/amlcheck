# AML Check - 加密貨幣地址流向分析器

一個全面的網頁應用程式，用於分析和視覺化區塊鏈地址之間的加密貨幣交易流向。採用 Next.js 16 和 React 19 構建，具備互動式圖形視覺化、風險評估和多鏈支援功能，專為反洗錢（AML）合規而設計。

## 🚀 功能特色

- **🔍 多地址分析**：追蹤多個區塊鏈網路中兩個地址之間的交易路徑
- **📊 互動式圖形視覺化**：透過 XYFlow 和 Dagre 驅動的直觀階層式圖形佈局探索資金流向
- **⚠️ 風險評估**：識別並評估地址的風險等級，提供視覺化指標
- **🔗 多鏈支援**：分析 Ethereum、BSC、Polygon、Solana 等多條鏈上的交易
- **🏢 實體識別**：識別不同實體類型（EOA、合約、代幣、跨鏈橋、交易所）
- **🌐 國際化**：完整支援英文和繁體中文
- **🔐 身份驗證**：由 Supabase 提供的安全使用者認證
- **🌗 深色模式**：現代化 UI，支援淺色/深色主題
- **📱 響應式設計**：針對桌面和行動裝置優化

## 🛠️ 技術棧

### 核心框架
- **Next.js 16** - 採用 App Router 的 React 框架
- **React 19.2** - 具備最新功能的 UI 函式庫
- **TypeScript 5** - 型別安全的開發環境

### 樣式與 UI
- **Tailwind CSS 4** - Utility-first CSS 框架
- **Framer Motion** - 動畫函式庫
- **Lucide React** - 圖示函式庫
- **clsx & tailwind-merge** - 條件式樣式工具

### 資料視覺化
- **@xyflow/react (React Flow) 12.9** - 互動式圖形視覺化
- **Dagre** - 階層式圖形佈局演算法
- **ELK.js** - 進階圖形佈局引擎

### 狀態管理與表單
- **Jotai 2.15** - 原子化狀態管理
- **React Hook Form 7.65** - 表單處理
- **Zod 4.1** - Schema 驗證

### 後端與認證
- **Supabase** - 身份驗證與資料庫（支援 SSR）
- **@supabase/ssr** - 伺服器端渲染整合

### 國際化
- **i18next 25.6** - 國際化框架
- **react-i18next 16.2** - React i18n 整合

## 📋 環境需求

- **Node.js** 20.x 或更新版本（建議使用 LTS 版本）
- **pnpm** 8.x 或更新版本
- **Git** 2.25 或更新版本

## 🔧 安裝步驟

1. **複製專案**
   ```bash
   git clone <repository-url>
   cd AML-check
   ```

2. **安裝相依套件**
   ```bash
   # 如果尚未安裝 pnpm，請先安裝
   npm install -g pnpm

   # 安裝專案相依套件
   pnpm install
   ```

3. **設定環境變數**
   在 `apps/web` 目錄中建立 `.env.local` 檔案，並填入以下變數：
   ```bash
   # Supabase 設定
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 💻 開發指令

```bash
# 啟動開發伺服器（http://localhost:3000）
pnpm dev

# 建置生產版本
pnpm build

# 啟動生產伺服器
pnpm start

# 執行 ESLint 檢查
pnpm lint
```

## 📁 專案結構

```
AML-check/
├── apps/
│   └── web/                    # 主要網頁應用程式
│       ├── src/
│       │   ├── app/            # Next.js App Router
│       │   │   ├── api/        # API 路由
│       │   │   ├── auth/       # 身份驗證頁面（登入、註冊）
│       │   │   ├── dashboard/  # 使用者儀表板
│       │   │   ├── explore/    # 地址探索與搜尋
│       │   │   ├── layout.tsx  # 根佈局
│       │   │   └── page.tsx    # 首頁
│       │   ├── components/
│       │   │   ├── GraphCanvas.tsx          # 主要圖形視覺化元件
│       │   │   ├── nodes/                   # 自訂節點元件
│       │   │   │   └── AddressCardNode.tsx  # 地址卡片節點
│       │   │   ├── edges/                   # 自訂邊緣元件
│       │   │   ├── language-toggle.tsx      # 語言切換器
│       │   │   └── page-transition-wrapper.tsx
│       │   ├── lib/
│       │   │   ├── supabase/   # Supabase 客戶端設定
│       │   │   ├── types.ts    # 領域型別定義
│       │   │   ├── graph-utils.ts  # 圖形佈局與工具
│       │   │   ├── i18n.ts     # i18n 設定
│       │   │   ├── i18n-resources.ts  # 翻譯資源
│       │   │   ├── constants.ts
│       │   │   └── utils.ts
│       │   └── proxy.ts        # API 代理設定
│       ├── public/             # 靜態資源
│       └── package.json
├── pnpm-workspace.yaml         # pnpm workspace 設定
├── pnpm-lock.yaml
├── README.md                   # 英文版說明文件
└── README_TW.md               # 繁體中文版說明文件
```

## 🎯 核心元件

### GraphCanvas
互動式圖形視覺化元件，顯示地址關係和交易流向：
- 使用 Dagre 演算法自動佈局
- 縮放和平移控制
- 導航用迷你地圖
- 自訂節點和邊緣渲染

### AddressCardNode
區塊鏈地址的視覺化呈現，包含：
- 實體類型指示器（EOA、合約、代幣、跨鏈橋、交易所）
- 風險分數視覺化
- 地址標籤和標記
- 鏈識別

## 🌐 支援的區塊鏈

- Ethereum (ETH)
- Binance Smart Chain (BSC)
- Polygon (MATIC)
- Solana (SOL)
- 可擴展至其他 EVM 相容鏈

## 🔒 身份驗證

應用程式使用 Supabase 進行安全認證：
- 電子郵件/密碼註冊和登入
- 支援 SSR 的會話管理
- 受保護的路由和 API 端點

## 🌍 國際化

支援多語言，完整的 i18n 整合：
- **English** (en)
- **繁體中文** (zh-TW)

透過擴展 `src/lib/i18n-resources.ts` 新增更多語言。

## 📊 資料模型

### 實體類型
- **EOA** (外部擁有帳戶 - Externally Owned Account)
- **Contract** (智能合約)
- **Token** (代幣合約)
- **Bridge** (跨鏈橋)
- **Exchange** (中心化交易所)

### 邊緣類型
- Transfer（轉帳）
- Swap（交換）
- Bridge（跨鏈）
- Mint（鑄造）
- Burn（銷毀）

## 🧪 開發指南

### 程式碼風格
- 遵循 ESLint 設定
- 使用 TypeScript 嚴格模式
- 保持一致的程式碼格式
- 所有註解和文件使用英文或繁體中文

### Git 工作流程
- **main**：生產環境穩定分支
- **develop**：開發分支
- **feature/\***：新功能分支
- **bugfix/\***：錯誤修復分支

### 提交規範
遵循 Conventional Commits 格式：
```
feat: 新增地址搜尋功能
fix: 修復圖形佈局問題
docs: 更新 README API 文件
style: 使用 prettier 格式化程式碼
```

## 🚀 部署

### Vercel（推薦）
本專案已針對 Vercel 部署進行優化：
1. 將您的 GitHub 儲存庫連接到 Vercel
2. 在 Vercel 儀表板中設定環境變數
3. 推送到 main 分支時自動部署

### 手動部署
```bash
# 建置應用程式
pnpm build

# 啟動生產伺服器
pnpm start
```

## 📝 環境變數

生產環境所需的環境變數：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=        # 您的 Supabase 專案 URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # 您的 Supabase 匿名金鑰
```

## 🤝 貢獻

歡迎貢獻！請確保：
1. 程式碼通過 ESLint 檢查
2. 所有 TypeScript 型別都正確定義
3. 註解使用英文或繁體中文
4. 遵循現有的程式碼風格和模式

## 📄 授權

本專案採用 MIT 授權條款。

## 🔗 相關資源

- [Next.js 文件](https://nextjs.org/docs)
- [React Flow 文件](https://reactflow.dev/)
- [Supabase 文件](https://supabase.com/docs)
- [Tailwind CSS 文件](https://tailwindcss.com/docs)

---

© 2025 AML Check. 為透明度和合規性而建。

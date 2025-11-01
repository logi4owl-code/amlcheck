# AML Check - Cryptocurrency Address Flow Analyzer

A comprehensive web application for analyzing and visualizing cryptocurrency transaction flows between blockchain addresses. Built with Next.js 16 and React 19, featuring interactive graph visualization, risk assessment, and multi-chain support for AML (Anti-Money Laundering) compliance.

## 🚀 Features

- **🔍 Multi-Address Analysis**: Trace transaction paths between two addresses across multiple blockchain networks
- **📊 Interactive Graph Visualization**: Explore fund flows with intuitive, hierarchical graph layouts powered by XYFlow and Dagre
- **⚠️ Risk Assessment**: Identify and evaluate risk levels of addresses with visual indicators
- **🔗 Multi-Chain Support**: Analyze transactions across Ethereum, BSC, Polygon, Solana, and more
- **🏢 Entity Recognition**: Identify different entity types (EOA, Contract, Token, Bridge, Exchange)
- **🌐 Internationalization**: Full support for English and Traditional Chinese (繁體中文)
- **🔐 Authentication**: Secure user authentication powered by Supabase
- **🌗 Dark Mode**: Modern UI with light/dark theme support
- **📱 Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **React 19.2** - UI library with latest features
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **clsx & tailwind-merge** - Conditional styling utilities

### Data Visualization
- **@xyflow/react (React Flow) 12.9** - Interactive graph visualization
- **Dagre** - Hierarchical graph layout algorithm
- **ELK.js** - Advanced graph layout engine

### State & Forms
- **Jotai 2.15** - Atomic state management
- **React Hook Form 7.65** - Form handling
- **Zod 4.1** - Schema validation

### Backend & Auth
- **Supabase** - Authentication and database (SSR support)
- **@supabase/ssr** - Server-side rendering integration

### Internationalization
- **i18next 25.6** - Internationalization framework
- **react-i18next 16.2** - React integration for i18n

## 📋 Prerequisites

- **Node.js** 20.x or later (LTS version recommended)
- **pnpm** 8.x or later
- **Git** 2.25 or later

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AML-check
   ```

2. **Install dependencies**
   ```bash
   # Install pnpm if not already installed
   npm install -g pnpm

   # Install project dependencies
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the `apps/web` directory with the following variables:
   ```bash
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 💻 Development

```bash
# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint checks
pnpm lint
```

## 📁 Project Structure

```
AML-check/
├── apps/
│   └── web/                    # Main web application
│       ├── src/
│       │   ├── app/            # Next.js App Router
│       │   │   ├── api/        # API routes
│       │   │   ├── auth/       # Authentication pages (login, register)
│       │   │   ├── dashboard/  # User dashboard
│       │   │   ├── explore/    # Address exploration and search
│       │   │   ├── layout.tsx  # Root layout
│       │   │   └── page.tsx    # Home page
│       │   ├── components/
│       │   │   ├── GraphCanvas.tsx          # Main graph visualization component
│       │   │   ├── nodes/                   # Custom node components
│       │   │   │   └── AddressCardNode.tsx  # Address card node
│       │   │   ├── edges/                   # Custom edge components
│       │   │   ├── language-toggle.tsx      # Language switcher
│       │   │   └── page-transition-wrapper.tsx
│       │   ├── lib/
│       │   │   ├── supabase/   # Supabase client configuration
│       │   │   ├── types.ts    # Domain type definitions
│       │   │   ├── graph-utils.ts  # Graph layout and utilities
│       │   │   ├── i18n.ts     # i18n configuration
│       │   │   ├── i18n-resources.ts  # Translation resources
│       │   │   ├── constants.ts
│       │   │   └── utils.ts
│       │   └── proxy.ts        # API proxy configuration
│       ├── public/             # Static assets
│       └── package.json
├── pnpm-workspace.yaml         # pnpm workspace configuration
├── pnpm-lock.yaml
└── README.md
```

## 🎯 Key Components

### GraphCanvas
Interactive graph visualization component that displays address relationships and transaction flows:
- Auto-layout with Dagre algorithm
- Zoom and pan controls
- Minimap for navigation
- Custom node and edge rendering

### AddressCardNode
Visual representation of blockchain addresses with:
- Entity type indicators (EOA, Contract, Token, Bridge, Exchange)
- Risk score visualization
- Address tags and labels
- Chain identification

## 🌐 Supported Chains

- Ethereum (ETH)
- Binance Smart Chain (BSC)
- Polygon (MATIC)
- Solana (SOL)
- Extensible to other EVM-compatible chains

## 🔒 Authentication

The application uses Supabase for secure authentication:
- Email/password registration and login
- Session management with SSR support
- Protected routes and API endpoints

## 🌍 Internationalization

Supports multiple languages with full i18n integration:
- **English** (en)
- **繁體中文** (zh-TW)

Add new languages by extending `src/lib/i18n-resources.ts`.

## 📊 Data Models

### Entity Types
- **EOA** (Externally Owned Account)
- **Contract** (Smart Contract)
- **Token** (Token Contract)
- **Bridge** (Cross-chain Bridge)
- **Exchange** (Centralized Exchange)

### Edge Types
- Transfer
- Swap
- Bridge
- Mint
- Burn

## 🧪 Development Guidelines

### Code Style
- Follow ESLint configuration
- Use TypeScript strict mode
- Maintain consistent code formatting
- All comments and documentation in English or Traditional Chinese

### Git Workflow
- **main**: Production-ready stable branch
- **develop**: Development branch
- **feature/\***: New feature branches
- **bugfix/\***: Bug fix branches

### Commit Convention
Follow Conventional Commits format:
```
feat: add new address search feature
fix: resolve graph layout issue
docs: update README with API documentation
style: format code with prettier
```

## 🚀 Deployment

### Vercel (Recommended)
This project is optimized for Vercel deployment:
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 📝 Environment Variables

Required environment variables for production:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=        # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=   # Your Supabase anonymous key
```

## 🤝 Contributing

Contributions are welcome! Please ensure:
1. Code passes ESLint checks
2. All TypeScript types are properly defined
3. Comments are in English or Traditional Chinese
4. Follow the existing code style and patterns

## 📄 License

This project is licensed under the MIT License.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Flow Documentation](https://reactflow.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

© 2025 AML Check. Built for transparency and compliance.

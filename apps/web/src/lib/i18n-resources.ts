export const languages = ["en", "zh"] as const;
export type AppLanguage = (typeof languages)[number];

export const fallbackLng: AppLanguage = "en";
export const defaultNS = "translation";

export function isAppLanguage(value: unknown): value is AppLanguage {
  return typeof value === "string" && (languages as readonly string[]).includes(value);
}

export const resources = {
  en: {
    translation: {
      common: {
        appName: "AML Check",
        nav: {
          login: "Login",
          signup: "Sign Up",
          dashboard: "Dashboard",
          explore: "Explore",
          greeting: "Hello, {{name}}",
        },
        footer: "© {{year}} AML Check. Built for transparency and compliance.",
        actions: {
          startAnalyzing: "Start Analyzing",
          viewDashboard: "View Dashboard",
          fillDemo: "Fill Demo",
          search: "Search",
          searching: "Searching...",
          logout: "Logout",
          goHome: "Go Home",
          tryAgain: "Try Again",
          signIn: "Sign In",
          signUp: "Sign Up",
        },
        riskLevel: {
          label: "Risk Level",
          high: "High",
          medium: "Medium",
          low: "Low",
        },
      },
      home: {
        hero: {
          titleMain: "Cryptocurrency Address",
          titleHighlight: "Flow Analyzer",
          description:
            "Trace and visualize transaction flows between wallet addresses. Discover hidden connections and understand fund movements across EVM chains.",
          ctaAnalyze: "Start Analyzing",
          ctaDashboard: "View Dashboard",
        },
        features: {
          search: {
            title: "Multi-Address Search",
            description: "Find all transaction paths between two addresses across multiple chains",
          },
          graph: {
            title: "Interactive Graph",
            description: "Explore fund flows with intuitive visualization and filtering",
          },
          risk: {
            title: "Risk Analysis",
            description: "Identify suspicious patterns and high-risk addresses",
          },
        },
      },
      auth: {
        login: {
          title: "Sign in to your account",
          emailLabel: "Email",
          emailPlaceholder: "demo@example.com",
          passwordLabel: "Password",
          passwordPlaceholder: "••••••••",
          submitLoading: "Signing in...",
          submit: "Sign In",
          registerPrompt: "Don't have an account?",
          registerLink: "Sign up",
          errorGeneric: "An error occurred. Please try again.",
          errorDefault: "Login failed",
          errorInvalidCredentials: "Invalid email or password",
          errorEmailNotConfirmed: "Please verify your email before signing in",
        },
        register: {
          title: "Create your account",
          nameLabel: "Name",
          namePlaceholder: "Your Name",
          emailLabel: "Email",
          emailPlaceholder: "you@example.com",
          passwordLabel: "Password",
          passwordPlaceholder: "••••••••",
          passwordHint: "Minimum 6 characters",
          submitLoading: "Creating account...",
          submit: "Sign Up",
          loginPrompt: "Already have an account?",
          loginLink: "Sign in",
          errorGeneric: "An error occurred. Please try again.",
          errorDefault: "Registration failed",
          errorEmailExists: "An account with this email already exists",
          errorWeakPassword: "Password is too weak. Please use a stronger password.",
        },
        verification: {
          title: "Check your email",
          message:
            "We've sent a verification link to {{email}}. Please check your inbox and click the link to verify your account.",
          notReceived: "Didn't receive the email?",
          resendLink: "Resend verification email",
          resending: "Sending...",
          resentSuccess: "Verification email sent!",
          resentError: "Failed to resend. Please try again.",
          backToLogin: "Back to login",
        },
        confirm: {
          verifying: "Verifying your email...",
          successTitle: "Email verified!",
          successMessage: "Your email has been verified successfully. Redirecting to login...",
          errorTitle: "Verification failed",
          errorMessage: "The verification link is invalid or has expired. Please try signing up again.",
          errorExpired: "This verification link has expired. Please request a new one.",
        },
        logout: {
          successTitle: "Signed out",
          successMessage:
            "You will be redirected to the homepage in {{seconds}} seconds.",
          error: "Failed to logout. Please try again.",
        },
      },
      explore: {
        form: {
          sourceLabel: "Source Address",
          destinationLabel: "Destination Address",
          addressPlaceholder: "0x...",
          depthLabel: "Search Depth: {{depth}}",
        },
        messages: {
          fetchError: "Failed to fetch graph data",
          genericError: "An error occurred while fetching data",
          emptyTitle: "Enter two addresses to visualize transaction flows",
        },
      },
      graph: {
        edge: {
          transactionCount_one: "{{count}} tx",
          transactionCount_other: "{{count}} txs",
        },
      },
      dashboard: {
        title: "Dashboard",
        welcome: "Welcome back, {{name}}",
        cards: {
          newAnalysis: {
            title: "New Analysis",
            description: "Start analyzing transaction flows",
          },
          recentSearches: {
            title: "Recent Searches",
            description: "{{count}} searches",
          },
          savedScenarios: {
            title: "Saved Scenarios",
            description: "{{count}} scenarios",
          },
        },
        empty: {
          title: "No analysis history yet",
          description: "Start by exploring transaction flows between addresses",
        },
      },
      error: {
        subtitle: "Something went wrong",
        description: "An unexpected error occurred. Please try again.",
      },
      notFound: {
        subtitle: "Page Not Found",
        description: "The page you're looking for doesn't exist or has been moved.",
      },
    },
  },
  zh: {
    translation: {
      common: {
        appName: "AML 檢測",
        nav: {
          login: "登入",
          signup: "註冊",
          dashboard: "控制台",
          explore: "探索",
          greeting: "您好，{{name}}",
        },
        footer: "© {{year}} AML 檢測。為透明度與合規而打造。",
        actions: {
          startAnalyzing: "開始分析",
          viewDashboard: "查看控制台",
          fillDemo: "填入範例",
          search: "搜尋",
          searching: "搜尋中...",
          logout: "登出",
          goHome: "回到首頁",
          tryAgain: "再試一次",
          signIn: "登入",
          signUp: "註冊",
        },
        riskLevel: {
          label: "風險等級",
          high: "高",
          medium: "中",
          low: "低",
        },
      },
      home: {
        hero: {
          titleMain: "加密貨幣地址",
          titleHighlight: "資金流分析",
          description:
            "追蹤並視覺化錢包地址之間的交易流向，找出隱藏的關聯並掌握跨鏈資金動態。",
          ctaAnalyze: "開始分析",
          ctaDashboard: "查看控制台",
        },
        features: {
          search: {
            title: "多地址搜尋",
            description: "跨鏈找出兩個地址之間的所有交易路徑",
          },
          graph: {
            title: "互動圖譜",
            description: "以直覺的視覺化與篩選功能探索資金流向",
          },
          risk: {
            title: "風險分析",
            description: "辨識可疑模式與高風險地址",
          },
        },
      },
      auth: {
        login: {
          title: "登入您的帳號",
          emailLabel: "電子郵件",
          emailPlaceholder: "demo@example.com",
          passwordLabel: "密碼",
          passwordPlaceholder: "••••••••",
          submitLoading: "登入中...",
          submit: "登入",
          registerPrompt: "還沒有帳號？",
          registerLink: "立即註冊",
          errorGeneric: "發生錯誤，請再試一次。",
          errorDefault: "登入失敗",
          errorInvalidCredentials: "電子郵件或密碼錯誤",
          errorEmailNotConfirmed: "請先驗證您的電子郵件再登入",
        },
        register: {
          title: "建立您的帳號",
          nameLabel: "名稱",
          namePlaceholder: "您的名稱",
          emailLabel: "電子郵件",
          emailPlaceholder: "you@example.com",
          passwordLabel: "密碼",
          passwordPlaceholder: "••••••••",
          passwordHint: "至少 6 個字元",
          submitLoading: "建立帳號中...",
          submit: "註冊",
          loginPrompt: "已經有帳號了嗎？",
          loginLink: "前往登入",
          errorGeneric: "發生錯誤，請再試一次。",
          errorDefault: "註冊失敗",
          errorEmailExists: "此電子郵件已被註冊",
          errorWeakPassword: "密碼強度不足，請使用更強的密碼。",
        },
        verification: {
          title: "請檢查您的電子郵件",
          message:
            "我們已將驗證連結發送至 {{email}}，請檢查您的收件匣並點擊連結來驗證您的帳號。",
          notReceived: "沒有收到郵件？",
          resendLink: "重新發送驗證郵件",
          resending: "發送中...",
          resentSuccess: "驗證郵件已發送！",
          resentError: "重新發送失敗，請再試一次。",
          backToLogin: "返回登入",
        },
        confirm: {
          verifying: "正在驗證您的電子郵件...",
          successTitle: "電子郵件已驗證！",
          successMessage: "您的電子郵件已成功驗證，即將跳轉至登入頁面...",
          errorTitle: "驗證失敗",
          errorMessage: "驗證連結無效或已過期，請重新註冊。",
          errorExpired: "此驗證連結已過期，請重新申請。",
        },
        logout: {
          successTitle: "已成功登出",
          successMessage: "{{seconds}} 秒後將回到首頁。",
          error: "登出失敗，請再試一次。",
        },
      },
      explore: {
        form: {
          sourceLabel: "來源地址",
          destinationLabel: "目的地址",
          addressPlaceholder: "0x...",
          depthLabel: "搜尋深度：{{depth}}",
        },
        messages: {
          fetchError: "無法取得圖譜資料",
          genericError: "取得資料時發生錯誤",
          emptyTitle: "輸入兩個地址即可視覺化交易流向",
        },
      },
      graph: {
        edge: {
          transactionCount_one: "{{count}} 筆交易",
          transactionCount_other: "{{count}} 筆交易",
        },
      },
      dashboard: {
        title: "控制台",
        welcome: "歡迎回來，{{name}}",
        cards: {
          newAnalysis: {
            title: "新增分析",
            description: "開始分析交易資金流程",
          },
          recentSearches: {
            title: "最近搜尋",
            description: "{{count}} 次搜尋",
          },
          savedScenarios: {
            title: "已儲存情境",
            description: "{{count}} 個情境",
          },
        },
        empty: {
          title: "尚無分析紀錄",
          description: "先從探索地址之間的交易流程開始吧",
        },
      },
      error: {
        subtitle: "發生一些問題",
        description: "發生未預期的錯誤，請再試一次。",
      },
      notFound: {
        subtitle: "找不到頁面",
        description: "您尋找的頁面不存在或已被移動。",
      },
    },
  },
} as const;

export type AppResources = typeof resources;

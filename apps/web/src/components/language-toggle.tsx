'use client';

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import "@/lib/i18n";
import { isAppLanguage, languages } from "@/lib/i18n-resources";

const languageLabels: Record<(typeof languages)[number], string> = {
  en: "EN",
  zh: "中文",
};

export function LanguageToggle() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (stored && stored !== i18n.language && isAppLanguage(stored)) {
      void i18n.changeLanguage(stored);
    }
  }, [i18n]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  const handleChange = (code: (typeof languages)[number]) => () => {
    if (code === i18n.language) {
      return;
    }

    void i18n.changeLanguage(code);

    if (typeof window !== "undefined") {
      localStorage.setItem("lang", code);
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = code;
    }
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-300 bg-white/90 p-1 text-xs font-medium shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80">
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          onClick={handleChange(code)}
          className={clsx(
            "rounded-full px-3 py-1 transition-colors",
            code === i18n.language
              ? "bg-blue-600 text-white"
              : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
          )}
        >
          {languageLabels[code]}
        </button>
      ))}
    </div>
  );
}

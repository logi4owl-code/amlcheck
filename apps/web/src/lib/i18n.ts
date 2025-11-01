'use client';

import i18next, { type InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultNS, fallbackLng, resources } from "./i18n-resources";

const options: InitOptions = {
  resources,
  fallbackLng,
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
};

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init(options);
}

export default i18next;

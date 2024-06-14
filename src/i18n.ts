import { createI18n } from "vue-i18n";

import en from "./assets/locales/en.json";
import zh from "./assets/locales/zh.json";

const LANG_KEY = "lang";
const DEFAULT_LANG = "en";

const MESSAGES = {
  en: en,
  zh: zh,
};

export declare type LOCALE = keyof typeof MESSAGES;

const getLanguage = () => {
  const browserLang = navigator.language
    ? navigator.language.split("-")[0]
    : null;
  return localStorage.getItem(LANG_KEY) || browserLang || DEFAULT_LANG;
};

export const changeLanguage = (lang: LOCALE) => {
  localStorage.setItem(LANG_KEY, lang);
  i18n.global.locale.value = lang;
};

export const i18n = createI18n({
  locale: getLanguage(),
  fallbackLocale: DEFAULT_LANG,
  legacy: false,
  allowComposition: true,
  globalInjection: true,
  messages: MESSAGES,
});

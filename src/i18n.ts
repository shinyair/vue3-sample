import { createI18n } from "vue-i18n";
import en from "@/assets/locales/en";
import zh from "@/assets/locales/zh";

const DEFAULT_LANG = "en";

const getLanguage = () => {
  const browserLang = navigator.language
    ? navigator.language.split("-")[0]
    : null;
  return browserLang || DEFAULT_LANG;
};

export const i18n = createI18n({
  locale: getLanguage(),
  fallbackLocale: DEFAULT_LANG,
  legacy: false,
  allowComposition: true,
  globalInjection: true,
  messages: {
    en: en,
    zh: zh,
  },
});

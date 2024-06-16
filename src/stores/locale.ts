import { ref } from "vue";
import { defineStore } from "pinia";
import { changeLanguage } from "../i18n";

const LOCALE_KEY = "locale";
const DEFAULT_LOCALE = "en";
const LOCALES = ["en", "zh", "ja"];

const getCurrentLocale = () => {
  const savedLocale = localStorage.getItem(LOCALE_KEY);
  if (savedLocale) {
    return savedLocale;
  }
  return navigator.language.split("-")[0] || DEFAULT_LOCALE;
};

export const useLocaleStore = defineStore("locale", () => {
  const locale = ref(getCurrentLocale());
  const changeLocale = (newLocale: string) => {
    changeLanguage(newLocale);
    const validLocale = LOCALES.includes(newLocale)
      ? newLocale
      : DEFAULT_LOCALE;
    locale.value = validLocale;
    localStorage.setItem(LOCALE_KEY, validLocale);
  };
  return { locale, changeLocale };
});

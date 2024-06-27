import { ref } from "vue";
import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";
import { i18n } from "@/i18n";
import { STORAGE_LANG_KEY } from "@/constants/localstorage";

type Language = keyof typeof i18n.global.messages.value;

const initI18nLocale = () => {
  const savedLang = localStorage.getItem(STORAGE_LANG_KEY);
  if (!savedLang) {
    return;
  }
  const validLang = savedLang as Language;
  if (!validLang) {
    return;
  }
  i18n.global.locale.value = validLang;
};

export const useLanguageStore = defineStore("language", () => {
  initI18nLocale();
  const { locale, availableLocales } = useI18n();
  const language = ref(locale.value);
  const languages = ref(availableLocales);
  const changeLanguage = (langStr: string) => {
    const lang = langStr as Language;
    if (!lang) {
      return;
    }
    i18n.global.locale.value = lang;
    localStorage.setItem(STORAGE_LANG_KEY, lang);
    language.value = locale.value;
  };
  return { language, languages, changeLanguage };
});

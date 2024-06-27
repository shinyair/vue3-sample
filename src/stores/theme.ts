import { ref } from "vue";
import { defineStore } from "pinia";
import { STORAGE_THEME_KEY } from "@/constants/localstorage";

export const THEMES = {
  light: "light",
  dark: "dark",
};
const THEME_MODES = Object.values(THEMES);

const getDomThemeClass = () => {
  return THEME_MODES.find((mode) =>
    document.documentElement.classList.contains(mode),
  );
};

const setDomThemeClass = (theme: string) => {
  if (document.documentElement.classList.contains(theme)) {
    return;
  }
  THEME_MODES.forEach((mode) => {
    document.documentElement.classList.remove(mode);
  });
  document.documentElement.classList.add(theme);
};

const initDomThemeClass = () => {
  const saved = localStorage.getItem(STORAGE_THEME_KEY);
  if (!saved) {
    return;
  }
  const added = getDomThemeClass();
  if (saved !== added) {
    setDomThemeClass(saved);
  }
};

const getOrDefault = () => {
  const added = getDomThemeClass();
  return added ? added : THEMES.light;
};

export const useThemeStore = defineStore("theme", () => {
  initDomThemeClass();
  const theme = ref(getOrDefault());
  const changeTheme = (mode: string) => {
    if (!THEME_MODES.includes(mode)) {
      return;
    }
    theme.value = mode;
    setDomThemeClass(mode);
    localStorage.setItem(STORAGE_THEME_KEY, mode);
  };
  return { theme, changeTheme };
});

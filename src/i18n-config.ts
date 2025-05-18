export const i18n = {
  locales: [
    { code: "en-US", name: "English", icon: "🇺🇸" },
    { code: "fr", name: "Français", icon: "🇫🇷" },
    { code: "rw", name: "Ikinyarwanda", icon: "🇷🇼" },
  ],
  defaultLocale: "rw",
};

export const getDirection = (locale: string) => {
  return locale === "fr" ? "rtl" : "ltr";
};
export type I18nConfig = typeof i18n;
export type Locale = I18nConfig["locales"][number]["code"];

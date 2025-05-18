import { defineRouting } from "next-intl/routing";
import { i18n } from "../i18n-config";

// Extract just the locale codes
const localeCodes = i18n.locales.map((locale) => locale.code);

export const routing = defineRouting({
  locales: localeCodes,
  defaultLocale: i18n.defaultLocale,
  localePrefix: "as-needed",
});

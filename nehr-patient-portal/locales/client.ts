"use client";

import { createI18nClient } from "next-international/client";

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useCurrentLocale,
  useChangeLocale,
} = createI18nClient({
  en: () => import("./translations/en"),
  si: () => import("./translations/si"),
  ta: () => import("./translations/ta"),
});

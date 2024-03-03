import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import("./translations/en"),
  si: () => import("./translations/si"),
  ta: () => import("./translations/ta"),
});

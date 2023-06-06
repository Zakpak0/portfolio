import "server-only";
import type { Locale } from "i18n-config";

export const getDictionary = async function (locale: Locale) {
  return {
    en: {
      home: "Home",
    },
    es: {
      home: "Inicio",
    },
    jp: {
      home: "ホーム",
    },
  }[locale];
};

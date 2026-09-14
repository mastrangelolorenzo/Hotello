import translations from "./translations.json";

export type Locale = keyof typeof translations;

export type Translations = (typeof translations)[Locale];

export const defaultLocale: Locale = "it";

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] ?? translations[defaultLocale];
}

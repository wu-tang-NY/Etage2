import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["ua", "ru"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  };
});

import { NextIntlClientProvider } from "next-intl";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import DefaultLayout from "./default-layout";

import { routing } from "../../i18n/routing";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import LoadingScreen from "@/components/common/LoadingScreen/loading-screen";

const locales = ["ua", "ru"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://etage.com.ua"),
    alternates: {
      languages: {
        // Use proper ISO 639-1 language codes for hreflang
        "uk-UA": "/ua", // Ukrainian
        uk: "/ua",
        "ru-RU": "/ru", // Russian
        ru: "/ru",
        "x-default": "/ua",
      },
    },
    other: {
      "google-site-verification": "vKA3RhUs0WxI3pWumanZ7yC33v9yf74_KzTRS4CLMkE",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  await setRequestLocale(locale);

  const messages = await getMessages();

  // Map internal locale codes to proper ISO 639-1 language codes
  const htmlLang = locale === "ua" ? "uk" : locale;

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Професійний сервіс переїздів та вантажоперевезень в Дніпрі та Одесі"
        />
        <meta
          name="google-site-verification"
          content="vKA3RhUs0WxI3pWumanZ7yC33v9yf74_KzTRS4CLMkE"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#ffa511"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700;900&family=Roboto:wght@400;500;700;900&display=swap&subset=cyrillic"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes animloader {
              0% {
                box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
              }
              12% {
                box-shadow: 0 24px white, 24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
              }
              25% {
                box-shadow: 0 24px white, 24px 24px white, 24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
              }
              37% {
                box-shadow: 0 24px white, 24px 24px white, 24px 48px white, 0px 48px rgba(255, 255, 255, 0);
              }
              50% {
                box-shadow: 0 24px white, 24px 24px white, 24px 48px white, 0px 48px white;
              }
              62% {
                box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px white, 24px 48px white, 0px 48px white;
              }
              75% {
                box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0), 24px 48px white, 0px 48px white;
              }
              87% {
                box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0), 0px 48px white;
              }
              100% {
                box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0), 24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
              }
            }
            @keyframes animloader2 {
              0% {
                transform: translate(0, 0) rotateX(0) rotateY(0);
              }
              25% {
                transform: translate(100%, 0) rotateX(0) rotateY(180deg);
              }
              50% {
                transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
              }
              75% {
                transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
              }
              100% {
                transform: translate(0, 0) rotateX(0) rotateY(360deg);
              }
            }
            /* Show loading screen immediately before React hydrates */
            #initial-loading-screen {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: #1f2a3a;
              z-index: 9999999;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            body.loading-complete #initial-loading-screen {
              display: none;
            }
            #initial-loading-screen .loader {
              display: inline-block;
              width: 48px;
              height: 48px;
              position: relative;
              transform: rotate(45deg);
            }
            #initial-loading-screen .loader::before {
              content: '';
              box-sizing: border-box;
              width: 24px;
              height: 24px;
              position: absolute;
              left: 0;
              top: -24px;
              animation: animloader 4s ease infinite;
            }
            #initial-loading-screen .loader::after {
              content: '';
              box-sizing: border-box;
              position: absolute;
              left: 0;
              top: 0;
              width: 24px;
              height: 24px;
              background: white;
              animation: animloader2 2s ease infinite;
            }
          `,
          }}
        />
      </head>
      <body className="bg-light dark:bg-dark">
        <div id="initial-loading-screen">
          <span className="loader" />
        </div>
        <LoadingScreen />
        <ThemeProvider
          attribute="class"
          defaultTheme="theme-dark"
          themes={["theme-dark", "theme-light"]}
          enableSystem={false}
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <DefaultLayout>{children}</DefaultLayout>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

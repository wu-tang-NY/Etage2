import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutUsContent from "./content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t("aboutUs.title");
  const description = t("seo.aboutUs.description", {
    default: t("aboutUs.paragraph1"),
  });

  return {
    title: `${title} - ${t("meta.title", { default: "Etage" })}`,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function AboutUsPage() {
  return <AboutUsContent />;
}

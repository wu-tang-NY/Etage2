import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FactsContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('facts.title');
  const description = t('seo.facts.description', {
    default: t('facts.intro'),
  });

  return {
    title: `${title} - ${t('meta.title', { default: 'Etage' })}`,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default function FactsPage() {
  return <FactsContent />;
}


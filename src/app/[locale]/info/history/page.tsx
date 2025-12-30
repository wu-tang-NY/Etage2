import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import HistoryContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('history.title');
  const description = t('seo.history.description', {
    default: t('history.paragraph1'),
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

export default function HistoryPage() {
  return <HistoryContent />;
}


import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AutoContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('auto.title');
  const description = t('seo.auto.description', {
    default: t('auto.paragraph1'),
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

export default function AutoPage() {
  return <AutoContent />;
}


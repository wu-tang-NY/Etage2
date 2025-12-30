import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SpecialistsContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('specialists.title');
  const description = t('seo.specialists.description', {
    default: t('specialists.paragraph1'),
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

export default function SpecialistsPage() {
  return <SpecialistsContent />;
}


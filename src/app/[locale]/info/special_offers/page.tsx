import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import SpecialOffersContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('specialOffers.title');
  const description = t('seo.specialOffers.description', {
    default: t('specialOffers.title'),
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

export default function SpecialOffersPage() {
  return <SpecialOffersContent />;
}


import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ReviewsContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('feedback.title');
  const description = t('seo.reviews.description', {
    default: t('reviews.title'),
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

export default function ReviewsPage() {
  return <ReviewsContent />;
}


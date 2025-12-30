import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import StuffMoveContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('stuffMove.title');
  const description = t('seo.stuffMove.description', {
    default: t('stuffMove.paragraph1'),
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

export default function StuffMovePage() {
  return <StuffMoveContent />;
}


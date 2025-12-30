import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FlatMoveContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('flatMove.title');
  const description = t('seo.flatMove.description', {
    default: t('flatMove.paragraph1'),
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

export default function FlatMovePage() {
  return <FlatMoveContent />;
}


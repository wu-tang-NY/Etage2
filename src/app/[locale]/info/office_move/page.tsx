import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import OfficeMoveContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('officeMove.title');
  const description = t('seo.officeMove.description', {
    default: t('officeMove.paragraph1'),
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

export default function OfficeMovePage() {
  return <OfficeMoveContent />;
}


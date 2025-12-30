import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import OurGoalContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('ourGoal.title');
  const description = t('seo.ourGoal.description', {
    default: t('ourGoal.paragraph1'),
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

export default function OurGoalPage() {
  return <OurGoalContent />;
}


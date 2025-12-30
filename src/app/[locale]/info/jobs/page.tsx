import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import JobsContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('jobs.title');
  const description = t('seo.jobs.description', {
    default: t('jobs.paragraph1'),
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

export default function JobsPage() {
  return <JobsContent />;
}


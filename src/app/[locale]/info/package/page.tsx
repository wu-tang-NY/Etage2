import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackageContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('package.title');
  const description = t('seo.package.description', {
    default: t('package.paragraph1'),
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

export default function PackagePage() {
  return <PackageContent />;
}


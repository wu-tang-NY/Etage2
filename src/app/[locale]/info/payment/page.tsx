import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PaymentContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('payment.title');
  const description = t('seo.payment.description', {
    default: t('payment.paragraph1'),
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

export default function PaymentPage() {
  return <PaymentContent />;
}


import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactsContent from './content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const title = t('contacts.title');
  const description = t('seo.contacts.description', {
    default: t('contacts.address'),
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

export default function ContactsPage() {
  return <ContactsContent />;
}


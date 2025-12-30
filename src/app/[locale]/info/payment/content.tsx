'use client';

import { useTranslations } from 'next-intl';

export default function PaymentContent() {
  const t = useTranslations();

  return (
    <>
      <h2>{t('payment.title')}</h2>
      <p>{t('payment.paragraph1')}</p>
      <p>{t('payment.paragraph2')}</p>
      <p>{t('payment.paragraph3')}</p>
    </>
  );
}


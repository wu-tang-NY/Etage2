'use client';

import { useTranslations } from 'next-intl';

export default function JobsContent() {
  const t = useTranslations();

  return (
    <>
      <h2>{t('jobs.title')}</h2>
      <p>{t('jobs.paragraph1')}</p>
      <p>{t('jobs.paragraph2')}</p>
    </>
  );
}


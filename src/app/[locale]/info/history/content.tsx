'use client';

import { useTranslations } from 'next-intl';

export default function HistoryContent() {
  const t = useTranslations();

  return (
    <>
      <h2>{t('history.title')}</h2>
      <p>{t('history.paragraph1')}</p>
      <p>{t('history.paragraph2')}</p>
      <p>{t('history.paragraph3')}</p>
      <p>{t('history.paragraph4')}</p>
      <p>{t('history.paragraph5')}</p>
    </>
  );
}


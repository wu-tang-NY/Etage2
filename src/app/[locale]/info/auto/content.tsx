'use client';

import { useTranslations } from 'next-intl';

export default function AutoContent() {
  const t = useTranslations();

  return (
    <>
      <h2>{t('auto.title')}</h2>
      <p>{t('auto.question1')}</p>
      <p>{t('auto.paragraph1')}</p>
      <p>{t('auto.paragraph2')}</p>
      <p>{t('auto.paragraph3')}</p>
      <p>{t('auto.question2')}</p>
      <ul>
        <li>
          {t('auto.reason1Title')}
          <p>{t('auto.reason1Desc')}</p>
        </li>
        <li>
          {t('auto.reason2Title')}
          <p>{t('auto.reason2Desc')}</p>
        </li>
        <li>
          {t('auto.reason3Title')}
          <p>{t('auto.reason3Desc')}</p>
        </li>
      </ul>
      <p>{t('auto.price')}</p>
    </>
  );
}


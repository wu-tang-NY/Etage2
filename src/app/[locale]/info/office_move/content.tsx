'use client';

import { useTranslations } from 'next-intl';

export default function OfficeMoveContent() {
  const t = useTranslations();

  return (
    <>
      <h2>{t('officeMove.title')}</h2>
      <p>{t('officeMove.paragraph1')}</p>
      <p>{t('officeMove.question')}</p>
      <ul>
        <li>{t('officeMove.reason1')}</li>
        <li>{t('officeMove.reason2')}</li>
        <li>{t('officeMove.reason3')}</li>
        <li>{t('officeMove.reason4')}</li>
        <li>{t('officeMove.reason5')}</li>
        <li>{t('officeMove.reason6')}</li>
      </ul>
    </>
  );
}


'use client';

import { useTranslations } from 'next-intl';

export default function OurGoalContent() {
  const t = useTranslations();

  return (
    <>
      <h2>{t('ourGoal.title')}</h2>
      <p>{t('ourGoal.paragraph1')}</p>
      <p>{t('ourGoal.paragraph2')}</p>
    </>
  );
}


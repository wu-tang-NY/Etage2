'use client';

import { useTranslations } from 'next-intl';

export default function SpecialOffersContent() {
  const t = useTranslations();

  return (
    <>
      <h2>{t('specialOffers.title')}</h2>
      <ul>
        <li>{t('specialOffers.offer1')}</li>
        <li>
          {t('specialOffers.offer2')}
          <p>{t('specialOffers.offer2Note')}</p>
        </li>
        <li>{t('specialOffers.offer3')}</li>
      </ul>
    </>
  );
}


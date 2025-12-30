'use client';

import { useTranslations } from 'next-intl';

export default function ContactsContent() {
  const t = useTranslations();

  return (
    <>
      <h2>{t('contacts.title')}</h2>
      <h3>{t('contacts.company')}</h3>
      <p>{t('contacts.address')}</p>
      <p>
        <a href="tel:+380973170434">+38 097 317 0434</a>
        <br />
        <a href="tel:+380669680944">+38 066 968 0944</a>
      </p>
      <p>
        {t('contacts.emailLabel')}
        <a href="mailto:support@etage.com.ua">support@etage.com.ua</a>
      </p>
      <p>{t('contacts.mapTitle')}</p>
      <div className="info-map w-full h-[300px] mt-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2747.635342285657!2d30.719623415591563!3d46.4757305791259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c6318e938e782b%3A0xff287e6aa12db202!2z0LLRg9C70LjRhtGPINCa0L7Qu9C-0L3RgtCw0ZfQstGB0YzQutCwLCA3LCDQntC00LXRgdCwLCDQntC00LXRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNjUwMDA!5e0!3m2!1sru!2sua!4v1560112076644!5m2!1sru!2sua"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </>
  );
}


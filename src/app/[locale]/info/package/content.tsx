'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function PackageContent() {
  const t = useTranslations();

  const packageItems = [
    {
      title: t('package.boxTitle'),
      image: '/images/packages/img_1_2x.jpg',
      desc: t('package.boxDesc'),
    },
    {
      title: t('package.stretchTitle'),
      image: '/images/packages/img_2_2x.jpg',
      desc: t('package.stretchDesc'),
    },
    {
      title: t('package.bubbleTitle'),
      image: '/images/packages/img_3_2x.jpg',
      desc: t('package.bubbleDesc'),
    },
    {
      title: t('package.tapeTitle'),
      image: '/images/packages/img_4_2x.jpg',
      desc: t('package.tapeDesc'),
    },
    {
      title: t('package.cornerTitle'),
      image: '/images/packages/img_5_2x.jpg',
      desc: t('package.cornerDesc'),
    },
    {
      title: t('package.bagTitle'),
      image: '/images/packages/img_6_2x.jpg',
      desc: t('package.bagDesc'),
    },
    {
      title: t('package.foamTitle'),
      image: '/images/packages/img_7_2x.jpg',
      desc: t('package.foamDesc'),
    },
    {
      title: t('package.polybagTitle'),
      image: '/images/packages/img_8_2x.jpg',
      desc: t('package.polybagDesc'),
    },
    {
      title: t('package.paperTitle'),
      image: '/images/packages/img_9_2x.jpg',
      desc: t('package.paperDesc'),
    },
    {
      title: t('package.cardboardTitle'),
      image: '/images/packages/img_10_2x.jpg',
      desc: t('package.cardboardDesc'),
    },
  ];

  return (
    <>
      <h2>{t('package.title')}</h2>
      <p>{t('package.paragraph1')}</p>
      <p>{t('package.typesTitle')}</p>
      <ul className="list-none m-0 p-0 [&>li]:mt-6 [&>li]:mr-2 [&>li]:mb-8 [&>li]:ml-0 [&>li>h6]:mb-4">
        {packageItems.map((item, index) => (
          <li key={index}>
            <h6
              style={{
                color: 'color-mix(in srgb, var(--colors-accent) 90%, white)',
              }}
            >
              {item.title}
            </h6>
            <Image
              src={item.image}
              alt={item.title}
              title={item.title}
              width={400}
              height={300}
              sizes="(max-width: 767px) 100vw, (max-width: 992px) 50vw, 33vw"
              loading="lazy"
              className="w-full"
            />
            <p>{item.desc}</p>
          </li>
        ))}
      </ul>
      <p>{t('package.planningTitle')}</p>
      <p>{t('package.planningDesc')}</p>
      <p>{t('package.deliveryTitle')}</p>
      <ul>
        <li>{t('package.delivery1')}</li>
      </ul>
      <p>{t('package.pickupTitle')}</p>
      <ul>
        <li>{t('package.pickupDesc')}</li>
      </ul>
    </>
  );
}


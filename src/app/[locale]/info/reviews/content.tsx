'use client';

import { useTranslations } from 'next-intl';

export default function ReviewsContent() {
  const t = useTranslations();

  const categoryMap: { [key: string]: string } = {
    slide1: t('feedback.categories.flatMove'),
    slide2: t('feedback.categories.stuffMove'),
    slide3: t('feedback.categories.flatMove'),
    slide4: t('feedback.categories.stuffMove'),
    slide5: t('feedback.categories.houseMove'),
    slide6: t('feedback.categories.commercialMove'),
  };

  const comments = [
    {
      name: t('reviews.slides.slide1.title'),
      category: categoryMap.slide1,
      comment: t('reviews.slides.slide1.desc'),
    },
    {
      name: t('reviews.slides.slide2.title'),
      category: categoryMap.slide2,
      comment: t('reviews.slides.slide2.desc'),
    },
    {
      name: t('reviews.slides.slide3.title'),
      category: categoryMap.slide3,
      comment: t('reviews.slides.slide3.desc'),
    },
    {
      name: t('reviews.slides.slide4.title'),
      category: categoryMap.slide4,
      comment: t('reviews.slides.slide4.desc'),
    },
    {
      name: t('reviews.slides.slide5.title'),
      category: categoryMap.slide5,
      comment: t('reviews.slides.slide5.desc'),
    },
    {
      name: t('reviews.slides.slide6.title'),
      category: categoryMap.slide6,
      comment: t('reviews.slides.slide6.desc'),
    },
  ];

  return (
    <>
      <h2>{t('feedback.title')}</h2>
      {comments.map((comment, index) => (
        <div key={index} className="mb-10">
          <h5 className="text-primary font-bold mb-0">{comment.name}</h5>
          <div className="text-sm text-gray-500 font-medium mb-2">
            {comment.category}
          </div>
          <p className="text-base leading-relaxed mt-3">{comment.comment}</p>
        </div>
      ))}
    </>
  );
}


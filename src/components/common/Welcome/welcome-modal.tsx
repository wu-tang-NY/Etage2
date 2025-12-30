'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import Modal from '@/components/ui/Modal/modal';
import Button from '@/components/ui/Button/button';
import SvgIcon from '../SvgIcon';
import { eventbus } from '@/lib/eventbus';

export default function WelcomeModal() {
  const t = useTranslations();
  const [show, setShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleOpenModal = () => {
      setShow(true);
      startAutoCloseTimer();
    };

    eventbus.on('openWelcomeModal', handleOpenModal);

    return () => {
      eventbus.off('openWelcomeModal', handleOpenModal);
      clearTimer();
    };
  }, []);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const startAutoCloseTimer = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      closeModal();
    }, 10000); // 10 seconds
  };

  const closeModal = () => {
    setShow(false);
    clearTimer();
  };

  return (
    <Modal show={show} onUpdateShow={setShow}>
      <div className="flex flex-col items-center justify-center">
        <SvgIcon name="icon_thanks" className="mb-4 size-20" original />
        <h2>{t('welcome.thanks')}</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          {t('welcome.thanksMessage')}
        </p>

        <Button variant="primary" size="lg" className="w-full" onClick={closeModal}>
          {t('welcome.backToSite')}
        </Button>
      </div>
    </Modal>
  );
}


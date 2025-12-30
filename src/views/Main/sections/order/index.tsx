'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button/button';
import Modal from '@/components/ui/Modal/modal';
import CallFormComponent from './components/CallFormComponent';
import OrderFormComponent from './components/OrderFormComponent';
import { eventbus } from '@/lib/eventbus';

interface PageSectionOrderProps {
  active?: boolean;
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
}

export default function PageSectionOrder({
  active,
  mobile,
  tablet,
  desktop,
}: PageSectionOrderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'call' | 'order'>('call');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = {
    call: {
      component: CallFormComponent,
      title: 'callForm.title',
      subtitle: 'callForm.subtitle',
    },
    order: {
      component: OrderFormComponent,
      title: 'orderForm.title',
      subtitle: 'orderForm.subtitle',
    },
  };

  useEffect(() => {
    const handleOpenFormModal = () => {
      setActiveTab('order');
      if (mobile || tablet) {
        setIsModalOpen(true);
      }
    };

    eventbus.on('openFormModal', handleOpenFormModal);

    return () => {
      eventbus.off('openFormModal', handleOpenFormModal);
    };
  }, [mobile, tablet]);

  const openModal = (tab: 'call' | 'order') => {
    setActiveTab(tab);
    if (mobile || tablet) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const TabComponent = tabs[activeTab].component;

  return (
    <>
      <h2 className="mb-4">{t('order.title')}</h2>

      <div className="text-gray-800 dark:text-gray-400 mb-8">
        {t('order.subtitle')}
      </div>

      <div className="flex items-center lg:items-start justify-start flex-wrap flex-col lg:flex-row lg:flex-nowrap mb-6">
        <div className="flex items-center justify-center flex-col lg:items-start lg:justify-start mb-2 lg:mb-0">
          <Button
            variant="secondary"
            size="lg"
            className="mb-3 lg:pr-10 lg:pl-5 lg:[clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_100%,0_100%)]"
            active={activeTab === 'call'}
            onClick={() => openModal('call')}
          >
            {t('order.leaveNumber')}
          </Button>

          <div
            className={`text-sm leading-normal mx-auto text-gray-500 ${
              activeTab === 'call' ? 'text-gray-800 dark:text-gray-400' : ''
            }`}
          >
            {t('order.leaveNumberDesc')}
          </div>
        </div>

        <div className="text-sm leading-9 font-bold py-2 px-5">
          {t('common.or')}
        </div>

        <div className="flex items-center justify-center flex-col lg:items-start lg:justify-start lg:text-left mb-2 lg:mb-0 max-w-[210px]">
          <Button
            className="mb-3 lg:pl-10 lg:pr-5 lg:[clip-path:polygon(0_0,100%_0,100%_100%,20px_100%)]"
            variant="secondary"
            size="lg"
            active={activeTab === 'order'}
            onClick={() => openModal('order')}
          >
            {t('order.fillForm')}
          </Button>

          <div
            className={`text-sm text-gray-400 text-center lg:text-left lg:pl-5 ${
              activeTab === 'order' ? 'text-gray-800 dark:text-gray-400' : ''
            }`}
          >
            {t('order.fillFormDesc')}
          </div>
        </div>
      </div>

      {!mobile && !tablet && (
        <TabComponent
          mobile={mobile}
          tablet={tablet}
          onCloseModal={closeModal}
        />
      )}

      {(mobile || tablet) && (
        <Modal
          show={isModalOpen}
          title={t(tabs[activeTab].title)}
          subtitle={t(tabs[activeTab].subtitle)}
          onUpdateShow={setIsModalOpen}
        >
          <TabComponent
            mobile={mobile}
            tablet={tablet}
            onCloseModal={closeModal}
          />
        </Modal>
      )}
    </>
  );
}


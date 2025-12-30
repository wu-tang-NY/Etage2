'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import MainNav from '../../../app/[locale]/components/main-nav';
import Phones from '@/components/common/Phones/phones';
import Schedule from '@/components/common/Schedule/schedule';
import Callback from '@/components/common/Callback/callback';

interface MobileMenuProps {
  navOpen: boolean;
  showDecorations: boolean;
  onClose: () => void;
}

export default function MobileMenu({ navOpen, showDecorations, onClose }: MobileMenuProps) {
  const t = useTranslations();

  return (
    <div
      className={`bg-light dark:bg-dark fixed left-0 top-0 bottom-0 py-4 w-full lg:translate-x-0 pt-4 box-border overflow-y-scroll z-[999] transition-transform duration-300 lg:relative ${
        navOpen ? 'translate-none' : '-translate-x-full'
      } ${showDecorations ? 'pt-[120px]' : ''}`}
    >
      <div className="container mx-auto h-full pt-6">
        <div className="flex flex-col h-full">
          <div className="flex flex-col flex-1 flex-auto">
            <ul className="list-none -mx-4 p-0">
              <li className="mt-6 first:mt-0">
                <div className="bg-gray-200 dark:bg-gray-700 [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_100%,0%_100%)] max-w-[300px] flex items-center h-9 px-[35px] pl-4 font-bold">
                  <span>{t('common.menu')}</span>
                </div>

                <div className="pt-4 px-4 max-w-[300px] -ml-4">
                  <MainNav onClose={onClose} />
                </div>
              </li>
            </ul>

            <div className="flex flex-col mt-8 flex-1 lg:hidden">
              <ul className="list-none -mx-4 p-0">
                <li className="mt-6 first:mt-0">
                  <div className="bg-gray-200 dark:bg-gray-700 [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_100%,0%_100%)] max-w-[300px] flex items-center h-9 px-[35px] pl-4 font-bold">
                    <span>{t('common.contacts')}</span>
                    <div className="ml-auto">
                      <Callback />
                    </div>
                  </div>

                  <div className="pt-4 px-4">
                    <Phones />
                  </div>
                </li>

                <li className="mt-6 first:mt-0">
                  <div className="bg-gray-200 dark:bg-gray-700 [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_100%,0%_100%)] max-w-[300px] flex items-center h-9 px-[35px] pl-4 font-bold">
                    <span>{t('common.schedule')}</span>
                  </div>

                  <div className="pt-4 px-4">
                    <Schedule />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


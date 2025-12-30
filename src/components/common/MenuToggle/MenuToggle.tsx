'use client';

import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button/button';

interface MenuToggleProps {
  open: boolean;
  onClick?: () => void;
}

export default function MenuToggle({ open, onClick }: MenuToggleProps) {
  const t = useTranslations();

  return (
    <Button
      icon={true}
      className="relative focus:outline-none rounded"
      ariaLabel={open ? t('common.closeMenu') : t('common.openMenu')}
      title={open ? t('common.closeMenu') : t('common.openMenu')}
      onClick={onClick}
    >
      <div className="block w-4 left-1/2 absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span
          className={`block absolute h-0.5 w-full text-gray-800 dark:text-white bg-current transform transition duration-500 ease-in-out ${
            open ? 'rotate-45' : '-translate-y-1.5'
          }`}
        />
        <span
          className={`block absolute h-0.5 w-3 text-gray-800 dark:text-white bg-current transform transition duration-500 ease-in-out ${
            open ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block absolute h-0.5 w-full text-gray-800 dark:text-white bg-current transform transition duration-500 ease-in-out ${
            open ? '-rotate-45' : 'translate-y-1.5'
          }`}
        />
      </div>
    </Button>
  );
}


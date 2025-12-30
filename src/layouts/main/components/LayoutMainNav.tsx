'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/common/Nav/nav';
import NavItem from '@/components/common/Nav/nav-item';
import { eventbus } from '@/lib/eventbus';

interface LayoutMainNavProps {
  onClose?: () => void;
}

interface NavPage {
  id: string;
  title: string;
  icon: string;
  children?: Array<{ title: string; path: string }>;
}

export default function LayoutMainNav({ onClose }: LayoutMainNavProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [activePage, setActivePage] = useState(0);

  const isInfoRoute = pathname?.includes('/info') ?? false;
  const localizedInfoPath = `/${locale}/info`;

  const pages: NavPage[] = [
    {
      id: 'services_link',
      title: t('nav.services'),
      icon: 'icon_1_c',
      children: [
        { title: t('nav.flatMove'), path: 'flat_move' },
        { title: t('nav.officeMove'), path: 'office_move' },
        { title: t('nav.stuffMove'), path: 'stuff_move' },
        { title: t('nav.specialists'), path: 'specialists' },
        { title: t('nav.package'), path: 'package' },
      ],
    },
    {
      id: 'prices_link',
      title: t('nav.prices'),
      icon: 'icon_2_c',
    },
    {
      id: 'reviews_link',
      title: t('nav.reviews'),
      icon: 'icon_3_c',
    },
    {
      id: 'order_link',
      title: t('nav.order'),
      icon: 'icon_4_c',
    },
  ];

  const handleClick = useCallback((index: number) => {
    if (isInfoRoute) {
      window.sessionStorage.setItem('scrollToSection', index.toString());
      router.push(`/${locale}`);
      onClose?.();
      return;
    }

    setActivePage(index);
    onClose?.();

    requestAnimationFrame(() => {
      eventbus.emit('section:change', index);
    });
  }, [isInfoRoute, locale, router, onClose]);

  useEffect(() => {
    if (isInfoRoute) {
      setActivePage(-1);
      return;
    }

    const handleSectionScroll = (index: number) => {
      if (!isInfoRoute) {
        setActivePage(index);
      }
    };

    eventbus.on('section:scroll', handleSectionScroll);

    const sections = document.querySelector('#sections');
    const el = sections?.querySelector('section.active');

    if (el && !isInfoRoute) {
      const index = Array.from(sections?.children || []).indexOf(el);
      setActivePage(index);
    }

    return () => {
      eventbus.off('section:scroll', handleSectionScroll);
    };
  }, [isInfoRoute, pathname]);

  return (
    <Nav>
      {pages.map((page, index) => (
        <li
          key={page.title}
          className={`group relative ${index > 0 ? 'lg:-ml-4' : ''}`}
        >
          <NavItem
            id={page.id}
            title={page.title}
            icon={page.icon}
            index={index}
            children={page.children}
            active={!isInfoRoute && index === activePage}
            visited={!isInfoRoute && index < activePage}
            onClick={() => handleClick(index)}
            onClose={onClose}
            locale={locale}
          />

          {page.children && page.children.length > 0 && (
            <ul
              className={`group-hover:flex flex-col gap-1 bg-gray-100 dark:bg-gray-800 p-3 absolute top-full z-10 left-0 w-60 hidden group-focus-within/item:block ${
                !isInfoRoute && index === activePage ? '!bg-primary' : ''
              }`}
              role="menu"
            >
              {page.children.map((child) => (
                <li key={child.title} role="menuitem">
                  <Link
                    href={`/${locale}/info/${child.path}`}
                    className="block py-2.5 rounded px-4 font-medium transition-colors duration-150 ease-in-out hover:bg-black/5 dark:hover:bg-white/10 focus:bg-black/5 dark:focus:bg-white/20"
                    role="link"
                    tabIndex={0}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}

      <li className="lg:ml-auto">
        <NavItem
          title={t('navInfo.information')}
          icon="icon_5_c"
          to={localizedInfoPath}
          active={isInfoRoute}
          visited={isInfoRoute}
          className="[clip-path:polygon(0_0,calc(100%-20px)_0,100%_100%,0_100%)] lg:[clip-path:polygon(20px_0,100%_0,100%_100%,0%_100%)]"
          onClose={onClose}
          locale={locale}
        />
      </li>
    </Nav>
  );
}


'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SvgIcon from '@/components/common/SvgIcon';

interface InfoLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  header: string;
  links: Array<{ title: string; slug: string }>;
}

export default function InfoLayout({ children }: InfoLayoutProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [activeGroupIndex, setActiveGroupIndex] = useState<number | null>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const iconRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const navItems: NavItem[] = [
    {
      header: t('modal.aboutCompany'),
      links: [
        { title: t('modal.aboutUs'), slug: 'about_us' },
        { title: t('modal.history'), slug: 'history' },
        { title: t('modal.ourGoal'), slug: 'our_goal' },
        { title: t('modal.facts'), slug: 'facts' },
        { title: t('modal.auto'), slug: 'auto' },
      ],
    },
    {
      header: t('modal.services'),
      links: [
        { title: t('modal.flatMove'), slug: 'flat_move' },
        { title: t('modal.officeMove'), slug: 'office_move' },
        { title: t('modal.stuffMove'), slug: 'stuff_move' },
        { title: t('modal.specialists'), slug: 'specialists' },
        { title: t('modal.package'), slug: 'package' },
      ],
    },
    {
      header: t('modal.information'),
      links: [
        { title: t('modal.jobs'), slug: 'jobs' },
        { title: t('modal.reviews'), slug: 'reviews' },
        { title: t('modal.contacts'), slug: 'contacts' },
      ],
    },
    {
      header: t('modal.payment'),
      links: [{ title: t('modal.payment'), slug: 'payment' }],
    },
    {
      header: t('modal.specialOffers'),
      links: [{ title: t('modal.specialOffers'), slug: 'special_offers' }],
    },
  ];

  const getLocalizedPath = (path: string) => {
    const pathWithoutLocale = path.replace(/^\/(ua|ru)(\/|$)/, '$2');
    return `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
  };

  const toggleAccordion = (index: number) => {
    setActiveGroupIndex(activeGroupIndex === index ? null : index);
  };

  useEffect(() => {
    // Update accordion heights when activeGroupIndex changes
    if (activeGroupIndex !== null) {
      const content = contentRefs.current[`content-${activeGroupIndex}`];
      const icon = iconRefs.current[`icon-${activeGroupIndex}`];
      if (content) {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
      if (icon) {
        icon.style.transform = 'rotate(0deg)';
      }
    }

    // Close other accordions
    Object.keys(contentRefs.current).forEach((key) => {
      const index = parseInt(key.replace('content-', ''));
      if (index !== activeGroupIndex) {
        const content = contentRefs.current[key];
        const icon = iconRefs.current[`icon-${index}`];
        if (content) {
          content.style.maxHeight = '0';
        }
        if (icon) {
          icon.style.transform = 'rotate(180deg)';
        }
      }
    });
  }, [activeGroupIndex]);

  useEffect(() => {
    // Find which group has the active link
    const currentPath = pathname || '';
    const currentSlug = currentPath.split('/').pop() || '';

    const activeIndex = navItems.findIndex((item) =>
      item.links.some((link) => link.slug === currentSlug)
    );

    if (activeIndex !== -1 && navItems[activeIndex].links.length > 1) {
      setActiveGroupIndex(activeIndex);
    }
  }, [pathname]);

  return (
    <div className="container mx-auto">
      <div className="w-full flex flex-col lg:flex-row relative pb-[60px] pb-0 lg:pt-[200px] pt-0">
        <div className="sticky bg-light dark:bg-dark lg:top-[200px] lg:w-[15%] lg:max-w-[15%] lg:min-w-[300px] lg:flex-shrink-0 lg:self-start relative top-0 w-full">
          <div className="info-nav -mx-4 lg:mx-0">
            {navItems.map((item, index) => {
              if (!item || !item.links || item.links.length === 0) return null;

              // Single link item - render as direct link
              if (item.links.length === 1) {
                return (
                  <Link
                    key={index}
                    href={getLocalizedPath(`/info/${item.links[0].slug}`)}
                    className="flex items-center h-9 text-sm max-lg:text-base font-bold px-4 hover:bg-gray-200 dark:hover:bg-gray-800 mb-1 lg:max-w-[210px] max-w-full transition-all duration-300 ease-in-out"
                  >
                    {item.header}
                  </Link>
                );
              }

              // Multiple links - render as accordion
              return (
                <div
                  key={index}
                  className="mb-2 lg:max-w-[210px] cursor-pointer max-w-full w-full"
                >
                  <div
                    className={`flex items-center justify-between h-9 lg:text-sm text-base font-bold px-4 hover:bg-gray-200 dark:hover:bg-gray-800 ${
                      activeGroupIndex === index
                        ? 'bg-gray-200 dark:bg-gray-800'
                        : ''
                    }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{item.header}</span>
                    <div
                      ref={(el) => {
                        iconRefs.current[`icon-${index}`] = el;
                      }}
                      className="w-2 h-4 transition-transform duration-300 ease-in-out"
                      style={{
                        transform: activeGroupIndex === index ? 'rotate(0deg)' : 'rotate(180deg)',
                      }}
                    >
                      <SvgIcon name="modal_dropdown" className="w-full h-full" />
                    </div>
                  </div>
                  <div
                    ref={(el) => {
                      contentRefs.current[`content-${index}`] = el;
                    }}
                    className="transition-[max-height] duration-300 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: activeGroupIndex === index ? '1000px' : '0',
                    }}
                  >
                    {item.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        href={getLocalizedPath(`/info/${link.slug}`)}
                        className="flex items-center h-10 pl-4 my-1 opacity-75 text-base lg:text-sm font-medium hover:opacity-100"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pt-6 info-content text-lg lg:text-base lg:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}


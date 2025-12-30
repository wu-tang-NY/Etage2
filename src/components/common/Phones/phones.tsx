'use client';

import React from 'react';
import Phone from './Phone';
import SocialIcon from '../SocialIcon';

interface PhoneData {
  phone: string;
  link: string;
  operatorIconName: string;
  operatorIconOriginal: boolean;
  iconName: string;
  iconOriginal: boolean;
  ariaLabel: string;
}

export default function Phones() {
  const phones: PhoneData[] = [
    {
      phone: '0973560005',
      link: 'https://viber.click/380953560005',
      operatorIconName: 'operator_2',
      operatorIconOriginal: true,
      iconName: 'icon_vb',
      iconOriginal: true,
      ariaLabel: 'Contact us on Viber',
    },
    {
      phone: '0953560005',
      link: 'https://t.me/+380953560005',
      operatorIconName: 'operator_3',
      operatorIconOriginal: true,
      iconName: 'icon_tg',
      iconOriginal: true,
      ariaLabel: 'Contact us on Telegram',
    },
    {
      phone: '0733560005',
      link: 'https://wa.me/380953560005',
      operatorIconName: 'operator_1',
      operatorIconOriginal: true,
      iconName: 'icon_wa',
      iconOriginal: true,
      ariaLabel: 'Contact us on WhatsApp',
    },
  ];

  return (
    <ul className="font-bold flex flex-col gap-2 lg:gap-0">
      {phones.map((phone) => (
        <li key={phone.phone} className="flex items-center gap-2 lg:gap-1">
          <Phone
            phone={phone.phone}
            operatorIconName={phone.operatorIconName}
            operatorIconOriginal={phone.operatorIconOriginal}
          />
          <SocialIcon
            href={phone.link}
            iconName={phone.iconName}
            original={phone.iconOriginal}
            size="size-4"
            ariaLabel={phone.ariaLabel}
            className="hidden lg:flex"
            target="_blank"
          />
        </li>
      ))}
    </ul>
  );
}


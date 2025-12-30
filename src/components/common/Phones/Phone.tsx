import React from 'react';
import SvgIcon from '../SvgIcon';

interface PhoneProps {
  phone: string;
  operatorIconName: string;
  operatorIconOriginal?: boolean;
}

export default function Phone({
  phone,
  operatorIconName,
  operatorIconOriginal = true,
}: PhoneProps) {
  const operator = phone.slice(0, 3);
  const phoneNumber = `${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8)}`;

  return (
    <div className="font-bold flex">
      <span className="size-4">
        <SvgIcon
          name={operatorIconName}
          original={operatorIconOriginal}
          className="size-full vertical-align-middle"
        />
      </span>
      <a
        href={`tel:+${phone}`}
        className="app-phones__code-text mx-3 flex items-center gap-1 lg:text-sm"
      >
        <span className="w-8">{operator}</span>
        <span className="text-grey-200"> {phoneNumber}</span>
      </a>
    </div>
  );
}


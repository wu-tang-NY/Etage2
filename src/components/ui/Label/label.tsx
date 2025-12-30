import React from 'react';

interface LabelProps {
  label?: string;
  forAttr?: string;
}

export default function Label({ label = '', forAttr = '' }: LabelProps) {
  if (!label) return null;

  return (
    <label className="font-bold text-[13px] leading-[2] cursor-pointer" htmlFor={forAttr}>
      {label}
    </label>
  );
}


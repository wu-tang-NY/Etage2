'use client';

import React from 'react';
import Label from '../Label/label';

interface SelectProps {
  options: string[];
  value?: string | null;
  modelValue?: string | null;
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export default function Select({
  options,
  value,
  modelValue,
  label,
  placeholder,
  onChange,
}: SelectProps) {
  const selectValue = modelValue !== undefined ? modelValue : value;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="w-full inline-block mb-5">
      {label && <Label label={label} />}

      <div className="group relative overflow-hidden w-full">
        <select
          className="border-0 border-b bg-transparent w-full text-sm leading-normal py-2 px-0 outline-none active:outline-none hover:outline-none focus:border-primary cursor-text transition-all duration-300 ease-in-out dark:border-gray-700 dark:placeholder:text-gray-400"
          value={selectValue || ''}
          onChange={handleChange}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}


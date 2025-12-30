'use client';

import React from 'react';
import Label from '../Label/label';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  requiredField?: boolean;
  value?: string | null;
  modelValue?: string | null;
  id?: string;
  onChange?: (value: string) => void;
  rows?: number;
}

export default function Textarea({
  label,
  placeholder,
  requiredField,
  value,
  modelValue,
  id,
  onChange,
  rows = 4,
}: TextareaProps) {
  const generatedId = `textarea-${Math.random().toString(36).slice(2, 11)}`;
  const inputId = id || generatedId;
  const inputValue = modelValue !== undefined ? modelValue : value;

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className="w-full inline-block mb-5">
      <Label label={label} forAttr={inputId} />

      <div className="group relative overflow-hidden w-full">
        <textarea
          id={inputId}
          className="border-0 border-b bg-transparent w-full text-sm leading-normal py-2 px-0 outline-none active:outline-none hover:outline-none focus:border-primary cursor-text transition-all duration-300 ease-in-out dark:border-gray-700 dark:placeholder:text-gray-400 resize-none"
          value={inputValue || ''}
          placeholder={placeholder}
          onChange={handleInput}
          rows={rows}
        />
      </div>
    </div>
  );
}


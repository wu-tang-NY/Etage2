'use client';

import React, { useState, useEffect, useRef } from 'react';
import Label from '../Label/label';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  requiredField?: boolean;
  value?: string | null;
  modelValue?: string | null;
  mask?: string;
  isPhoneInput?: boolean;
  id?: string;
  onChange?: (value: string) => void;
}

export default function Input({
  label,
  type = 'text',
  placeholder,
  requiredField,
  value,
  modelValue,
  mask = '',
  isPhoneInput = false,
  id,
  onChange,
}: InputProps) {
  const [rawValue, setRawValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = `input-${Math.random().toString(36).slice(2, 11)}`;
  const inputId = id || generatedId;

  const inputValue = modelValue !== undefined ? modelValue : value;
  const shouldRestrictToNumbers = isPhoneInput || (mask && mask.includes('#'));
  const hasMask = mask && mask.length > 0;

  useEffect(() => {
    if (hasMask && shouldRestrictToNumbers) {
      setRawValue((inputValue || '').toString().replace(/\D/g, ''));
    } else {
      setRawValue(inputValue || '');
    }
  }, [inputValue, hasMask, shouldRestrictToNumbers]);

  const applyMask = (val: string): string => {
    if (!hasMask || !val) return val;

    const numbers = val.toString().replace(/\D/g, '');
    let formatted = '';
    let numberIndex = 0;

    for (let i = 0; i < mask.length && numberIndex < numbers.length; i++) {
      if (mask[i] === '#') {
        formatted += numbers[numberIndex];
        numberIndex++;
      } else {
        formatted += mask[i];
      }
    }

    return formatted;
  };

  const getUnmaskedValue = (val: string): string => {
    if (!hasMask || !shouldRestrictToNumbers) {
      return val;
    }
    return val.toString().replace(/\D/g, '');
  };

  const displayValue = hasMask && shouldRestrictToNumbers
    ? applyMask(rawValue || (inputValue as string) || '')
    : (inputValue as string) || '';

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (shouldRestrictToNumbers) {
      const allowedKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
      ];

      if (e.ctrlKey || e.metaKey) {
        return;
      }

      if (allowedKeys.includes(e.key)) {
        return;
      }

      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    let value = input.value;
    const cursorPos = input.selectionStart || 0;

    if (shouldRestrictToNumbers) {
      const filteredValue = getUnmaskedValue(value);
      setRawValue(filteredValue);

      const formattedValue = hasMask ? applyMask(filteredValue) : filteredValue;

      if (input.value !== formattedValue) {
        input.value = formattedValue;
      }

      // Calculate new cursor position
      let digitsBeforeCursor = 0;
      for (let i = 0; i < cursorPos && i < value.length; i++) {
        if (/\d/.test(value[i])) {
          digitsBeforeCursor++;
        }
      }

      let newCursorPos = 0;
      let digitsCounted = 0;
      for (let i = 0; i < formattedValue.length; i++) {
        if (/\d/.test(formattedValue[i])) {
          digitsCounted++;
          if (digitsCounted <= digitsBeforeCursor) {
            newCursorPos = i + 1;
          } else {
            break;
          }
        } else if (digitsCounted < digitsBeforeCursor) {
          newCursorPos = i + 1;
        }
      }

      setTimeout(() => {
        input.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);

      onChange?.(filteredValue);
    } else {
      onChange?.(value);
    }
  };

  return (
    <div className="w-full inline-block mb-5">
      <Label label={label} forAttr={inputId} />

      <div className="group relative overflow-hidden w-full">
        <input
          id={inputId}
          ref={inputRef}
          className="border-0 border-b bg-transparent w-full text-sm leading-normal py-2 px-0 outline-none active:outline-none hover:outline-none focus:border-primary cursor-text transition-all duration-300 ease-in-out dark:border-gray-700 dark:placeholder:text-gray-400"
          type={type}
          value={displayValue}
          placeholder={placeholder}
          onChange={handleInput}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}


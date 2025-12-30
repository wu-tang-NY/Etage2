import React from 'react';

interface NavProps {
  isOpen?: boolean;
  children?: React.ReactNode;
}

export default function Nav({ isOpen = false, children }: NavProps) {
  return (
    <nav className="relative">
      <ul className="flex flex-col justify-start gap-1 lg:gap-0 lg:flex-row">
        {children}
      </ul>
      <div className="hidden lg:block absolute top-full left-0 w-full h-[2px] bg-gradient-to-r from-gray-100 dark:from-gray-800 to-transparent" />
    </nav>
  );
}


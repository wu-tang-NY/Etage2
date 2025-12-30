import React from 'react';

interface AppButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  ariaLabel?: string;
  title?: string;
  icon?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  id?: string;
}

export default function AppButton({
  type = 'button',
  className = '',
  ariaLabel = '',
  title = '',
  icon = false,
  variant = 'default',
  rounded = false,
  size = 'md',
  disabled = false,
  active = false,
  onClick,
  children,
  id,
}: AppButtonProps) {
  const baseClasses = 'flex-0 shrink-0 font-bold !cursor-pointer transition-all duration-200 flex items-center justify-center box-border';
  
  const sizeClasses = {
    sm: 'h-6 text-xs px-4',
    md: 'h-8 text-xs px-3',
    lg: 'h-10 px-6 text-[15px]',
  };

  const variantClasses = {
    default: 'bg-transparent border border-solid border-gray-700 dark:bg-gray-800 text-gray-700 dark:fill-white dark:text-white dark:border-gray-700',
    primary: 'bg-primary text-white border-none',
    secondary: 'bg-gray-200 text-gray-700 dark:bg-secondary dark:text-gray-100 border-none',
  };

  const classes = `
    ${baseClasses}
    ${icon ? '!px-0 !w-8' : ''}
    ${sizeClasses[size]}
    ${disabled 
      ? '!bg-gray-200 !text-gray-400 dark:!bg-gray-800 dark:!text-gray-400 cursor-not-allowed'
      : 'hover:brightness-110 focus:brightness-110 active:brightness-50'
    }
    ${variantClasses[variant]}
    ${active ? '!bg-black !text-white dark:!bg-white dark:!text-black' : ''}
    ${rounded ? 'rounded-full' : 'rounded-sm'}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      id={id}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
      title={title}
      onClick={(e) => onClick?.(e)}
    >
      {children}
    </button>
  );
}


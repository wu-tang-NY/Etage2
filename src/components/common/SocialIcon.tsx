import React from 'react';
import SvgIcon from './SvgIcon';

interface SocialIconProps {
  href: string;
  target?: string;
  rel?: string;
  iconName: string;
  original?: boolean;
  ariaLabel: string;
  size?: string;
  className?: string;
}

export default function SocialIcon({
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  iconName,
  original = true,
  ariaLabel,
  size = 'size-5',
  className = '',
}: SocialIconProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className={`flex items-center justify-center ${size} ${className}`}
    >
      <SvgIcon name={iconName} original={original} className="size-full align-top" />
    </a>
  );
}


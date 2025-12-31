'use client';

import { useMemo } from 'react';
import iconRegistry from '@/utils/icon-registry';

interface SvgIconProps {
  name: string;
  original?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function SvgIcon({ name, original = false, className = '', style }: SvgIconProps) {
  const icon = useMemo(() => {
    return (iconRegistry.icons as Record<string, any>)[name];
  }, [name]);

  if (!icon) {
    if (process.env.NODE_ENV === 'development') {
      const availableIcons = Object.keys(iconRegistry.icons);
      console.warn(`Icon "${name}" not found in registry. Available icons (${availableIcons.length}):`, availableIcons.slice(0, 10).join(', '), '...');
    } else {
      console.warn(`Icon "${name}" not found in registry`);
    }
    return null;
  }

  const { width, height, viewBox, data } = icon;

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: data }}
      preserveAspectRatio={original ? 'none' : 'xMidYMid meet'}
      suppressHydrationWarning
    />
  );
}


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
    console.warn(`Icon "${name}" not found in registry`);
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


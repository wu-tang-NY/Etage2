'use client';

import { useTranslations } from 'next-intl';
import SvgIcon from '../SvgIcon';

interface ScheduleProps {
  withoutLabel?: boolean;
}

export default function Schedule({ withoutLabel = false }: ScheduleProps) {
  const t = useTranslations();

  return (
    <div className="app-schedule flex text-sm lg:text-xs">
      {!withoutLabel && (
        <div className="text-[var(--colors-accent)] w-[9px] h-[16px] mt-[3px] mr-2">
          <SvgIcon name="label_schedule" original />
        </div>
      )}

      <div>
        {!withoutLabel && (
          <div className="font-black mb-1">
            {t('schedule.label')}
          </div>
        )}

        <div className="font-semibold">
          <div>{t('schedule.time', { from: '5:00', to: '23:00' })}</div>
          <div>{t('schedule.noDaysOff')}</div>
        </div>
      </div>
    </div>
  );
}


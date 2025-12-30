'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// Lazy load CallbackModal
const CallbackModal = dynamic(() => import('./callback-modal'), { ssr: false });

export default function Callback() {
  const t = useTranslations();
  const [modal, setModal] = useState(false);

  const openCallModal = () => {
    setModal(!modal);
  };

  return (
    <div className="mx-[10px]">
      <button
        id="callback-btn"
        className="border-b border-dashed border-[var(--colors-accent)] inline-block text-xs font-semibold tracking-[0.2px] cursor-pointer"
        onClick={openCallModal}
        type="button"
      >
        {t('callback.button')}
      </button>

      <CallbackModal modelValue={modal} onUpdateModelValue={setModal} />
    </div>
  );
}


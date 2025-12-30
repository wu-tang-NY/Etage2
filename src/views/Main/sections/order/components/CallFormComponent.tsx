'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input/input';
import Button from '@/components/ui/Button/button';
import { eventbus } from '@/lib/eventbus';

interface CallFormComponentProps {
  mobile?: boolean;
  tablet?: boolean;
  onCloseModal?: () => void;
}

export default function CallFormComponent({
  mobile,
  tablet,
  onCloseModal,
}: CallFormComponentProps) {
  const t = useTranslations();
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);

  const clearForm = () => {
    setName(null);
    setPhone(null);
  };

  const handleSendEmail = async () => {
    if (name && phone) {
      try {
        const response = await fetch('/api/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
          }),
        });

        if (response.ok) {
          clearForm();
          onCloseModal?.();
          eventbus.emit('openWelcomeModal');
        } else {
          console.error('Failed to send callback request');
        }
      } catch (error) {
        console.error('Failed to send callback request:', error);
      }
    }
  };

  return (
    <div className="call-form">
      <div className="flex flex-wrap gap-4">
        <div className="w-full lg:w-1/4">
          <Input
            id="call-name"
            label={t('callForm.nameLabel')}
            type="text"
            placeholder={t('callForm.namePlaceholder')}
            value={name}
            onChange={setName}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Input
            id="call-phone"
            label={t('callForm.phoneLabel')}
            type="text"
            placeholder={t('callForm.phonePlaceholder')}
            isPhoneInput={true}
            mask="###-###-##-##"
            value={phone}
            onChange={setPhone}
          />
        </div>
      </div>

      <Button
        id="callback-form-btn"
        variant="primary"
        size="lg"
        className="w-full lg:w-auto"
        disabled={!phone || !name}
        onClick={handleSendEmail}
      >
        {t('common.submit')}
      </Button>
    </div>
  );
}


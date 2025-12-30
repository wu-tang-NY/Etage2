'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Modal from '@/components/ui/Modal/modal';
import Input from '@/components/ui/Input/input';
import Button from '@/components/ui/Button/button';
import { eventbus } from '@/lib/eventbus';

interface CallbackModalProps {
  modelValue?: boolean;
  open?: boolean;
  onUpdateModelValue?: (value: boolean) => void;
}

export default function CallbackModal({
  modelValue,
  open,
  onUpdateModelValue,
}: CallbackModalProps) {
  const t = useTranslations();
  const isOpen = open !== undefined ? open : modelValue ?? false;
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    // Initialize email service if needed
    // Mailgun config should be set via environment variables
    // This will be handled in the API route instead
  }, []);

  useEffect(() => {
    if (isOpen) {
      clearForm();
    }
  }, [isOpen]);

  const clearForm = () => {
    setName(null);
    setPhone(null);
  };

  const handleSendEmail = async () => {
    if (phone && name) {
      try {
        // Call API route instead of client-side email service
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
          onUpdateModelValue?.(false);
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
    <Modal
      show={isOpen}
      title={t('callback.title')}
      onUpdateShow={onUpdateModelValue}
    >
      <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }}>
        <Input
          id="callback-name"
          label={t('callback.nameLabel')}
          type="text"
          placeholder={t('callback.namePlaceholder')}
          value={name}
          onChange={(value) => setName(value)}
        />

        <Input
          id="callback-phone"
          label={t('callback.phoneLabel')}
          type="text"
          placeholder={t('callback.phonePlaceholder')}
          isPhoneInput={true}
          mask="###-###-##-##"
          value={phone}
          onChange={(value) => setPhone(value)}
        />

        <Button
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!name || !phone}
          onClick={handleSendEmail}
        >
          {t('common.submit')}
        </Button>
      </form>
    </Modal>
  );
}

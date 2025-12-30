'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Modal from '@/components/ui/Modal/modal';
import Input from '@/components/ui/Input/input';
import Textarea from '@/components/ui/Input/textarea';
import Button from '@/components/ui/Button/button';

interface AppFeedbackModalProps {
  modelValue?: boolean;
  open?: boolean;
  onUpdateModelValue?: (value: boolean) => void;
}

export default function AppFeedbackModal({
  modelValue,
  open,
  onUpdateModelValue,
}: AppFeedbackModalProps) {
  const t = useTranslations();
  const isOpen = open !== undefined ? open : modelValue ?? false;
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [from, setFrom] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [unsend, setUnsend] = useState(true);

  useEffect(() => {
    if (isOpen) {
      clearForm();
    }
  }, [isOpen]);

  const clearForm = () => {
    setName(null);
    setPhone(null);
    setFrom(null);
    setComment(null);
    setUnsend(true);
  };

  const handleSendEmail = async () => {
    if (phone && name && from && comment) {
      try {
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            from,
            comment,
          }),
        });

        if (response.ok) {
          clearForm();
          setUnsend(false);
        } else {
          console.error('Failed to send feedback');
        }
      } catch (error) {
        console.error('Failed to send feedback:', error);
      }
    }
  };

  return (
    <Modal
      show={isOpen}
      title={t('feedback.modalTitle')}
      onUpdateShow={onUpdateModelValue}
    >
      {unsend ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }}>
          <Input
            id="feedback-name"
            label={t('feedback.nameLabel')}
            type="text"
            placeholder={t('feedback.namePlaceholder')}
            value={name}
            onChange={setName}
          />

          <Input
            id="feedback-from"
            label={t('feedback.fromLabel')}
            type="text"
            placeholder={t('feedback.fromPlaceholder')}
            value={from}
            onChange={setFrom}
          />

          <Input
            id="feedback-phone"
            label={t('feedback.phoneLabel')}
            type="text"
            placeholder={t('feedback.phonePlaceholder')}
            isPhoneInput={true}
            mask="###-###-##-##"
            value={phone}
            onChange={setPhone}
          />

          <Textarea
            id="feedback-comment"
            label={t('feedback.commentLabel')}
            placeholder={t('feedback.commentPlaceholder')}
            value={comment}
            onChange={setComment}
            rows={4}
          />

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!phone || !name || !from || !comment}
            onClick={handleSendEmail}
          >
            {t('common.submit')}
          </Button>
        </form>
      ) : (
        <div>
          <strong>{t('feedback.thanks')}</strong>
          <br />
          {t('feedback.thanksMessage')}
        </div>
      )}
    </Modal>
  );
}


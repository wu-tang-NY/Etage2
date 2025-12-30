'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input/input';
import Select from '@/components/ui/Select/select';
import Button from '@/components/ui/Button/button';
import { eventbus } from '@/lib/eventbus';

interface OrderFormComponentProps {
  mobile?: boolean;
  tablet?: boolean;
  onCloseModal?: () => void;
}

export default function OrderFormComponent({
  mobile,
  tablet,
  onCloseModal,
}: OrderFormComponentProps) {
  const t = useTranslations();
  const [name, setName] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [workers, setWorkers] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const transportOptions = [
    t('orderForm.transportOptions.flat'),
    t('orderForm.transportOptions.office'),
    t('orderForm.transportOptions.stuff'),
  ];

  const workersOptions = [
    t('orderForm.workersOptions.one'),
    t('orderForm.workersOptions.two'),
    t('orderForm.workersOptions.three'),
    t('orderForm.workersOptions.more'),
  ];

  const clearForm = () => {
    setName(null);
    setPhone(null);
    setFrom('');
    setTo('');
    setWorkers(null);
    setType(null);
    setDate(null);
    setComment('');
  };

  const handleSendEmail = async () => {
    if (name && phone) {
      try {
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            from,
            to,
            workers,
            type,
            date,
            comment,
          }),
        });

        if (response.ok) {
          clearForm();
          onCloseModal?.();
          eventbus.emit('openWelcomeModal');
        } else {
          console.error('Failed to send order');
        }
      } catch (error) {
        console.error('Failed to send order:', error);
      }
    }
  };

  return (
    <div className="order-form">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/4">
          <Input
            id="order-name"
            value={name}
            onChange={setName}
            label={t('orderForm.nameLabel')}
            type="text"
            placeholder={t('orderForm.namePlaceholder')}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Input
            id="order-phone"
            value={phone}
            onChange={setPhone}
            label={t('orderForm.phoneLabel')}
            type="text"
            placeholder={t('orderForm.phonePlaceholder')}
            isPhoneInput={true}
            mask="###-###-##-##"
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Input
            id="order-from"
            value={from}
            onChange={setFrom}
            label={t('orderForm.fromLabel')}
            type="text"
            placeholder={t('orderForm.fromPlaceholder')}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Input
            id="order-date"
            value={date}
            onChange={setDate}
            label={t('orderForm.dateLabel')}
            type="text"
            placeholder={t('orderForm.datePlaceholder')}
            mask="##/##/#### ##:##"
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Select
            value={type}
            onChange={setType}
            label={t('orderForm.typeLabel')}
            placeholder={t('orderForm.typePlaceholder')}
            options={transportOptions}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Select
            value={workers}
            onChange={setWorkers}
            label={t('orderForm.workersLabel')}
            placeholder={t('orderForm.workersPlaceholder')}
            options={workersOptions}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Input
            id="order-to"
            value={to}
            onChange={setTo}
            label={t('orderForm.toLabel')}
            type="text"
            placeholder={t('orderForm.toPlaceholder')}
          />
        </div>

        <div className="w-full lg:w-1/4">
          <Input
            id="order-comment"
            value={comment}
            onChange={setComment}
            label={t('orderForm.commentLabel')}
            type="text"
            placeholder={t('orderForm.commentPlaceholder')}
          />
        </div>

        <div className="w-full">
          <Button
            id="order-form-btn"
            variant="primary"
            size="lg"
            className="w-full lg:w-auto"
            disabled={!phone || !name}
            onClick={handleSendEmail}
          >
            {t('common.submit')}
          </Button>
        </div>
      </div>
    </div>
  );
}


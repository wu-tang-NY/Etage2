'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import Button from '../Button/button';

interface ModalProps {
  show: boolean;
  title?: string;
  subtitle?: string;
  small?: boolean;
  large?: boolean;
  centered?: boolean;
  onUpdateShow?: (show: boolean) => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({
  show,
  title,
  subtitle,
  small = false,
  large = false,
  centered = true,
  onUpdateShow,
  children,
  footer,
}: ModalProps) {
  const t = useTranslations();

  useEffect(() => {
    const className = 'modal-open';
    if (show) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }

    return () => {
      if (show) {
        document.body.classList.remove(className);
      }
    };
  }, [show]);

  const handleCloseModal = () => {
    onUpdateShow?.(false);
  };

  if (!show) return null;

  const modalContent = (
    <div
      className="fixed top-0 left-0 z-[1000] w-full h-full overflow-x-hidden overflow-y-auto outline-0 bg-black/50 flex items-center justify-center max-sm:overflow-hidden max-sm:h-screen"
      tabIndex={-1}
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseModal();
        }
      }}
    >
      <div
        className={`relative w-auto m-2 pointer-events-none flex items-center min-h-[calc(100%-1rem)] max-sm:bg-white max-sm:m-0 max-sm:h-full max-sm:w-full max-sm:items-start ${
          small ? 'max-w-[300px]' : ''
        } ${large ? 'max-w-[800px]' : ''} ${centered ? 'flex items-center min-h-[calc(100%-1rem)]' : ''}`}
        role="document"
      >
        <div className="modal-content relative flex flex-col w-[400px] pointer-events-auto bg-white bg-clip-padding border border-black/20 rounded outline-0 max-sm:border-0 max-sm:w-full max-sm:h-screen max-sm:overflow-auto dark:bg-dark">
          <div className="flex justify-between p-4">
            {title && (
              <div>
                <h5 className="text-xl font-black">{title}</h5>
                {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
              </div>
            )}

            <Button
              icon={true}
              className="ml-auto"
              ariaLabel={t('common.close')}
              title={t('common.close')}
              onClick={handleCloseModal}
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          <div className="relative flex-1 p-4">{children}</div>

          {footer && (
            <div className="flex items-center justify-end p-4 border-t border-black/10">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Portal to body
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}


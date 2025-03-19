import React, { useState } from 'react';
import { IoPaperPlane } from 'react-icons/io5';
import { SendType } from '../types';

export const SendButton = ({
  buttonText,
  isDisabled,
  contractAddress,
  handleSend,
  handleSendAA,
}: SendType) => {
  const [recipient, setRecipient] = useState<string | undefined>('');
  const [amount, setAmount] = useState<string | undefined>('1000');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    status: 'success' | 'error';
    description?: string;
  } | null>(null);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const onClickSend = async () => {
    setLoading(true);
    try {
      const result = (await handleSend?.(amount, recipient)) as unknown as string;

      if (result?.length > 0) {
        setToastMessage({
          title: 'Funds were sent',
          status: 'success',
        });
        setTimeout(() => setToastMessage(null), 5000);
      } else {
        throw Error('Error sending');
      }
    } catch (error: any) {
      setToastMessage({
        title: 'Error sending',
        description: error.toString(),
        status: 'error',
      });
      setTimeout(() => setToastMessage(null), 5000);
    }
    setLoading(false);
    onClose();
  };

  const onClickSendAA = async () => {
    setLoading(true);
    try {
      const result = (await handleSendAA?.(amount, recipient)) as unknown as string;

      if (result && result === 'success') {
        setToastMessage({
          title: 'Funds were sent',
          status: 'success',
        });
        setTimeout(() => setToastMessage(null), 5000);
      } else {
        throw Error('Error sending');
      }
    } catch (error: any) {
      setToastMessage({
        title: 'Error sending',
        description: error.toString(),
        status: 'error',
      });
      setTimeout(() => setToastMessage(null), 5000);
    }
    setLoading(false);
    onClose();
  };

  return (
    <>
      <button
        style={{
          width: '100%',
          minWidth: 'fit-content',
          height: '48px',
          borderRadius: '8px',
          backgroundColor: '#4bc76a',
          backgroundImage: 'linear-gradient(109.6deg, #4bc76a 11.2%, #9fcc51 83.1%)',
          color: 'white',
          border: 'none',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          opacity: isDisabled ? 0.6 : 1,
          transition: 'all .5s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: '500',
          marginTop: '20px',
        }}
        disabled={isDisabled}
        onClick={onOpen}
      >
        <IoPaperPlane style={{ marginRight: '8px' }} />
        {buttonText ? buttonText : 'Send tokens'}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '400px',
              padding: '20px',
              position: 'relative',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '16px' }}>
              Send Tokens
            </div>
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
              onClick={onClose}
              disabled={isLoading}
            >
              ×
            </button>

            <div
              style={{
                marginTop: '12px',
                marginBottom: '12px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Address:
            </div>
            <input
              placeholder="Address"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
              }}
            />

            <div
              style={{
                marginTop: '12px',
                marginBottom: '12px',
                fontSize: '14px',
                fontWeight: '600',
              }}
            >
              Tokens(stake):
            </div>
            <input
              type="number"
              min="1"
              defaultValue="1000"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: '#805AD5',
                  color: 'white',
                  border: 'none',
                  cursor:
                    isLoading || !contractAddress || contractAddress.length === 0
                      ? 'not-allowed'
                      : 'pointer',
                  opacity: isLoading || !contractAddress || contractAddress.length === 0 ? 0.6 : 1,
                }}
                disabled={isLoading || !contractAddress || contractAddress.length === 0}
                onClick={onClickSendAA}
              >
                {isLoading ? 'Loading...' : 'Send from Smart Account'}
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#805AD5',
                  border: '1px solid #805AD5',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                }}
                disabled={isLoading}
                onClick={onClickSend}
              >
                {isLoading ? 'Loading...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: toastMessage.status === 'success' ? '#48BB78' : '#E53E3E',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '4px',
            zIndex: 1001,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{toastMessage.title}</div>
          {toastMessage.description && (
            <div style={{ marginTop: '4px' }}>{toastMessage.description}</div>
          )}
        </div>
      )}
    </>
  );
};

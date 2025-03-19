import React, { useState } from 'react';
import { IoBuildSharp } from 'react-icons/io5';
import { RecoverAAType } from '../types';

export const RecoveryAAButton = ({
  buttonText,
  isDisabled,
  voted,
  handleRecover,
  handleRevoke,
}: RecoverAAType) => {
  const [newkey, setNewkey] = useState<string | undefined>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    status: 'success' | 'error';
    description?: string;
  } | null>(null);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const onRecoverClick = async () => {
    setLoading(true);
    try {
      const result = (await handleRecover?.(newkey)) as unknown as string;

      if (result?.length > 0) {
        setToastMessage({
          title: 'Recovery is successful',
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

  const onRevokeClick = async () => {
    setLoading(true);
    try {
      const result = (await handleRevoke?.()) as unknown as string;

      if (result?.length > 0) {
        setToastMessage({
          title: 'Revoke is successful',
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
          backgroundColor: '#4b55c7',
          backgroundImage: 'linear-gradient(109.6deg, #4b55c7 11.2%, #5176cc 83.1%)',
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
        }}
        disabled={isDisabled}
        onClick={onOpen}
      >
        <IoBuildSharp style={{ marginRight: '8px' }} />
        {buttonText ? buttonText : 'Recovery'}
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
              Recovery
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

            <input
              disabled={voted}
              placeholder="New Pubkey"
              value={newkey}
              onChange={e => setNewkey(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #E2E8F0',
                borderRadius: '4px',
                opacity: voted ? 0.6 : 1,
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
                  cursor: isLoading || voted ? 'not-allowed' : 'pointer',
                  opacity: isLoading || voted ? 0.6 : 1,
                }}
                disabled={isLoading || voted}
                onClick={onRecoverClick}
              >
                {isLoading ? 'Loading...' : 'Recover'}
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  color: '#805AD5',
                  border: '1px solid #805AD5',
                  cursor: isLoading || !voted ? 'not-allowed' : 'pointer',
                  opacity: isLoading || !voted ? 0.6 : 1,
                }}
                disabled={isLoading || !voted}
                onClick={onRevokeClick}
              >
                {isLoading ? 'Loading...' : 'Revoke'}
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

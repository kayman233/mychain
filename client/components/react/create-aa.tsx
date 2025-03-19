import React, { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { CreateAAType } from '../types';

export const CreateAAButton = ({ buttonText, isDisabled, handleCreate }: CreateAAType) => {
  const [newFunds, setNewFunds] = useState<string>('100000');
  const [newThreshold, setNewThreshold] = useState<string>('1');
  const [guardiansCount, setGuardiansCount] = useState<string>('1');
  const [newGuardians, setNewGuardians] = useState<string[]>(['']);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    status: 'success' | 'error';
    description?: string;
  } | null>(null);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const onClick = async () => {
    setLoading(true);
    try {
      const filtered = newGuardians
        .filter(guardian => guardian.length > 0)
        .filter((item, i, ar) => ar.indexOf(item) === i);

      if (Number(newThreshold) > filtered.length) {
        throw Error('Error sending');
      }

      const result = (await handleCreate?.({
        funds: newFunds,
        guardians: filtered,
        threshold: Number(newThreshold),
      })) as unknown as string;

      if (result?.length > 0) {
        setToastMessage({
          title: 'Account created',
          status: 'success',
        });
        setTimeout(() => setToastMessage(null), 5000);
      } else {
        throw Error('Error sending');
      }
    } catch (error: any) {
      setToastMessage({
        title: 'Fail creating',
        description: error.toString(),
        status: 'error',
      });
      setTimeout(() => setToastMessage(null), 5000);
    }
    setLoading(false);
    onClose();
  };

  const handleThreshold = (value: string) => {
    setNewThreshold(value);
    setGuardiansCount(value);
    setNewGuardians(Array(Number(value)).fill(''));
  };

  const handleGuardianChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedGuardians = [...newGuardians];
    updatedGuardians[index] = e.target.value;
    setNewGuardians(updatedGuardians);
  };

  const addRow = () => {
    setGuardiansCount(String(Number(guardiansCount) + 1));
    setNewGuardians([...newGuardians, '']);
  };

  return (
    <>
      <button
        style={{
          width: '100%',
          minWidth: 'fit-content',
          height: '48px',
          borderRadius: '8px',
          backgroundColor: '#9D4BC7',
          backgroundImage:
            'linear-gradient(109.6deg, rgba(157,75,199,1) 11.2%, rgba(119,81,204,1) 83.1%)',
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
        <IoAdd style={{ marginRight: '8px' }} />
        {buttonText ? buttonText : 'Create Smart Account'}
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
              Create Smart Account
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
              Threshold:
            </div>
            <input
              type="number"
              min="1"
              value={newThreshold}
              onChange={e => handleThreshold(e.target.value)}
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
              Funds(stake):
            </div>
            <input
              type="number"
              min="1"
              value={newFunds}
              onChange={e => setNewFunds(e.target.value)}
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
              Guardians:
            </div>
            <div>
              {newGuardians?.map((guardian, index) => (
                <input
                  key={index}
                  value={guardian}
                  onChange={e => handleGuardianChange(index, e)}
                  placeholder={`Guardian ${index + 1}`}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '4px',
                    marginBottom: '12px',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
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
                onClick={addRow}
              >
                Add Guardian
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: '#805AD5',
                  color: 'white',
                  border: 'none',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                }}
                disabled={isLoading}
                onClick={onClick}
              >
                {isLoading ? 'Loading...' : 'Create'}
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

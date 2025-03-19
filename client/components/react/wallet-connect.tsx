import React, { MouseEventHandler, ReactNode } from 'react';
import { IoWallet } from 'react-icons/io5';
import { ConnectWalletType } from '../types';
import { FiAlertTriangle } from 'react-icons/fi';
import { WalletStatus } from '@cosmos-kit/core';

export const ConnectWalletButton = ({
  buttonText,
  isLoading,
  isDisabled,
  icon,
  onClickConnectBtn,
}: ConnectWalletType) => (
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
    onClick={onClickConnectBtn}
  >
    {isLoading ? (
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: '2px solid white',
          borderTopColor: 'transparent',
          animation: 'spin 1s linear infinite',
          marginRight: '8px',
        }}
      />
    ) : icon ? (
      React.createElement(icon)
    ) : (
      <IoWallet style={{ marginRight: '8px' }} />
    )}
    {buttonText ? buttonText : 'Connect Wallet'}
  </button>
);

export const Disconnected = ({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => <ConnectWalletButton buttonText={buttonText} onClickConnectBtn={onClick} />;

export const Connected = ({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => <ConnectWalletButton buttonText={buttonText} onClickConnectBtn={onClick} />;

export const Connecting = () => <ConnectWalletButton isLoading={true} />;

export const Rejected = ({
  buttonText,
  wordOfWarning,
  onClick,
}: {
  buttonText: string;
  wordOfWarning?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <ConnectWalletButton buttonText={buttonText} isDisabled={false} onClickConnectBtn={onClick} />
    {wordOfWarning && (
      <div
        style={{
          display: 'flex',
          borderRadius: '8px',
          backgroundColor: '#ED8936',
          color: '#1A202C',
          padding: '16px',
          gap: '4px',
        }}
      >
        <FiAlertTriangle style={{ marginTop: '4px' }} />
        <div>
          <span style={{ fontWeight: '600' }}>Warning:&ensp;</span>
          {wordOfWarning}
        </div>
      </div>
    )}
  </div>
);

export const Error = ({
  buttonText,
  wordOfWarning,
  onClick,
}: {
  buttonText: string;
  wordOfWarning?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <ConnectWalletButton buttonText={buttonText} isDisabled={false} onClickConnectBtn={onClick} />
    {wordOfWarning && (
      <div
        style={{
          display: 'flex',
          borderRadius: '8px',
          backgroundColor: '#ED8936',
          color: '#1A202C',
          padding: '16px',
          gap: '4px',
        }}
      >
        <FiAlertTriangle style={{ marginTop: '4px' }} />
        <div>
          <span style={{ fontWeight: '600' }}>Warning:&ensp;</span>
          {wordOfWarning}
        </div>
      </div>
    )}
  </div>
);

export const NotExist = ({
  buttonText,
  onClick,
}: {
  buttonText: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => (
  <ConnectWalletButton buttonText={buttonText} isDisabled={false} onClickConnectBtn={onClick} />
);

export const WalletConnectComponent = ({
  walletStatus,
  disconnect,
  connecting,
  connected,
  rejected,
  error,
  notExist,
}: {
  walletStatus: WalletStatus;
  disconnect: ReactNode;
  connecting: ReactNode;
  connected: ReactNode;
  rejected: ReactNode;
  error: ReactNode;
  notExist: ReactNode;
}) => {
  switch (walletStatus) {
    case WalletStatus.Disconnected:
      return <>{disconnect}</>;
    case WalletStatus.Connecting:
      return <>{connecting}</>;
    case WalletStatus.Connected:
      return <>{connected}</>;
    case WalletStatus.Rejected:
      return <>{rejected}</>;
    case WalletStatus.Error:
      return <>{error}</>;
    case WalletStatus.NotExist:
      return <>{notExist}</>;
    default:
      return <>{disconnect}</>;
  }
};

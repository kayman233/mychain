import React, { ReactNode } from 'react';
import { WalletStatus } from '@cosmos-kit/core';

export const WarnBlock = ({
  wordOfWarning,
  icon,
}: {
  wordOfWarning?: string;
  icon?: ReactNode;
}) => (
  <div
    style={{
      borderRadius: '8px',
      padding: '16px',
      paddingRight: '8px',
      backgroundColor: '#ED8936',
      color: '#1A202C',
    }}
  >
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        overflowY: 'scroll',
        maxHeight: '160px',
      }}
    >
      <div style={{ position: 'sticky', top: 0 }}>{icon}</div>
      <div>{wordOfWarning}</div>
    </div>
  </div>
);

export const RejectedWarn = ({
  wordOfWarning,
  icon,
}: {
  wordOfWarning?: string;
  icon?: ReactNode;
}) => <WarnBlock wordOfWarning={wordOfWarning} icon={icon} />;

export const ConnectStatusWarn = ({
  walletStatus,
  rejected,
  error,
}: {
  walletStatus: WalletStatus;
  rejected: ReactNode;
  error: ReactNode;
}) => {
  switch (walletStatus) {
    case WalletStatus.Rejected:
      return <>{rejected}</>;
    case WalletStatus.Error:
      return <>{error}</>;
    default:
      return <></>;
  }
};

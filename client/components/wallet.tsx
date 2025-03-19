import { useChain } from '@cosmos-kit/react';
import { WalletStatus } from '@cosmos-kit/core';
import { MouseEventHandler, useEffect } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import {
  Astronaut,
  Error,
  Connected,
  ConnectedShowAddress,
  ConnectedUserInfo,
  Connecting,
  ConnectStatusWarn,
  CopyAddressBtn,
  Disconnected,
  NotExist,
  Rejected,
  RejectedWarn,
  WalletConnectComponent,
  ConnectWalletButton,
} from '../components';
import { defaultChainName } from '../config';
import { ChainName } from '@cosmos-kit/core';
import { ConnectedUserBalanceInfo } from './react/user-balance';
import { CreateAAButton } from './react/create-aa';
import { CreateAccountType } from '../hooks/types';
import { SendButton } from './react/send';

export const WalletSection = ({
  isMultiChain,
  balance,
  providedChainName,
  contractAddress,
  handleCreate,
  setChainName,
  handleSend,
  handleSendAA,
}: {
  isMultiChain: boolean;
  balance?: string;
  providedChainName?: ChainName;
  contractAddress?: string;
  handleCreate?: (params: CreateAccountType) => Promise<void>;
  setChainName?: (chainName: ChainName | undefined) => void;
  handleSend?: (amount: string | undefined, recipient: string | undefined) => Promise<void>;
  handleSendAA?: (amount: string | undefined, recipient: string | undefined) => Promise<void>;
}) => {
  const { connect, openView, status, username, address, message, wallet } = useChain(
    providedChainName || defaultChainName
  );

  // Events
  const onClickConnect: MouseEventHandler = async e => {
    e.preventDefault();
    await connect();
  };

  const onClickOpenView: MouseEventHandler = e => {
    e.preventDefault();
    openView();
  };

  // Components
  const connectWalletButton = (
    <WalletConnectComponent
      walletStatus={status}
      disconnect={<Disconnected buttonText="Connect Wallet" onClick={onClickConnect} />}
      connecting={<Connecting />}
      connected={<Connected buttonText={'My Wallet'} onClick={onClickOpenView} />}
      rejected={<Rejected buttonText="Reconnect" onClick={onClickConnect} />}
      error={<Error buttonText="Change Wallet" onClick={onClickOpenView} />}
      notExist={<NotExist buttonText="Install Wallet" onClick={onClickOpenView} />}
    />
  );

  const connectWalletWarn = (
    <ConnectStatusWarn
      walletStatus={status}
      rejected={
        <RejectedWarn
          icon={<FiAlertTriangle style={{ marginTop: '4px' }} />}
          wordOfWarning={`${wallet?.prettyName}: ${message}`}
        />
      }
      error={
        <RejectedWarn
          icon={<FiAlertTriangle style={{ marginTop: '4px' }} />}
          wordOfWarning={`${wallet?.prettyName}: ${message}`}
        />
      }
    />
  );

  useEffect(() => {
    setChainName?.(window.localStorage.getItem('selected-chain') || 'osmosis');
  }, [setChainName]);

  const userInfo = username && <ConnectedUserInfo username={username} icon={<Astronaut />} />;
  const userBalance = status === WalletStatus.Connected && balance && (
    <ConnectedUserBalanceInfo balance={balance} />
  );
  const createBtn = (
    <CreateAAButton isDisabled={status !== WalletStatus.Connected} handleCreate={handleCreate} />
  );

  const sendBtn = (
    <SendButton
      isDisabled={status !== WalletStatus.Connected}
      handleSend={handleSend}
      handleSendAA={handleSendAA}
      contractAddress={contractAddress}
    />
  );

  const addressBtn = (
    <CopyAddressBtn
      walletStatus={status}
      connected={<ConnectedShowAddress address={address} isLoading={false} />}
    />
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0' }}>
      <div style={{ width: '100%', maxWidth: '384px' }}>
        {!providedChainName && isMultiChain ? (
          <ConnectWalletButton buttonText={'Connect Wallet'} isDisabled />
        ) : (
          <div style={{ padding: '0 24px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0 0 2px #dfdfdf, 0 0 6px -2px #d3d3d3',
                gap: '16px',
                padding: '16px',
              }}
            >
              {userInfo}
              {userBalance}
              {addressBtn}
              <div style={{ width: '100%', maxWidth: '256px' }}>{connectWalletButton}</div>
              <div style={{ width: '100%', maxWidth: '256px' }}>{createBtn}</div>
              <div style={{ width: '100%', maxWidth: '256px' }}>{sendBtn}</div>
              {connectWalletWarn && <div>{connectWalletWarn}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

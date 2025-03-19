import { useChain } from '@cosmos-kit/react';

import { defaultChainName } from '../config';
import { AccountInfoType } from '../hooks/types';
import { ConnectedUserBalanceInfo } from './react/user-balance';
import { ConnectedUserInfo } from './react/user-card';
import { ConnectedShowAddress } from './react/address-card';
import { RecoveryAAButton } from './react/recovery-aa';
import { InfoAccordion } from './react/accordion';

export const AbstractAccountSection = ({
  info,
  isGuardian,
  accountBalance,
  address,
  handleRecover,
  handleRevoke,
}: {
  info?: AccountInfoType;
  accountBalance?: string;
  address?: string;
  isGuardian?: boolean;
  handleRecover?: (newPubkey: string | undefined) => Promise<void>;
  handleRevoke?: () => Promise<void>;
}) => {
  const { address: addressUser } = useChain(defaultChainName);

  if (!info || !address || address.length === 0) {
    return <></>;
  }

  const userInfo = <ConnectedUserInfo username="Abstract Smart Account" />;

  const userBalance = accountBalance && <ConnectedUserBalanceInfo balance={accountBalance} />;

  const recoveryBtn = (
    <RecoveryAAButton
      isDisabled={!isGuardian}
      handleRecover={handleRecover}
      handleRevoke={handleRevoke}
      voted={info.votes?.findIndex(vote => vote.addr === addressUser) != -1}
    />
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '64px 0' }}>
      <div style={{ width: '100%', maxWidth: '384px' }}>
        <div style={{ padding: '0 32px' }}>
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
            <ConnectedShowAddress address={address} isLoading={false} />
            <InfoAccordion info={info} />
            {recoveryBtn}
          </div>
        </div>
      </div>
    </div>
  );
};

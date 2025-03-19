import Head from 'next/head';
import { Button } from '@interchain-ui/react';
import { FaHome } from 'react-icons/fa';
import { useChain, useManager } from '@cosmos-kit/react';

import { ChainCard, WalletSection } from '../components';
import { useBalances } from '../hooks/useBalances';
import { useState } from 'react';
import { useAA } from '../hooks/useAA';
import { useCreateAA } from '../hooks/useCreateAA';
import { AbstractAccountSection } from '../components/abstr';
import { AccountInfoType } from '../hooks/types';
import { defaultChainName } from '../config';

export default function Home() {
  const { getChainLogo } = useManager();
  const { chain: chainInfo } = useChain(defaultChainName);

  const [txHash, setTxHash] = useState<string>('');

  const chain = {
    chainName: defaultChainName,
    label: chainInfo.pretty_name,
    value: defaultChainName,
    icon: getChainLogo(defaultChainName),
  };

  const { handleCreateAA, contractAddress } = useCreateAA(setTxHash);
  const { accountInfo, isGuardian, contractAddressLocal, handleRecover, handleRevoke } = useAA(
    contractAddress,
    txHash,
    setTxHash
  );
  const { balance, accountBalance, handleSend, handleSendAA } = useBalances(
    contractAddressLocal,
    txHash,
    setTxHash
  );

  return (
    <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '8px 0' }}>
      <Head>
        <title>Mychain</title>
        <meta name="description" content="Generated by create cosmos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Button onClick={() => (window.location.href = '/')}>
          <FaHome style={{ marginRight: '4px' }} />
          Home
        </Button>
      </div>
      <div style={{ display: 'flex' }}>
        <ChainCard prettyName={chain?.label || defaultChainName} icon={chain?.icon} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <AbstractAccountSection
          info={accountInfo as AccountInfoType}
          isGuardian={isGuardian}
          accountBalance={accountBalance}
          address={contractAddressLocal}
          handleRecover={handleRecover}
          handleRevoke={handleRevoke}
        />
        <WalletSection
          isMultiChain={false}
          balance={balance}
          contractAddress={contractAddressLocal}
          handleCreate={handleCreateAA}
          handleSend={handleSend}
          handleSendAA={handleSendAA}
        />
      </div>
    </div>
  );
}

import '../styles/globals.css';
import '@interchain-ui/react/styles';

import type { AppProps } from 'next/app';
import { ThemeProvider, useTheme, OverlaysManager } from '@interchain-ui/react';
import { ChainProvider } from '@cosmos-kit/react';
import { wallets as keplrWallets } from '@cosmos-kit/keplr';

import { chains, assets } from 'chain-registry';
import { chain } from '../config/chain';
import { assetlist } from '../config/assetlist';

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const { themeClass } = useTheme();

  return (
    <ThemeProvider>
      <ChainProvider
        chains={[...chains, chain]}
        assetLists={[...assets, assetlist]}
        wallets={[...keplrWallets]}
        walletConnectOptions={{
          signClient: {
            projectId: '7e8072a07047336fdcac1e4663c217ed',
          },
        }}
        endpointOptions={{
          isLazy: true,
        }}
      >
        <div className={themeClass}>
          <Component {...pageProps} />
          <OverlaysManager />
        </div>
      </ChainProvider>
    </ThemeProvider>
  );
}

export default CreateCosmosApp;

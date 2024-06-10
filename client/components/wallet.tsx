import { useChain } from '@cosmos-kit/react';
import {
  Box,
  Center,
  Grid,
  GridItem,
  Icon,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { WalletStatus } from "@cosmos-kit/core";
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
  contractAddress?: string,
  handleCreate?: (params: CreateAccountType) => Promise<void>;
  setChainName?: (chainName: ChainName | undefined) => void;
  handleSend?: (amount: string | undefined, recipient: string | undefined) => Promise<void>;
  handleSendAA?: (amount: string | undefined, recipient: string | undefined) => Promise<void>;
}) => {
  const {
    connect,
    openView,
    status,
    username,
    address,
    message,
    wallet,
  } = useChain(providedChainName || defaultChainName);
  const { colorMode } = useColorMode();

  // Events
  const onClickConnect: MouseEventHandler = async (e) => {
    e.preventDefault();
    await connect();
  };

  const onClickOpenView: MouseEventHandler = (e) => {
    e.preventDefault();
    openView();
  };

  // Components
  const connectWalletButton = (
    <WalletConnectComponent
      walletStatus={status}
      disconnect={
        <Disconnected buttonText="Connect Wallet" onClick={onClickConnect} />
      }
      connecting={<Connecting />}
      connected={
        <Connected buttonText={'My Wallet'} onClick={onClickOpenView} />
      }
      rejected={<Rejected buttonText="Reconnect" onClick={onClickConnect} />}
      error={<Error buttonText="Change Wallet" onClick={onClickOpenView} />}
      notExist={
        <NotExist buttonText="Install Wallet" onClick={onClickOpenView} />
      }
    />
  );

  const connectWalletWarn = (
    <ConnectStatusWarn
      walletStatus={status}
      rejected={
        <RejectedWarn
          icon={<Icon as={FiAlertTriangle} mt={1} />}
          wordOfWarning={`${wallet?.prettyName}: ${message}`}
        />
      }
      error={
        <RejectedWarn
          icon={<Icon as={FiAlertTriangle} mt={1} />}
          wordOfWarning={`${wallet?.prettyName}: ${message}`}
        />
      }
    />
  );

  useEffect(() => {
    setChainName?.(window.localStorage.getItem('selected-chain') || 'osmosis');
  }, [setChainName]);

  const userInfo = username && (
    <ConnectedUserInfo username={username} icon={<Astronaut />} />
  );
  const userBalance = status === WalletStatus.Connected && balance && (
    <ConnectedUserBalanceInfo balance={balance} />
  )
  const createBtn = (
    <CreateAAButton isDisabled={status !== WalletStatus.Connected} handleCreate={handleCreate} />
  )

  const sendBtn = (
    <SendButton 
      isDisabled={status !== WalletStatus.Connected} 
      handleSend={handleSend} 
      handleSendAA={handleSendAA}
      contractAddress={contractAddress}
    />
  )

  const addressBtn = (
    <CopyAddressBtn
      walletStatus={status}
      connected={<ConnectedShowAddress address={address} isLoading={false} />}
    />
  );

  return (
    <Center py={16}>
      <Grid
        w="full"
        maxW="sm"
        templateColumns="1fr"
        rowGap={4}
        alignItems="center"
        justifyContent="center"
      >
        {!providedChainName && isMultiChain ? (
          <ConnectWalletButton buttonText={'Connect Wallet'} isDisabled />
        ) : (
          <GridItem px={6}>
            <Stack
              justifyContent="center"
              alignItems="center"
              borderRadius="lg"
              bg={colorMode === 'light' ? 'white' : 'blackAlpha.400'}
              boxShadow={
                colorMode === 'light'
                  ? '0 0 2px #dfdfdf, 0 0 6px -2px #d3d3d3'
                  : '0 0 2px #363636, 0 0 8px -2px #4f4f4f'
              }
              spacing={4}
              px={4}
              py={{ base: 6, md: 12 }}
            >
              {userInfo}
              {userBalance}
              {addressBtn}
              <Box w="full" maxW={{ base: 52, md: 64 }}>
                {connectWalletButton}
              </Box>
              <Box w="full" maxW={{ base: 52, md: 64 }}>
                {createBtn}
              </Box>
              <Box w="full" maxW={{ base: 52, md: 64 }} >
                {sendBtn}
              </Box>
              {connectWalletWarn && <GridItem>{connectWalletWarn}</GridItem>}
            </Stack>
          </GridItem>
        )}
      </Grid>
    </Center>
  );
};

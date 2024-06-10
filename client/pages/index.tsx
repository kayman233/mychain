import Head from 'next/head';
import {
  Box,
  Divider,
  Heading,
  Text,
  Stack,
  Container,
  Link,
  Button,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue,
  Input,
} from '@chakra-ui/react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { FaHome } from "react-icons/fa";
import { useChain, useManager } from '@cosmos-kit/react';

import {
  ChainCard,
  WalletSection,
} from '../components';
import { useBalances } from '../hooks/useBalances';
import { useState } from 'react';
import { useAA } from '../hooks/useAA';
import { useCreateAA } from '../hooks/useCreateAA';
import { AbstractAccountSection } from '../components/abstr';
import { AccountInfoType } from '../hooks/types';
import { defaultChainName } from '../config';


export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { chainRecords, getChainLogo } = useManager();
  const { chain: chainInfo } = useChain(defaultChainName);

  const chain = {
    chainName: defaultChainName,
    label: chainInfo.pretty_name,
    value: defaultChainName,
    icon: getChainLogo(defaultChainName),
  };

  const { handleCreateAA, contractAddress } = useCreateAA()
  const { accountInfo, isGuardian, userPubkey, txHash: txHashA, contractAddressLocal, handleRecover, handleRevoke } = useAA(contractAddress);
  const { balance, txHash, result, accountBalance, handleSend, handleSendAA } = useBalances(contractAddressLocal);

  return (
    <Container maxW="5xl" py={2}>
      <Head>
        <title>Mychain</title>
        <meta name="description" content="Generated by create cosmos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent="end" mb={4}>
        <Button variant="outline" px={0} onClick={toggleColorMode}>
          <Icon
            as={colorMode === 'light' ? BsFillMoonStarsFill : BsFillSunFill}
          />
        </Button>
        <Button variant="outline" px={0} ml={2} onClick={() => window.location.href = "/"}>
          <Icon
            as={FaHome}
          />
        </Button>
      </Flex>
      <Flex>
        <ChainCard
          prettyName={chain?.label || defaultChainName}
          icon={chain?.icon}
        />
      </Flex>
      <Flex justifyContent="center" alignItems="start">
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
      </Flex>
    </Container>
  );
}
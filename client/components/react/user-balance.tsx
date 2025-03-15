import React from 'react';
import { Stack, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { ConnectedUserBalanceType } from '../types';

export const ConnectedUserBalanceInfo = ({ balance }: ConnectedUserBalanceType) => (
  <Stack spacing={1} alignItems="center">
    {balance && (
      <>
        <Stat>
          <StatLabel>Balance</StatLabel>
          <StatNumber>{balance}stake</StatNumber>
        </Stat>
      </>
    )}
  </Stack>
);

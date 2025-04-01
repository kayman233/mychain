import { useChain } from '@cosmos-kit/react';
import { Center, Grid, GridItem, Stack, useColorMode, Select } from '@chakra-ui/react';

import { defaultChainName } from '../config';
import { AccountInfoType, StoredAccount } from '../hooks/types';
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
  accounts,
  selectedAccount,
  selectAccount,
}: {
  info?: AccountInfoType;
  accountBalance?: string;
  address?: string;
  isGuardian?: boolean;
  handleRecover?: (newPubkey: string | undefined) => Promise<void>;
  handleRevoke?: () => Promise<void>;
  accounts: StoredAccount[];
  selectedAccount: StoredAccount | null;
  selectAccount: (account: StoredAccount) => void;
}) => {
  const { address: addressUser } = useChain(defaultChainName);
  const { colorMode } = useColorMode();

  console.log('info', info);
  console.log('address', address);

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
    <Center py={16}>
      <Grid
        w="full"
        maxW="sm"
        templateColumns="1fr"
        rowGap={4}
        alignItems="center"
        justifyContent="center"
      >
        <GridItem px={8}>
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
            <Select
              value={selectedAccount?.contractAddress || ''}
              onChange={e => {
                const account = accounts.find(a => a.contractAddress === e.target.value);
                if (account) {
                  selectAccount(account);
                }
              }}
            >
              {accounts.map(account => (
                <option key={account.contractAddress} value={account.contractAddress}>
                  {account.username} ({account.contractAddress.slice(0, 8)}...)
                </option>
              ))}
            </Select>
            {userInfo}
            {userBalance}
            <ConnectedShowAddress address={address} isLoading={false} />
            <InfoAccordion info={info} />
            {recoveryBtn}
          </Stack>
        </GridItem>
      </Grid>
    </Center>
  );
};

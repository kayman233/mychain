import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  ListItem,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { ConnectedShowAddress } from './address-card';
import {
  GuardiansListResp,
  ArrayOfCountsResponse,
  ArrayOfVotesResponse,
  ArrayOfKeyValueResponse,
  ArrayOfBinary,
} from '../../codegen/SocialRecovery.types';

interface AccordionProps {
  info: {
    pubkey: string | null;
    threshold: number | null;
    guardians: GuardiansListResp | null;
    counts: ArrayOfCountsResponse | null;
    votes: ArrayOfVotesResponse | null;
    data: ArrayOfKeyValueResponse | null;
    shares: ArrayOfBinary | null;
    recoverData: ArrayOfBinary | null;
  };
  isGuardian: boolean;
}

const InfoAccordion = ({ info, isGuardian }: AccordionProps) => {
  const { counts, votes: rawVotes, data, shares, recoverData } = info;

  const processedVotes = counts?.map(count => ({
    pubkey: count.pubkey,
    count: count.votes,
    voters: rawVotes?.filter(vote => vote.vote === count.pubkey),
  }));

  return (
    <Accordion defaultIndex={[0]} allowMultiple width="100%">
      <AccordionItem key="key">
        <h2>
          <AccordionButton justifyContent="center">
            <Text fontSize="sm" fontWeight="semibold">
              Owner&apos;s public key
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ConnectedShowAddress
            size="sm"
            address={info.pubkey}
            isLoading={false}
            maxDisplayLength={8}
          />
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem key="guardian">
        <h2>
          <AccordionButton justifyContent="center">
            <Text fontSize="sm" fontWeight="semibold">
              Guardians
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <OrderedList>
            {info.guardians?.guardians.map(guardian => (
              <ListItem key={`${guardian}List`} marginBottom="1">
                <ConnectedShowAddress size="sm" address={guardian} isLoading={false} />
              </ListItem>
            ))}
          </OrderedList>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem key="votes">
        <h2>
          <AccordionButton justifyContent="center">
            <Text fontSize="sm" fontWeight="semibold">
              Votes
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {!processedVotes || processedVotes?.length === 0 ? (
            <>No votes</>
          ) : (
            <OrderedList>
              {processedVotes?.map(vote => (
                <ListItem key={vote.pubkey} alignItems="center">
                  <Text fontSize="sm" fontWeight="semibold" width="100%" marginBottom="1">
                    New pubkey :
                  </Text>
                  <ConnectedShowAddress
                    size="sm"
                    address={vote.pubkey}
                    isLoading={false}
                    maxDisplayLength={8}
                  />
                  <Text fontSize="sm" fontWeight="semibold" width="100%" marginBottom="1">
                    Voters ({vote.count} / {info.threshold}) :
                  </Text>
                  <UnorderedList>
                    {vote.voters?.map(voter => (
                      <ListItem key={voter.addr} marginBottom="1">
                        <ConnectedShowAddress size="sm" address={voter.addr} isLoading={false} />
                      </ListItem>
                    ))}
                  </UnorderedList>
                </ListItem>
              ))}
            </OrderedList>
          )}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem key="data">
        <h2>
          <AccordionButton justifyContent="center">
            <Text fontSize="sm" fontWeight="semibold">
              Stored Data
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {!data || data?.length === 0 ? (
            <>No stored data</>
          ) : (
            <OrderedList>
              {data?.map(item => (
                <ListItem key={item.key} alignItems="center" marginBottom="4">
                  <Text fontSize="sm" fontWeight="semibold" width="100%" marginBottom="1">
                    Key: {item.key}
                  </Text>
                  <Text fontSize="sm" width="100%" marginBottom="1" wordBreak="break-all">
                    Value: {atob(item.value)}
                  </Text>
                </ListItem>
              ))}
            </OrderedList>
          )}
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem key="shares">
        <h2>
          <AccordionButton justifyContent="center">
            <Text fontSize="sm" fontWeight="semibold">
              Shares
            </Text>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {!shares || shares?.length === 0 ? (
            <>No shares</>
          ) : (
            <OrderedList>
              {shares?.map(share => {
                const [address, data] = share.toString().split(',');
                return (
                  <ListItem key={address} marginBottom="1">
                    <Text fontSize="sm" fontWeight="semibold" width="100%" marginBottom="1">
                      Address: {address.slice(0, 8)}...{address.slice(-8)}
                    </Text>
                    <Text fontSize="sm" width="100%" marginBottom="1" wordBreak="break-all">
                      Data: {data.slice(0, 8)}...{data.slice(-8)}
                    </Text>
                  </ListItem>
                );
              })}
            </OrderedList>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export { InfoAccordion };

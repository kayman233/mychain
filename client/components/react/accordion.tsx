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
import { AccountInfoType } from '../../hooks/types';
import { ConnectedShowAddress } from './address-card';

export const InfoAccordion = ({ info }: { info: AccountInfoType }) => {
  const votes = info?.counts?.map(count => ({
    voters: info.votes?.filter(vote => vote.vote === count.pubkey),
    count: count.votes,
    pubkey: count.pubkey,
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
          {!votes || votes?.length === 0 ? (
            <>No votes</>
          ) : (
            <OrderedList>
              {votes?.map(vote => (
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
    </Accordion>
  );
};

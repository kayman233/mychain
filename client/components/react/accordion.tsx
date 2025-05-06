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
  Button,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalBody,
  ModalContent,
  Input,
  ModalHeader,
  useToast,
} from '@chakra-ui/react';
import { ConnectedShowAddress } from './address-card';
import {
  GuardiansListResp,
  ArrayOfCountsResponse,
  ArrayOfVotesResponse,
  ArrayOfKeyValueResponse,
  ArrayOfBinary,
} from '../../codegen/SocialRecovery.types';
import { useState } from 'react';
import { generateKeysFromMnemonic, decryptWithSecp256k1 } from '../../crypto';

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
  const [isOpen, setIsOpen] = useState(false);
  const [mnemonic, setMnemonic] = useState<string>('');
  const [key, setKey] = useState<string>('');
  const [decryptedData, setDecryptedData] = useState<string>('');

  const toast = useToast();

  const processedVotes = counts?.map(count => ({
    pubkey: count.pubkey,
    count: count.votes,
    voters: rawVotes?.filter(vote => vote.vote === count.pubkey),
  }));

  const openModal = (key: string) => {
    setIsOpen(true);
    setKey(key);
  };

  const decryptData = async () => {
    try {
      const keys = await generateKeysFromMnemonic(mnemonic);
      const value = data?.find(item => item.key === key)?.value;

      if (!value) {
        throw new Error('Data not found');
      }

      const encryptedData = JSON.parse(atob(value));
      const decrypted = await decryptWithSecp256k1(encryptedData, keys.privateKey);
      setDecryptedData(atob(decrypted));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error decrypting data',
        status: 'error',
      });

      setDecryptedData('');
    }
  };

  return (
    <>
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
              address={info.pubkey || ''}
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
                {data?.map(item => {
                  let value = atob(item.value);
                  let hasEncrypted = false;
                  if (value.includes('{')) {
                    hasEncrypted = true;
                    value = JSON.parse(value).encryptedMsg;
                  }
                  return (
                    <ListItem key={item.key} alignItems="center" marginBottom="4">
                      <Text fontSize="sm" fontWeight="semibold" width="100%" marginBottom="1">
                        Key: {item.key}
                      </Text>
                      <Text fontSize="sm" width="100%" marginBottom="1" wordBreak="break-all">
                        Value: {value}
                      </Text>
                      {hasEncrypted && (
                        <Button
                          fontSize="sm"
                          width="100%"
                          marginBottom="1"
                          wordBreak="break-all"
                          onClick={() => openModal(item.key)}
                        >
                          Decrypt
                        </Button>
                      )}
                    </ListItem>
                  );
                })}
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
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Decrypt Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              placeholder="Enter mnemonic"
              value={mnemonic}
              onChange={e => setMnemonic(e.target.value)}
            />
            <Button mt={4} onClick={decryptData}>
              Decrypt
            </Button>
            {decryptedData && (
              <>
                <Text mt={4} fontSize="sm" fontWeight="semibold">
                  Decrypted data:
                </Text>
                <Text mt={4}>{decryptedData}</Text>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { InfoAccordion };

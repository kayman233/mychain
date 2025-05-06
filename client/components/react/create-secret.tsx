import React, { useState } from 'react';
import {
  Button,
  Input,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  useToast,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Text,
  VStack,
  Code,
  Box,
  Collapse,
} from '@chakra-ui/react';
import { Secp256k1 } from '@cosmjs/crypto';
import { FaKey, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import {
  generateKeysFromMnemonic,
  encryptWithSecp256k1,
  base64ToUint8Array,
  uint8ArrayToBase64,
} from '../../crypto';

interface CreateSecretButtonProps {
  isDisabled: boolean;
  handleSetSecret: (value: string) => Promise<void>;
  handleSetShare: (address: string, value: string) => Promise<void>;
}

interface Share {
  index: number;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

interface GeneratedData {
  key: string;
  shares: Array<Share>;
}

interface ShareRecipient {
  address: string;
  pubKey: string;
}

export const CreateSecretButton = ({
  isDisabled,
  handleSetSecret,
  handleSetShare,
}: CreateSecretButtonProps) => {
  const [numShares, setNumShares] = useState<number>(3);
  const [threshold, setThreshold] = useState<number>(2);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [expandedShare, setExpandedShare] = useState<number | null>(null);
  const [mnemonic, setMnemonic] = useState<string>('');
  const [shareRecipients, setShareRecipients] = useState<Record<number, ShareRecipient>>({});
  // const [testMessage, setTestMessage] = useState<string>('');
  // const [testResult, setTestResult] = useState<{
  //   original: string;
  //   encrypted: string;
  //   decrypted: string;
  // } | null>(null);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const encodeShare = (share: Share): string => {
    const shareData = {
      index: share.index,
      x1: share.x1,
      y1: share.y1,
      x2: share.x2,
      y2: share.y2,
    };
    return btoa(JSON.stringify(shareData));
  };

  const onClickCreate = async () => {
    if (threshold > numShares) {
      toast({
        title: 'Error',
        description: 'Threshold cannot be greater than number of shares',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate-shares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          numShares,
          threshold,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }

      setGeneratedData(result.data);
    } catch (error: any) {
      toast({
        title: 'Error generating shares',
        description: error?.message || 'Unknown error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // const testAsymmetricEncryption = async (
  //   privateKeyBase64: string,
  //   publicKeyBase64: string,
  //   message: string
  // ) => {
  //   try {
  //     // Шифруем сообщение используя публичный ключ получателя
  //     const encrypted = await encryptWithSecp256k1(message, publicKeyBase64);

  //     // Расшифровываем сообщение используя приватный ключ
  //     const decrypted = await decryptWithSecp256k1(encrypted, privateKeyBase64);

  //     return {
  //       original: message,
  //       encrypted: JSON.stringify(encrypted, null, 2),
  //       decrypted: decrypted,
  //     };
  //   } catch (error) {
  //     console.error('Test encryption error:', error);
  //     throw error;
  //   }
  // };

  // const handleTest = async (mnemonic: string) => {
  //   try {
  //     const keys = await generateKeysFromMnemonic(mnemonic);
  //     console.log('Private Key (base64):', keys.privateKey);
  //     console.log('Public Key (compressed, base64):', keys.publicKey);
  //     console.log('Public Key (full, base64):', keys.publicKeyFull);

  //     const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);
  //     const accounts = await wallet.getAccounts();
  //     console.log('accounts:', accounts);

  //     if (testMessage) {
  //       const encryptionTest = await testAsymmetricEncryption(
  //         keys.privateKey,
  //         keys.publicKeyFull,
  //         testMessage
  //       );
  //       setTestResult(encryptionTest);
  //     }
  //   } catch (error) {
  //     console.error('Error in handleTest:', error);
  //     toast({
  //       title: 'Error testing encryption',
  //       description: 'Encryption test failed',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };

  const setSecret = async () => {
    if (!generatedData || !mnemonic) {
      toast({
        title: 'Error',
        description: 'Please enter a mnemonic',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      const keys = await generateKeysFromMnemonic(mnemonic);
      const encrypted = await encryptWithSecp256k1(generatedData.key, keys.publicKeyFull);
      await handleSetSecret(JSON.stringify(encrypted));
    } catch (error) {
      console.error('Error in setSecret:', error);
      toast({
        title: 'Error setting secret',
        description: 'Encryption test failed',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const setShare = async (share: Share) => {
    try {
      const recipient = shareRecipients[share.index];
      if (!recipient) return;

      console.log(recipient);

      const fullPubkey = Secp256k1.uncompressPubkey(base64ToUint8Array(recipient.pubKey));

      // Шифруем долю с помощью публичного ключа получателя
      const encrypted = await encryptWithSecp256k1(
        encodeShare(share),
        uint8ArrayToBase64(fullPubkey)
      );

      console.log(encrypted);

      // Отправляем зашифрованную долю и адрес получателя
      await handleSetShare(recipient.address, JSON.stringify(encrypted));

      toast({
        title: 'Success',
        description: `Share ${share.index} has been set for ${recipient.address}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error setting share:', error);
      toast({
        title: 'Error setting share',
        description: 'Failed to set share',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        w="full"
        minW="fit-content"
        size="lg"
        isDisabled={isDisabled}
        bgImage="linear-gradient(109.6deg, #bc4c4c 11.2%, #cc9551 83.1%)"
        color="white"
        opacity={1}
        transition="all .5s ease-in-out"
        _hover={{
          bgImage: 'linear-gradient(109.6deg, #bc4c4c 11.2%, #cc9551 83.1%)',
          opacity: 0.75,
        }}
        _active={{
          bgImage: 'linear-gradient(109.6deg, #bc4c4c 11.2%, #cc9551 83.1%)',
          opacity: 0.9,
        }}
        onClick={onOpen}
      >
        <Icon as={FaKey} mr={2} />
        Create Secret
      </Button>
      <Modal
        closeOnOverlayClick={!isLoading}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Secret</ModalHeader>
          <ModalCloseButton isDisabled={isLoading} />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Number of Shares</FormLabel>
                <Input
                  type="number"
                  min={2}
                  value={numShares}
                  onChange={e => setNumShares(parseInt(e.target.value))}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Threshold</FormLabel>
                <Input
                  type="number"
                  min={2}
                  max={numShares}
                  value={threshold}
                  onChange={e => setThreshold(parseInt(e.target.value))}
                />
              </FormControl>
              {generatedData && (
                <Box mt={4} p={4} borderWidth={1} borderRadius="md">
                  <Text fontWeight="bold">Generated Key:</Text>
                  <Code p={2} mt={1} display="block">
                    {generatedData.key}
                  </Code>
                  <FormControl>
                    <FormLabel>Mnemonic</FormLabel>
                    <Input
                      type="text"
                      value={mnemonic}
                      onChange={e => setMnemonic(e.target.value)}
                      placeholder="Enter your mnemonic phrase"
                    />
                  </FormControl>
                  <Button colorScheme="purple" variant="solid" mt={4} onClick={() => setSecret()}>
                    Set Secret
                  </Button>

                  <Text fontWeight="bold" mt={4}>
                    Shares:
                  </Text>
                  <VStack mt={2} align="stretch" spacing={2}>
                    {generatedData.shares.map(share => (
                      <Box key={share.index} p={2} bg="gray.50" borderRadius="md">
                        <Button
                          w="full"
                          variant="ghost"
                          onClick={() =>
                            setExpandedShare(expandedShare === share.index ? null : share.index)
                          }
                          rightIcon={
                            expandedShare === share.index ? <FaChevronUp /> : <FaChevronDown />
                          }
                        >
                          Share {share.index}
                        </Button>
                        <Collapse in={expandedShare === share.index}>
                          <Box mt={2}>
                            <FormControl>
                              <FormLabel>Recipient Address</FormLabel>
                              <Input
                                value={shareRecipients[share.index]?.address || ''}
                                onChange={e =>
                                  setShareRecipients(prev => ({
                                    ...prev,
                                    [share.index]: {
                                      ...prev[share.index],
                                      address: e.target.value,
                                    },
                                  }))
                                }
                                placeholder="Enter recipient address"
                              />
                            </FormControl>
                            <FormControl mt={2}>
                              <FormLabel>Recipient Public Key</FormLabel>
                              <Input
                                value={shareRecipients[share.index]?.pubKey || ''}
                                onChange={e =>
                                  setShareRecipients(prev => ({
                                    ...prev,
                                    [share.index]: {
                                      ...prev[share.index],
                                      pubKey: e.target.value,
                                    },
                                  }))
                                }
                                placeholder="Enter recipient public key"
                              />
                            </FormControl>
                            <Text fontSize="sm" color="gray.500" mt={2}>
                              Encoded Share:
                            </Text>
                            <Code p={2} mt={1} display="block" wordBreak="break-all">
                              {encodeShare(share)}
                            </Code>
                            <Text fontSize="sm" color="gray.500" mt={2}>
                              Raw Values:
                            </Text>
                            <Code display="block" mt={1}>
                              x1: {share.x1}
                              <br />
                              y1: {share.y1}
                              <br />
                              x2: {share.x2}
                              <br />
                              y2: {share.y2}
                            </Code>
                          </Box>
                        </Collapse>
                        <Button
                          colorScheme="purple"
                          variant="solid"
                          mt={4}
                          isDisabled={
                            !shareRecipients[share.index]?.address ||
                            !shareRecipients[share.index]?.pubKey
                          }
                          onClick={() => setShare(share)}
                        >
                          Set Share
                        </Button>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" isLoading={isLoading} onClick={onClickCreate} mr={3}>
              Generate
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

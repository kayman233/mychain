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
import {
  Bip39,
  EnglishMnemonic,
  Secp256k1,
  Slip10,
  Slip10Curve,
  stringToPath,
} from '@cosmjs/crypto';
import { FaKey, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Secp256k1HdWallet } from '@cosmjs/amino';
import * as secp256k1 from '@noble/secp256k1';

interface CreateSecretButtonProps {
  isDisabled: boolean;
  handleSetSecret: (value: string) => Promise<void>;
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

const uint8ArrayToBase64 = (array: Uint8Array): string => btoa(String.fromCharCode(...array));

const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const CreateSecretButton = ({ isDisabled, handleSetSecret }: CreateSecretButtonProps) => {
  const [numShares, setNumShares] = useState<number>(3);
  const [threshold, setThreshold] = useState<number>(2);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [expandedShare, setExpandedShare] = useState<number | null>(null);
  const [mnemonic, setMnemonic] = useState<string>('');
  const [testMessage, setTestMessage] = useState<string>('');
  const [testResult, setTestResult] = useState<{
    original: string;
    encrypted: string;
    decrypted: string;
  } | null>(null);

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

  const generateKeysFromMnemonic = async (mnemonic: string) => {
    try {
      // Проверяем мнемонику
      const mnemonicChecked = new EnglishMnemonic(mnemonic);

      // Генерируем seed из мнемоники
      const seed = await Bip39.mnemonicToSeed(mnemonicChecked);

      // Создаем HD путь для Cosmos (m/44'/118'/0'/0/0)
      const hdPath = stringToPath("m/44'/118'/0'/0/0");

      // Получаем приватный ключ используя SLIP10
      const { privkey } = Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdPath);

      // Создаем keypair из приватного ключа
      const keypair = await Secp256k1.makeKeypair(privkey);

      // Получаем компрессированный публичный ключ
      const compressedPubkey = Secp256k1.compressPubkey(keypair.pubkey);
      const pubkeyFull = Secp256k1.uncompressPubkey(compressedPubkey);

      return {
        privateKey: Buffer.from(privkey).toString('base64'),
        publicKey: Buffer.from(compressedPubkey).toString('base64'),
        // Дополнительно можем вернуть некомпрессированный публичный ключ
        publicKeyFull: Buffer.from(pubkeyFull).toString('base64'),
      };
    } catch (error) {
      console.error('Error generating keys:', error);
      throw error;
    }
  };

  const encryptWithSecp256k1 = async (
    message: string,
    recipientPubKeyBase64: string
  ): Promise<{
    ephemeralPubKey: string;
    encryptedMsg: string;
    iv: string;
  }> => {
    try {
      // Генерируем эфемерный приватный ключ
      const ephemeralPrivKey = secp256k1.utils.randomPrivateKey();

      // Получаем эфемерный публичный ключ
      const ephemeralPubKey = secp256k1.getPublicKey(ephemeralPrivKey);

      // Декодируем публичный ключ получателя из base64
      const recipientPubKey = base64ToUint8Array(recipientPubKeyBase64);

      // Получаем общий секрет используя ECDH
      const sharedSecret = await secp256k1.getSharedSecret(ephemeralPrivKey, recipientPubKey);

      // Создаем ключ для AES из общего секрета (берем первые 32 байта)
      const aesKey = await window.crypto.subtle.importKey(
        'raw',
        sharedSecret.slice(1), // Пропускаем первый байт (0x02 или 0x03)
        { name: 'AES-GCM' },
        false,
        ['encrypt']
      );

      // Генерируем IV для AES
      const iv = window.crypto.getRandomValues(new Uint8Array(12));

      // Шифруем сообщение
      const encodedMessage = new TextEncoder().encode(message);
      const encryptedData = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        aesKey,
        encodedMessage
      );

      return {
        ephemeralPubKey: uint8ArrayToBase64(ephemeralPubKey),
        encryptedMsg: uint8ArrayToBase64(new Uint8Array(encryptedData)),
        iv: uint8ArrayToBase64(iv),
      };
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Encryption failed');
    }
  };

  const decryptWithSecp256k1 = async (
    encryptedData: {
      ephemeralPubKey: string;
      encryptedMsg: string;
      iv: string;
    },
    privateKeyBase64: string
  ): Promise<string> => {
    try {
      // Декодируем приватный ключ из base64
      const privateKey = base64ToUint8Array(privateKeyBase64);

      // Декодируем эфемерный публичный ключ
      const ephemeralPubKey = base64ToUint8Array(encryptedData.ephemeralPubKey);

      // Получаем общий секрет
      const sharedSecret = await secp256k1.getSharedSecret(privateKey, ephemeralPubKey);

      // Создаем ключ для AES из общего секрета
      const aesKey = await window.crypto.subtle.importKey(
        'raw',
        sharedSecret.slice(1), // Пропускаем первый байт
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      );

      // Декодируем IV и зашифрованное сообщение
      const iv = base64ToUint8Array(encryptedData.iv);
      const encryptedMsg = base64ToUint8Array(encryptedData.encryptedMsg);

      // Расшифровываем сообщение
      const decryptedData = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        aesKey,
        encryptedMsg
      );

      return new TextDecoder().decode(decryptedData);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Decryption failed');
    }
  };

  const testAsymmetricEncryption = async (
    privateKeyBase64: string,
    publicKeyBase64: string,
    message: string
  ) => {
    try {
      // Шифруем сообщение используя публичный ключ получателя
      const encrypted = await encryptWithSecp256k1(message, publicKeyBase64);

      // Расшифровываем сообщение используя приватный ключ
      const decrypted = await decryptWithSecp256k1(encrypted, privateKeyBase64);

      return {
        original: message,
        encrypted: JSON.stringify(encrypted, null, 2),
        decrypted: decrypted,
      };
    } catch (error) {
      console.error('Test encryption error:', error);
      throw error;
    }
  };

  const handleTest = async (mnemonic: string) => {
    try {
      const keys = await generateKeysFromMnemonic(mnemonic);
      console.log('Private Key (base64):', keys.privateKey);
      console.log('Public Key (compressed, base64):', keys.publicKey);
      console.log('Public Key (full, base64):', keys.publicKeyFull);

      const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic);
      const accounts = await wallet.getAccounts();
      console.log('accounts:', accounts);

      if (testMessage) {
        const encryptionTest = await testAsymmetricEncryption(
          keys.privateKey,
          keys.publicKeyFull,
          testMessage
        );
        setTestResult(encryptionTest);
      }
    } catch (error) {
      console.error('Error in handleTest:', error);
      toast({
        title: 'Error testing encryption',
        description: 'Encryption test failed',
        status: 'error',
        duration: 5000,
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
              <FormControl>
                <FormLabel>Mnemonic</FormLabel>
                <Input
                  type="text"
                  value={mnemonic}
                  onChange={e => setMnemonic(e.target.value)}
                  placeholder="Enter your mnemonic phrase"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Test Message</FormLabel>
                <Input
                  type="text"
                  value={testMessage}
                  onChange={e => setTestMessage(e.target.value)}
                  placeholder="Enter a message to test encryption"
                />
              </FormControl>
              <Button
                colorScheme="teal"
                onClick={() => handleTest(mnemonic)}
                isDisabled={!mnemonic || !testMessage}
              >
                Test Keys & Encryption
              </Button>
              {testResult && (
                <Box p={4} borderWidth={1} borderRadius="md" bg="gray.50">
                  <Text fontWeight="bold">Encryption Test Results:</Text>
                  <VStack align="stretch" spacing={2} mt={2}>
                    <Box>
                      <Text fontSize="sm" color="gray.500">
                        Original Message:
                      </Text>
                      <Code p={2} display="block" wordBreak="break-all">
                        {testResult.original}
                      </Code>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">
                        Encrypted (Base64):
                      </Text>
                      <Code p={2} display="block" wordBreak="break-all">
                        {testResult.encrypted}
                      </Code>
                    </Box>
                    <Box>
                      <Text fontSize="sm" color="gray.500">
                        Decrypted:
                      </Text>
                      <Code p={2} display="block" wordBreak="break-all">
                        {testResult.decrypted}
                      </Code>
                    </Box>
                  </VStack>
                </Box>
              )}
              {generatedData && (
                <Box mt={4} p={4} borderWidth={1} borderRadius="md">
                  <Text fontWeight="bold">Generated Key:</Text>
                  <Code p={2} mt={1} display="block">
                    {generatedData.key}
                  </Code>

                  <Button
                    colorScheme="purple"
                    variant="solid"
                    mt={4}
                    onClick={() => handleSetSecret(generatedData.key)}
                  >
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
                            <Text fontSize="sm" color="gray.500">
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

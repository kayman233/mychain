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
  NumberInput,
  NumberInputField,
  Text,
  useToast,
  ModalCloseButton,
} from '@chakra-ui/react';
import { IoPaperPlane } from 'react-icons/io5';
import { SendType } from '../types';

export const SendButton = ({
  buttonText,
  isDisabled,
  contractAddress,
  handleSend,
  handleSendAA,
}: SendType) => {
  const [recipient, setRecipient] = useState<string | undefined>('');
  const [amount, setAmount] = useState<string | undefined>('1000');
  const [isLoading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickSend = async () => {
    setLoading(true);
    try {
      const result = (await handleSend?.(amount, recipient)) as unknown as string;

      if (result?.length > 0) {
        toast({
          title: 'Funds were sent',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw Error('Error sending');
      }
    } catch (error: any) {
      toast({
        title: 'Error sending',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
    onClose();
  };

  const onClickSendAA = async () => {
    setLoading(true);
    try {
      const result = (await handleSendAA?.(amount, recipient)) as unknown as string;

      if (result && result === 'success') {
        toast({
          title: 'Funds were sent',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw Error('Error sending');
      }
    } catch (error: any) {
      toast({
        title: 'Error sending',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
    onClose();
  };
  return (
    <>
      <Button
        w="full"
        minW="fit-content"
        size="lg"
        isDisabled={isDisabled}
        bgImage="linear-gradient(109.6deg, #4bc76a 11.2%, #9fcc51 83.1%)"
        color="white"
        opacity={1}
        transition="all .5s ease-in-out"
        _hover={{
          bgImage: 'linear-gradient(109.6deg, #4bc76a 11.2%, #9fcc51 83.1%)',
          opacity: 0.75,
        }}
        _active={{
          bgImage: 'linear-gradient(109.6deg, #4bc76a 11.2%, #9fcc51 83.1%)',
          opacity: 0.9,
        }}
        marginTop="5"
        onClick={onOpen}
      >
        <Icon as={IoPaperPlane} mr={2} />
        {buttonText ? buttonText : 'Send tokens'}
      </Button>
      <Modal closeOnOverlayClick={!isLoading} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Tokens</ModalHeader>
          <ModalCloseButton isDisabled={isLoading} />
          <ModalBody>
            <Text marginTop="3" marginBottom="3" fontSize="sm" fontWeight="semibold">
              Address:
            </Text>
            <Input
              placeholder="Address"
              value={recipient}
              onChange={(e: any) => setRecipient(e.target.value)}
            />
            <Text marginTop="3" marginBottom="3" fontSize="sm" fontWeight="semibold">
              Tokens(stake):
            </Text>
            <NumberInput
              defaultValue="1000"
              min={1}
              placeholder="Amount"
              value={amount}
              onChange={value => setAmount(value)}
            >
              <NumberInputField />
            </NumberInput>
          </ModalBody>
          <ModalFooter justifyContent="space-around">
            <Button
              colorScheme="purple"
              variant="solid"
              isLoading={isLoading}
              isDisabled={contractAddress?.length === 0}
              onClick={() => onClickSendAA()}
            >
              Send from Smart Account
            </Button>
            <Button
              colorScheme="purple"
              variant="outline"
              isLoading={isLoading}
              onClick={() => onClickSend()}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

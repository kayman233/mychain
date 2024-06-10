import React, { MouseEventHandler, useState, ReactNode } from 'react';
import { Button, Input, Icon, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalFooter, ModalBody, NumberInput, NumberInputField, Text } from '@chakra-ui/react';
import { IoPaperPlane } from 'react-icons/io5';
import { ConnectWalletType, CreateAAType, SendType } from '../types';
import { FiAlertTriangle } from 'react-icons/fi';
import { WalletStatus } from '@cosmos-kit/core';

export const SendButton = ({
  buttonText,
  isDisabled,
  contractAddress,
  handleSend,
  handleSendAA,
}: SendType) => {
    const [recipient, setRecipient] = useState<string | undefined>(''); 
    const [amount, setAmount] = useState<string | undefined>('1000');
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onClickSend = async () => {
        await handleSend?.(amount, recipient);
        onClose();
    }

    const onClickSendAA = async () => {
        await handleSendAA?.(amount, recipient);
        onClose();
    }
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
        bgImage:
          'linear-gradient(109.6deg, #4bc76a 11.2%, #9fcc51 83.1%)',
        opacity: 0.75
      }}
      _active={{
        bgImage:
          'linear-gradient(109.6deg, #4bc76a 11.2%, #9fcc51 83.1%)',
        opacity: 0.9
      }}
      marginTop="5"
      onClick={onOpen}
    >
      <Icon as={IoPaperPlane} mr={2} />
      {buttonText ? buttonText : 'Send tokens'}
    </Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Send Tokens</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text marginTop="3" marginBottom="3" fontSize='sm' fontWeight="semibold">
                Address:
            </Text>
            <Input placeholder='Address' value={recipient} onChange={(e: any) => setRecipient(e.target.value)} />
            <Text marginTop="3" marginBottom="3" fontSize='sm' fontWeight="semibold">
                Tokens(stake):
            </Text>
            <NumberInput
                defaultValue="1000"
                min={1}
                placeholder='Amount'
                value={amount}
                onChange={(value) => setAmount(value)}
            >
                <NumberInputField />
            </NumberInput>
            {/* <Input placeholder='Amount' value={amount} onChange={(e: any) => setAmount(e.target.value)} /> */}
        </ModalBody>
          <ModalFooter justifyContent='space-around'>
            <Button colorScheme='purple' variant='solid' onClick={() => onClickSendAA()}>Send from Smart Account</Button>
            <Button colorScheme='purple' variant='outline' isDisabled={contractAddress?.length === 0} onClick={() => onClickSend()}>Send</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    
  );
};

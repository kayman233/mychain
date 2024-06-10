import React, { MouseEventHandler, useState, ReactNode } from 'react';
import { Button, Input, Icon, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalFooter, ModalBody } from '@chakra-ui/react';
import { IoBuildSharp } from 'react-icons/io5';
import { ConnectWalletType, CreateAAType, RecoverAAType } from '../types';
import { FiAlertTriangle } from 'react-icons/fi';
import { WalletStatus } from '@cosmos-kit/core';

export const RecoveryAAButton = ({
  buttonText,
  isDisabled,
  voted,
  handleRecover,
  handleRevoke,
}: RecoverAAType) => {
    const [newkey, setNewkey] = useState<string | undefined>('');

    const { isOpen, onOpen, onClose } = useDisclosure()

    const onRecoverClick = async () => {
        console.log("onRecoverClick");
        await handleRecover?.(newkey);
        onClose();
    }

    const onRevokeClick = async () => {
        console.log("onRevokeClick");
        await handleRevoke?.();
        onClose();
    }
  return (
    <>
    <Button
      w="full"
      minW="fit-content"
      size="lg"
      isDisabled={isDisabled}
      bgImage="linear-gradient(109.6deg, #4b55c7 11.2%, #5176cc 83.1%)"
      color="white"
      opacity={1}
      transition="all .5s ease-in-out"
      _hover={{
        bgImage:
          'linear-gradient(109.6deg, #4b55c7 11.2%, #5176cc 83.1%)',
        opacity: 0.75
      }}
      _active={{
        bgImage:
          'linear-gradient(109.6deg, #4b55c7 11.2%, #5176cc 83.1%)',
        opacity: 0.9
      }}
      onClick={onOpen}
    >
      <Icon as={IoBuildSharp} mr={2} />
      {buttonText ? buttonText : 'Recovery'}
    </Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recovery</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
          <Input isDisabled={voted} placeholder='New Pubkey' value={newkey} onChange={(e: any) => setNewkey(e.target.value)} />
          </ModalBody>

          <ModalFooter justifyContent='space-around'>
            <Button colorScheme='purple' variant='solid' isDisabled={voted} onClick={() => onRecoverClick()}>Recover</Button>
            <Button colorScheme='purple' variant='outline' isDisabled={!voted} onClick={() => onRevokeClick()}>Revoke</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    
  );
};

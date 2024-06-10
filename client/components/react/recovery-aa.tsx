import React, { useState } from 'react';
import { Button, Input, Icon, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalFooter, ModalBody, useToast, ModalCloseButton } from '@chakra-ui/react';
import { IoBuildSharp } from 'react-icons/io5';
import { RecoverAAType } from '../types';

export const RecoveryAAButton = ({
  buttonText,
  isDisabled,
  voted,
  handleRecover,
  handleRevoke,
}: RecoverAAType) => {
    const [newkey, setNewkey] = useState<string | undefined>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const onRecoverClick = async () => {
        setLoading(true);
        try {
            const result = await handleRecover?.(newkey) as unknown as string;

            if (result?.length > 0) {
                toast({
                    title: 'Recover sent',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                throw Error('Error sending')
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
    }

    const onRevokeClick = async () => {
        setLoading(true);
        try {
            const result = await handleRevoke?.() as unknown as string;

            if (result?.length > 0) {
                toast({
                    title: 'Revoke sent',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                throw Error('Error sending')
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
    <Modal closeOnOverlayClick={!isLoading} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recovery</ModalHeader>
          <ModalCloseButton isDisabled={isLoading} />
          <ModalBody>
          <Input isDisabled={voted} placeholder='New Pubkey' value={newkey} onChange={(e: any) => setNewkey(e.target.value)} />
          </ModalBody>

          <ModalFooter justifyContent='space-around'>
            <Button colorScheme='purple' variant='solid' isLoading={isLoading} isDisabled={voted} onClick={() => onRecoverClick()}>Recover</Button>
            <Button colorScheme='purple' variant='outline' isLoading={isLoading} isDisabled={!voted} onClick={() => onRevokeClick()}>Revoke</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    
  );
};

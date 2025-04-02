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
} from '@chakra-ui/react';
import { FaKey } from 'react-icons/fa';

interface SetDataButtonProps {
  isDisabled: boolean;
  handleSetData: (key: string, value: string) => Promise<void>;
}

export const CreateSecretButton = ({ handleSetData }: SetDataButtonProps) => {
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickSetData = async () => {
    if (!key || !value) {
      toast({
        title: 'Error',
        description: 'Please fill in both key and value fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      await handleSetData(key, value);
      toast({
        title: 'Data stored successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setKey('');
      setValue('');
      onClose();
    } catch (error: any) {
      toast({
        title: 'Error storing data',
        description: error?.message || 'Unknown error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        w="full"
        minW="fit-content"
        size="lg"
        isDisabled={true}
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
      <Modal closeOnOverlayClick={!isLoading} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Secret</ModalHeader>
          <ModalCloseButton isDisabled={isLoading} />
          <ModalBody>
            <FormControl>
              <FormLabel>Secret</FormLabel>
              <Input
                placeholder="Enter secret"
                value={key}
                onChange={e => setKey(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Number of Shares</FormLabel>
              <Input
                placeholder="Enter number of shares"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" isLoading={isLoading} onClick={onClickSetData}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

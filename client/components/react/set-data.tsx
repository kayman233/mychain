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
import { FaDatabase } from 'react-icons/fa';

interface SetDataButtonProps {
  isDisabled: boolean;
  handleSetData: (key: string, value: string) => Promise<void>;
}

export const SetDataButton = ({ isDisabled, handleSetData }: SetDataButtonProps) => {
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
        isDisabled={isDisabled}
        bgImage="linear-gradient(109.6deg, #4c76bc 11.2%, #51cccc 83.1%)"
        color="white"
        opacity={1}
        transition="all .5s ease-in-out"
        _hover={{
          bgImage: 'linear-gradient(109.6deg, #4c76bc 11.2%, #51cccc 83.1%)',
          opacity: 0.75,
        }}
        _active={{
          bgImage: 'linear-gradient(109.6deg, #4c76bc 11.2%, #51cccc 83.1%)',
          opacity: 0.9,
        }}
        onClick={onOpen}
      >
        <Icon as={FaDatabase} mr={2} />
        Store Data
      </Button>
      <Modal closeOnOverlayClick={!isLoading} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Store Data</ModalHeader>
          <ModalCloseButton isDisabled={isLoading} />
          <ModalBody>
            <FormControl>
              <FormLabel>Key</FormLabel>
              <Input placeholder="Enter key" value={key} onChange={e => setKey(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Value</FormLabel>
              <Input
                placeholder="Enter value"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" isLoading={isLoading} onClick={onClickSetData}>
              Store
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

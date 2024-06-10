import React, { MouseEventHandler, useState, ReactNode } from 'react';
import { Button, Box, Input, Icon, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalContent, ModalFooter, ModalBody, Text, NumberInput, NumberInputField } from '@chakra-ui/react';
import { IoAdd } from 'react-icons/io5';
import { ConnectWalletType, CreateAAType } from '../types';
import { FiAlertTriangle } from 'react-icons/fi';
import { WalletStatus } from '@cosmos-kit/core';

export const CreateAAButton = ({
  buttonText,
  isDisabled,
  handleCreate,
}: CreateAAType) => {
    const [newFunds, setNewFunds] = useState<string>('1000'); 
    const [newThreshold, setNewThreshold] = useState<string>('1'); 
    const [guardiansCount, setGuardiansCount] = useState<string>('1');
    const [newGuardians, setNewGuardians] = useState<string[]>(['']);
  
    const { isOpen, onOpen, onClose } = useDisclosure()

    const onClick = async () => {
        console.log("handleCreate");
        console.log(newGuardians);
        const filtered = newGuardians.filter((guardian) => guardian.length > 0)
                                    .filter((item, i, ar) => ar.indexOf(item) === i);
        if (Number(newThreshold) > filtered.length) {
            return;
        }

        await handleCreate?.({funds: newFunds, guardians: filtered, threshold: Number(newThreshold)});
        onClose();
    }

    const handleThreshold = (value: string) => {
        setNewThreshold(value);
        setGuardiansCount(value);
        setNewGuardians(Array(Number(value)).fill(""));
    };

    const handleGuardianChange = (index: number, e: any) => {
        const updatedGuardians = [...newGuardians];
        updatedGuardians[index] = e.target.value;
        setNewGuardians(updatedGuardians);
    };

    const addRow = () => {
        setGuardiansCount(guardiansCount + 1);
        setNewGuardians([...newGuardians, ""]);
    };


  return (
    <>
    <Button
      w="full"
      minW="fit-content"
      size="lg"
      isDisabled={isDisabled}
      bgImage="linear-gradient(109.6deg, rgba(157,75,199,1) 11.2%, rgba(119,81,204,1) 83.1%)"
      color="white"
      opacity={1}
      transition="all .5s ease-in-out"
      _hover={{
        bgImage:
          'linear-gradient(109.6deg, rgba(157,75,199,1) 11.2%, rgba(119,81,204,1) 83.1%)',
        opacity: 0.75
      }}
      _active={{
        bgImage:
          'linear-gradient(109.6deg, rgba(157,75,199,1) 11.2%, rgba(119,81,204,1) 83.1%)',
        opacity: 0.9
      }}
      onClick={onOpen}
    >
      <Icon as={IoAdd} mr={2} />
      {buttonText ? buttonText : 'Create Smart Account'}
    </Button>
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Smart Account</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Text marginTop="3" marginBottom="3" fontSize='sm' fontWeight="semibold">
                Threshold:
            </Text>
            <NumberInput
                defaultValue="1"
                min={1}
                value={newThreshold}
                onChange={handleThreshold}
            >
                <NumberInputField />
            </NumberInput>
            <Text marginTop="3" marginBottom="3" fontSize='sm' fontWeight="semibold">
                Funds(stake):
            </Text>
            <NumberInput
                defaultValue="1000"
                min={1}
                value={newFunds}
                onChange={(value) => setNewFunds(value)}
            >
                <NumberInputField />
            </NumberInput>
            <Text marginTop="3" marginBottom="3" fontSize='sm' fontWeight="semibold">
                Guardians:
            </Text>
            <Box>
                {newGuardians?.map((guardian, index) => (
                <Input
                    marginBottom="3"
                    key={index}
                    value={guardian}
                    onChange={(e) => handleGuardianChange(index, e)}
                    placeholder={`Guardian ${index + 1}`}
                />
                ))}
            </Box>
            {/* <Input placeholder='Guardian' value={newGuardians} onChange={(e: any) => setNewGuardians([e.target.value])} /> */}
          </ModalBody>

          <ModalFooter justifyContent='space-around'>
            <Button colorScheme='purple' variant='outline' onClick={addRow}>Add Guardian</Button>
            <Button colorScheme='purple' variant='solid' onClick={onClick}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    
  );
};

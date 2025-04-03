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
import { FaKey, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CreateSecretButtonProps {
  isDisabled: boolean;
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

export const CreateSecretButton = ({ isDisabled }: CreateSecretButtonProps) => {
  const [numShares, setNumShares] = useState<number>(3);
  const [threshold, setThreshold] = useState<number>(2);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [expandedShare, setExpandedShare] = useState<number | null>(null);
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

              {generatedData && (
                <Box mt={4} p={4} borderWidth={1} borderRadius="md">
                  <Text fontWeight="bold">Generated Key:</Text>
                  <Code p={2} mt={1} display="block">
                    {generatedData.key}
                  </Code>

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

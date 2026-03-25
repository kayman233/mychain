import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Badge,
  useToast,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { useGoogleOAuth } from '../../hooks/useGoogleOAuth';
import { SocialRecoveryClient } from '../../codegen/SocialRecovery.client';
import { OAuthAttestationProof } from '../../codegen/SocialRecovery.types';
import { delay } from '../../hooks/useAA';
import { chain } from '../../config/chain';
import {
  requestOAuthAttestation,
  getOAuthSalt,
  MultiAttestorProof,
} from '../../utils/oauth-attestation';

interface OAuthRecoveryProps {
  client: SocialRecoveryClient | null;
  initClient: () => Promise<SocialRecoveryClient | null>;
  setTxHash: (hash: string) => void;
}

/**
 * Convert a MultiAttestorProof to the shape expected by the codegen contract client.
 */
function toContractProof(proof: MultiAttestorProof): OAuthAttestationProof {
  if (proof.signatures && proof.signatures.length > 0) {
    return {
      attestation: proof.attestation,
      signatures: proof.signatures,
    } as any;
  }
  return {
    attestation: proof.attestation,
    signature: proof.signature!,
  };
}

export function OAuthRecovery({ client, initClient, setTxHash }: OAuthRecoveryProps) {
  const { login, logout, idToken, userInfo, subHash, isAuthenticated } = useGoogleOAuth();
  const [newPubkey, setNewPubkey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleRecoverWithOAuth = async () => {
    if (!idToken || !newPubkey) {
      toast({ title: 'Please login and enter new pubkey', status: 'warning' });
      return;
    }

    setIsLoading(true);
    try {
      const c = client || (await initClient());
      if (!c) {
        toast({ title: 'Failed to initialize client', status: 'error' });
        return;
      }

      const salt = getOAuthSalt(c.contractAddress);
      const proof = await requestOAuthAttestation({
        idToken,
        contract: c.contractAddress,
        chainId: chain.chain_id,
        action: 'recover',
        newPubkey,
        salt,
      });
      const result = await c.recoverWithOAuth(
        {
          attestation: toContractProof(proof),
          newPubkey,
        },
        { gas: '2000000', amount: [] }
      );
      await delay(3000);
      setTxHash(result.transactionHash);
      toast({ title: 'OAuth recovery vote submitted', status: 'success' });
    } catch (error: any) {
      console.error('OAuth recovery error:', error);
      toast({ title: 'Recovery failed', description: error.message, status: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <VStack spacing={4} align="stretch">
        <Heading size="md">OAuth Recovery (Google)</Heading>
        <Divider />

        {!isAuthenticated ? (
          <Button colorScheme="blue" onClick={login} size="lg">
            Sign in with Google
          </Button>
        ) : (
          <VStack spacing={3} align="stretch">
            <HStack>
              <Badge colorScheme="green">Authenticated</Badge>
              <Text fontSize="sm">{userInfo?.email}</Text>
              <Button size="xs" variant="ghost" onClick={logout}>
                Logout
              </Button>
            </HStack>

            <Box bg="gray.50" p={3} borderRadius="md">
              <Text fontSize="xs" color="gray.600">
                Sub Hash: {subHash?.substring(0, 16)}...
              </Text>
            </Box>

            <Divider />

            <Text fontWeight="bold">Vote for Recovery</Text>
            <Input
              placeholder="New pubkey (base64)"
              value={newPubkey}
              onChange={e => setNewPubkey(e.target.value)}
            />
            <Button
              colorScheme="orange"
              onClick={handleRecoverWithOAuth}
              isLoading={isLoading}
              isDisabled={!newPubkey}
            >
              Submit OAuth Recovery Vote
            </Button>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}

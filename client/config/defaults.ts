import { assets } from 'chain-registry';
import { AssetList, Asset } from '@chain-registry/types';

export const defaultChainName = 'gmrollup';
export const defaultRpc = process.env.REACT_APP_RPC_ENDPOINT ?? "127.0.0.1:26657";
export const defaultBackendEndpoint = process.env.REACT_APP_GO_SERVER_ENDPOINT ?? "http://localhost:8080";

export const getChainAssets = (chainName: string = defaultChainName) => {
  return assets.find((chain) => chain.chain_name === chainName) as AssetList;
};

export const getCoin = (chainName: string = defaultChainName) => {
  const chainAssets = getChainAssets(chainName);
  return chainAssets.assets[0] as Asset;
};

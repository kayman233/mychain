import { assets } from 'chain-registry';
import { AssetList, Asset } from '@chain-registry/types';

export const defaultChainName = 'gmrollup';
export const defaultCA = 'cosmos1mssg28kaflv6g25phn7ncv25ygtky0najzqvjl0cay8fg95ry3ls5ny649';

export const getChainAssets = (chainName: string = defaultChainName) => {
  return assets.find((chain) => chain.chain_name === chainName) as AssetList;
};

export const getCoin = (chainName: string = defaultChainName) => {
  const chainAssets = getChainAssets(chainName);
  return chainAssets.assets[0] as Asset;
};

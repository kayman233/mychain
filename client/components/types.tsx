import { MouseEventHandler, ReactNode, RefObject } from 'react';
import { IconType } from 'react-icons';
import { CreateAccountType } from '../hooks/types';

export interface ChooseChainInfo {
  chainName: string;
  chainRoute?: string;
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}

export enum WalletStatus {
  NotInit = 'NotInit',
  Loading = 'Loading',
  Loaded = 'Loaded',
  NotExist = 'NotExist',
  Rejected = 'Rejected',
}

export enum TransactionResult {
  Success = 0,
  Failed = 1,
}

export interface ConnectWalletType {
  buttonText?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  icon?: IconType;
  onClickConnectBtn?: MouseEventHandler<HTMLButtonElement>;
}

export interface SendType {
  buttonText?: string;
  isDisabled?: boolean;
  contractAddress?: string;
  handleSend?: (amount: string | undefined, recipient: string | undefined) => Promise<void>;
  handleSendAA?: (amount: string | undefined, recipient: string | undefined) => Promise<void>;
}

export interface CreateAAType {
  buttonText?: string;
  isDisabled?: boolean;
  handleCreate?: (params: CreateAccountType) => Promise<void>;
}

export interface RecoverAAType {
  buttonText?: string;
  isDisabled?: boolean;
  handleRecover?: (newPubkey: string | undefined) => Promise<void>;
  handleRevoke?: () => Promise<void>;
  voted?: boolean;
}

export interface ConnectedUserCardType {
  walletIcon?: string;
  username?: string;
  icon?: ReactNode;
}

export interface ConnectedUserBalanceType {
  balance?: string;
}

export interface FeatureProps {
  title: string;
  text: string;
  href: string;
}

export interface ChainCardProps {
  prettyName: string;
  icon?: string;
}

export type CopyAddressType = {
  address?: string;
  walletIcon?: string;
  isLoading?: boolean;
  maxDisplayLength?: number;
  isRound?: boolean;
  size?: string;
};

export interface OptionBase {
  variant?: string;
  colorScheme?: string;
  isFixed?: boolean;
  isDisabled?: boolean;
}

export interface ChainOption extends OptionBase {
  isDisabled?: boolean;
  label: string;
  value: string;
  icon?: string;
  chainName: string;
  chainRoute?: string;
}

export type handleSelectChainDropdown = (value: ChainOption | null) => void;

export interface ChangeChainDropdownType {
  data: ChainOption[];
  selectedItem?: ChainOption;
  onChange: handleSelectChainDropdown;
  chainDropdownLoading?: boolean;
}

export interface ChangeChainMenuType {
  data: ChainOption[];
  value?: ChainOption;
  onClose?: () => void;
  onChange: handleSelectChainDropdown;
  innerRef?: RefObject<HTMLInputElement>;
}

export interface MyValidator {
  details: string | undefined;
  name: string | undefined;
  address: string;
  staked: number;
  reward: number;
  identity: string | undefined;
  commission: string | undefined;
}

export type ImageSource = {
  imageSource: 'cosmostation' | 'keybase';
};

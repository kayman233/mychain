import { WalletStatus } from '@cosmos-kit/core';
import { FaCheckCircle } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import React, { ReactNode, useEffect, useState } from 'react';

import { CopyAddressType } from '../types';

const SIZES = {
  lg: {
    height: '48px',
    walletImageSize: '28px',
    icon: '20px',
    fontSize: '16px',
  },
  md: {
    height: '40px',
    walletImageSize: '24px',
    icon: '16px',
    fontSize: '14px',
  },
  sm: {
    height: '28px',
    walletImageSize: '20px',
    icon: '14px',
    fontSize: '14px',
  },
};

export function stringTruncateFromCenter(str: string, maxLength: number) {
  const midChar = '…'; // character to insert into the center of the result

  if (str.length <= maxLength) return str;

  // length of beginning part
  const left = Math.ceil(maxLength / 2);

  // start index of ending part
  const right = str.length - Math.floor(maxLength / 2) + 1;

  return str.substring(0, left) + midChar + str.substring(right);
}

export function handleChangeColorModeValue(colorMode: string, light: string, dark: string) {
  if (colorMode === 'light') return light;
  if (colorMode === 'dark') return dark;
}

export const ConnectedShowAddress = ({
  address,
  walletIcon,
  isLoading,
  isRound,
  size = 'md',
  maxDisplayLength,
}: CopyAddressType) => {
  const [hasCopied, setHasCopied] = useState(false);
  const [displayAddress, setDisplayAddress] = useState('');
  const defaultMaxLength = {
    lg: 14,
    md: 16,
    sm: 18,
  };

  const onCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!address) setDisplayAddress('address not identified yet');
    if (address && maxDisplayLength)
      setDisplayAddress(stringTruncateFromCenter(address, maxDisplayLength));
    if (address && !maxDisplayLength)
      setDisplayAddress(
        stringTruncateFromCenter(address, defaultMaxLength[size as keyof typeof defaultMaxLength])
      );
  }, [address, defaultMaxLength, maxDisplayLength, size]);

  return (
    <button
      title={address}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: isRound ? '9999px' : '8px',
        border: '1px solid #E2E8F0',
        width: '100%',
        height: SIZES[size as keyof typeof SIZES].height,
        minHeight: 'fit-content',
        paddingLeft: '8px',
        paddingRight: '8px',
        color: '#4A5568',
        transition: 'all .3s ease-in-out',
        opacity: !address ? 0.6 : 1,
        cursor: !address ? 'not-allowed' : 'pointer',
        backgroundColor: 'transparent',
      }}
      disabled={!address || isLoading}
      onClick={onCopy}
    >
      {address && walletIcon && (
        <div
          style={{
            borderRadius: '50%',
            width: SIZES[size as keyof typeof SIZES].walletImageSize,
            height: SIZES[size as keyof typeof SIZES].walletImageSize,
            marginRight: '8px',
            opacity: 0.85,
          }}
        >
          <img alt={displayAddress} src={walletIcon} style={{ width: '100%', height: '100%' }} />
        </div>
      )}
      <div
        style={{
          fontSize: SIZES[size as keyof typeof SIZES].fontSize,
          fontWeight: 'normal',
          letterSpacing: '0.4px',
          opacity: 0.75,
        }}
      >
        {isLoading ? 'Loading...' : displayAddress}
      </div>
      {address && (
        <div
          style={{
            width: SIZES[size as keyof typeof SIZES].icon,
            height: SIZES[size as keyof typeof SIZES].icon,
            marginLeft: '8px',
            opacity: 0.9,
            color: hasCopied ? '#48BB78' : '#718096',
          }}
        >
          {hasCopied ? <FaCheckCircle /> : <FiCopy />}
        </div>
      )}
    </button>
  );
};

export const CopyAddressBtn = ({
  walletStatus,
  connected,
}: {
  walletStatus: WalletStatus;
  connected: ReactNode;
}) => {
  switch (walletStatus) {
    case WalletStatus.Connected:
      return <>{connected}</>;
    default:
      return <></>;
  }
};

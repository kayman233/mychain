import React from 'react';
import { ConnectedUserBalanceType } from '../types';

export const ConnectedUserBalanceInfo = ({ balance }: ConnectedUserBalanceType) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
    {balance && (
      <>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#718096' }}>Balance</div>
          <div style={{ fontSize: '20px', fontWeight: '600' }}>{balance}stake</div>
        </div>
      </>
    )}
  </div>
);

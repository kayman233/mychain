import React from 'react';
import { ConnectedUserCardType } from '../types';

export const ConnectedUserInfo = ({ username, icon }: ConnectedUserCardType) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
    {username && (
      <>
        {icon && (
          <div
            style={{
              minWidth: '80px',
              maxWidth: '80px',
              width: '80px',
              minHeight: '80px',
              maxHeight: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            {icon}
          </div>
        )}
        <div style={{ fontSize: '20px', fontWeight: '600' }}>{username}</div>
      </>
    )}
  </div>
);

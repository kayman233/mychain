import { ChainCardProps } from '../types';

export const ChainCard = (props: ChainCardProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      overflow: 'hidden',
      wordBreak: 'break-word',
      color: '#2D3748',
      width: '100%',
    }}
  >
    <div
      style={{
        minWidth: '40px',
        minHeight: '40px',
        maxWidth: '40px',
        maxHeight: '40px',
        width: '100%',
        height: '100%',
        border: '1px solid #E2E8F0',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <img
        alt=""
        src={props.icon}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={e => {
          e.currentTarget.src = 'https://dummyimage.com/150/9e9e9e/ffffff&text=☒';
        }}
      />
    </div>
    <div style={{ fontSize: '20px', fontWeight: '600', paddingRight: '18px' }}>
      {props.prettyName}
    </div>
  </div>
);

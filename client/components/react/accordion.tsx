import { AccountInfoType } from '../../hooks/types';
import { ConnectedShowAddress } from './address-card';
import { useState } from 'react';

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const AccordionItem = ({ title, children, defaultOpen = false }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ marginBottom: '8px', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
      <h2>
        <button
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
          <span style={{ marginLeft: '8px' }}>{isOpen ? '▲' : '▼'}</span>
        </button>
      </h2>
      {isOpen && <div style={{ padding: '16px', borderTop: '1px solid #E2E8F0' }}>{children}</div>}
    </div>
  );
};

export const InfoAccordion = ({ info }: { info: AccountInfoType }) => {
  const votes = info?.counts?.map(count => ({
    voters: info.votes?.filter(vote => vote.vote === count.pubkey),
    count: count.votes,
    pubkey: count.pubkey,
  }));

  return (
    <div style={{ width: '100%' }}>
      <AccordionItem title="Owner's public key" defaultOpen={true}>
        <ConnectedShowAddress
          size="sm"
          address={info.pubkey}
          isLoading={false}
          maxDisplayLength={8}
        />
      </AccordionItem>
      <AccordionItem title="Guardians">
        <ol style={{ paddingLeft: '20px' }}>
          {info.guardians?.guardians.map(guardian => (
            <li key={`${guardian}List`} style={{ marginBottom: '4px' }}>
              <ConnectedShowAddress size="sm" address={guardian} isLoading={false} />
            </li>
          ))}
        </ol>
      </AccordionItem>
      <AccordionItem title="Votes">
        {!votes || votes?.length === 0 ? (
          <>No votes</>
        ) : (
          <ol style={{ paddingLeft: '20px' }}>
            {votes?.map(vote => (
              <li key={vote.pubkey} style={{ alignItems: 'center' }}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    width: '100%',
                    marginBottom: '4px',
                  }}
                >
                  New pubkey:
                </div>
                <ConnectedShowAddress
                  size="sm"
                  address={vote.pubkey}
                  isLoading={false}
                  maxDisplayLength={8}
                />
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    width: '100%',
                    marginBottom: '4px',
                    marginTop: '8px',
                  }}
                >
                  Voters ({vote.count} / {info.threshold}):
                </div>
                <ul style={{ paddingLeft: '20px' }}>
                  {vote.voters?.map(voter => (
                    <li key={voter.addr} style={{ marginBottom: '4px' }}>
                      <ConnectedShowAddress size="sm" address={voter.addr} isLoading={false} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        )}
      </AccordionItem>
    </div>
  );
};

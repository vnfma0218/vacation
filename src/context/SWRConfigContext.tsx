'use client';
import { FC } from 'react';
import { SWRConfig } from 'swr';

interface SWRConfigContextProps {
  children: React.ReactNode;
}

const SWRConfigContext: FC<SWRConfigContextProps> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRConfigContext;

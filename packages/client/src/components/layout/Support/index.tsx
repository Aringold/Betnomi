import React, { useState } from 'react';
import { IntercomProvider } from 'react-use-intercom';

export const SupportContext = React.createContext(false);
interface Props {
  children: React.ReactNode,
}

const SupportProvider: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onHide = () => setIsOpen(false);
  const onShow = () => setIsOpen(true);

  return (
    <IntercomProvider
      appId="hnehx4bb"
      autoBoot
      autoBootProps={{ hideDefaultLauncher: true }}
      onHide={onHide}
      onShow={onShow}
    >
      <SupportContext.Provider value={isOpen}>
        {children}
      </SupportContext.Provider>
    </IntercomProvider>
  );
};

export default SupportProvider;

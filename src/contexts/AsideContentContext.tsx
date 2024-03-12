// AsideContentContext.tsx
// Updates what is within the Aside content in the AppShell

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AsideContentContextType {
  asideContent: ReactNode;
  setAsideContent: (content: ReactNode) => void;
}

const AsideContentContext = createContext<AsideContentContextType | undefined>(undefined);

export const AsideContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [asideContent, setAsideContent] = useState<ReactNode>(null);

  return (
    <AsideContentContext.Provider value={{ asideContent, setAsideContent }}>
      {children}
    </AsideContentContext.Provider>
  );
};

export const useAsideContent = () => {
  const context = useContext(AsideContentContext);
  if (!context) {
    throw new Error('useAsideContent must be used within an AsideContentProvider');
  }
  return context;
};

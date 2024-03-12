// Contexts for the NBT and JSON data

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

// Local interfaces
import { SchematicJSON } from '@/interfaces/SchematicJSON';
import { SchematicNBT } from '@/interfaces/SchematicNBT';

interface DataContextType {
  jsonData: SchematicJSON | null;
  setJsonData: Dispatch<SetStateAction<SchematicJSON | null>>;
  nbtData: SchematicNBT | null;
  setNbtData: Dispatch<SetStateAction<SchematicNBT | null>>;
}

// Create a context with a default value
const DataContext = createContext<DataContextType>({
  jsonData: null,
  setJsonData: () => {},
  nbtData: null,
  setNbtData: () => {},
});

// Data provider props
interface DataProviderProps {
  children: ReactNode;
}

// Create a provider
export const DataProvider = ({ children }: DataProviderProps) => {
  const [jsonData, setJsonData] = useState<SchematicJSON | null>(null);
  const [nbtData, setNbtData] = useState<SchematicNBT | null>(null);

  return (
    <DataContext.Provider value={{ jsonData, setJsonData, nbtData, setNbtData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

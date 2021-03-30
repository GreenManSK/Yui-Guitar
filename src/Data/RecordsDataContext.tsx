import React from 'react';
import { getFromStorage, putToStorage } from './StorageHelpers';

type SetterType<DatType> = (data: DatType) => void;

interface IRecordsDataContext {
  getChords: (setter: SetterType<string[]>) => void;
  setChords: (data: string[]) => void;
  getRecords: (a: string, b: string, setter: SetterType<number[]>) => void;
  setRecords: (a: string, b: string, data: number[]) => void;
}

export const RecordsDataContext = React.createContext<IRecordsDataContext>({
  getChords: () => null,
  setChords: () => null,
  getRecords: () => null,
  setRecords: () => null,
});

const getRecordsKey = (a: string, b: string) => {
  const chordsKey = [a, b].sort().join(',');
  return `${RECORDS_KEY}[${chordsKey}]`;
};

const RECORDS_KEY = 'recordLists';
const CHORDS_KEY = 'chords';

const defaultChords = ['A', 'D', 'E', 'Am', 'C'];

export const RecordsDataProvider: React.FunctionComponent = ({ children }) => {
  const value = React.useMemo(
    () => ({
      getChords: (setter: SetterType<string[]>) =>
        getFromStorage(CHORDS_KEY, setter, defaultChords),
      setChords: (data: string[]) => putToStorage(CHORDS_KEY, data),
      getRecords: (a: string, b: string, setter: SetterType<number[]>) =>
        getFromStorage(getRecordsKey(a, b), setter, []),
      setRecords: (a: string, b: string, data: number[]) =>
        putToStorage(getRecordsKey(a, b), data),
    }),
    []
  );
  return (
    <RecordsDataContext.Provider value={value}>
      {children}
    </RecordsDataContext.Provider>
  );
};

export const useRecordsDataContext = () => React.useContext(RecordsDataContext);

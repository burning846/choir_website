import { createContext } from 'react';
import { Doc } from '@/lib/types';

export type DocContextValue = {
  doc: Doc | null;
  loading: boolean;
  error: string | null;
};

export const DocContext = createContext<DocContextValue>({ doc: null, loading: false, error: null });

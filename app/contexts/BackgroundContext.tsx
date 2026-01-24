'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface BackgroundState {
  isServiceVisible: boolean;
  isCollectifVisible: boolean;
  isProjetsVisible: boolean;
}

interface BackgroundContextType {
  backgroundState: BackgroundState;
  setBackgroundState: (state: Partial<BackgroundState>) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [backgroundState, setBackgroundStateInternal] = useState<BackgroundState>({
    isServiceVisible: false,
    isCollectifVisible: false,
    isProjetsVisible: false,
  });

  const setBackgroundState = useCallback((state: Partial<BackgroundState>) => {
    setBackgroundStateInternal(prev => ({ ...prev, ...state }));
  }, []);

  return (
    <BackgroundContext.Provider value={{ backgroundState, setBackgroundState }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}

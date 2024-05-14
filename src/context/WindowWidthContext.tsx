import { createContext, useState, useEffect } from 'react';
import React from 'react';

interface ContextType {
  windowWidth: number;
}

export const WindowWidthContext = createContext<ContextType>({
  windowWidth: window.innerWidth,
});

type Props = {
  children: React.ReactNode;
};

export const WindowWidthContextProvider: React.FC<Props> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider
      value={{
        windowWidth,
      }}
    >
      {children}
    </WindowWidthContext.Provider>
  );
};

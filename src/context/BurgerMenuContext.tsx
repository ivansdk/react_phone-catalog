import React, { createContext, useState } from 'react';

interface ContextType {
  activeBurgerMenu: boolean;
  setActiveBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BurgerMenuContext = createContext<ContextType>({
  activeBurgerMenu: false,
  setActiveBurgerMenu: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const BurgerMenuContextProvider: React.FC<Props> = ({ children }) => {
  const [activeBurgerMenu, setActiveBurgerMenu] = useState(false);

  return (
    <BurgerMenuContext.Provider
      value={{
        activeBurgerMenu,
        setActiveBurgerMenu,
      }}
    >
      {children}
    </BurgerMenuContext.Provider>
  );
};

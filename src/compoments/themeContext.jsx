import { createContext, useState } from "react";
const ThemeContext = createContext();
const ThemeContextProvider = ({ children }) => {
  const [isLight, setIsLight] = useState(true);

  const ChangeTheme = () => {
    setIsLight(!isLight);
  };

  return (
    <ThemeContext.Provider
      value={{
        isLight,
        ChangeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeContextProvider };

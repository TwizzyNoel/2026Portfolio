import React, { createContext, useState, useContext } from "react";
import { customLightTheme, customDarkTheme } from "./themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? customDarkTheme : customLightTheme;

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        colors: theme.colors,
        fonts: theme.fonts,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);

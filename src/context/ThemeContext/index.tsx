import { createContext, useState } from "react";

interface ThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContext>({
  theme: "light",
  setTheme: (theme: string) => {},
});

const ThemeProvider = (props: any) => {
  const { children } = props;
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };

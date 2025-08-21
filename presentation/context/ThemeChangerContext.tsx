import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "nativewind";

interface ThemeChangerContextType {
  backgroundColor?: string;
  currentTheme: "light" | "dark";
  isSystemTheme: boolean;
  toggleTheme: () => void;
  setSystemTheme: () => void;
}

const ThemeChangerContext = createContext({} as ThemeChangerContextType);

export const useThemeChangerContext = () => {
  const themeChanger = useContext(ThemeChangerContext);
  return themeChanger;
};

export const ThemeChangerProvider = ({ children }: PropsWithChildren) => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [isSystemThemeEnabled, SetIsSystemThemeEnabled] = useState(true);

  const currentTheme = isSystemThemeEnabled
    ? colorScheme
    : isDarkMode
      ? "dark"
      : "light";

  const backgroundColor = isDarkMode
    ? Colors.dark.background
    : Colors.light.background;

  useEffect(() => {
    AsyncStorage.getItem("selected-theme").then((theme) => {
      if (!theme) return;

      setIsDarkMode(theme === "dark");
      SetIsSystemThemeEnabled(theme === "system");
      setColorScheme(theme as "light" | "dark" | "system");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemeChangerContext
        value={{
          backgroundColor: backgroundColor,
          currentTheme: currentTheme ?? "light",
          isSystemTheme: isSystemThemeEnabled,
          toggleTheme: async () => {
            setIsDarkMode(!isDarkMode);
            setColorScheme(isDarkMode ? "light" : "dark");
            SetIsSystemThemeEnabled(false);
            await AsyncStorage.setItem(
              "selected-theme",
              isDarkMode ? "light" : "dark"
            );
          },
          setSystemTheme: async () => {
            SetIsSystemThemeEnabled(true);
            setColorScheme("system");
            await AsyncStorage.setItem("selected-theme", "system");
          },
        }}
      >
        {children}
      </ThemeChangerContext>
    </ThemeProvider>
  );
};

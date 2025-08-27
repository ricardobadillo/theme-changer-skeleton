import { memo, useCallback, useEffect, useMemo, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance, View, ViewProps } from "react-native";

import { StatusBar } from "expo-status-bar";

import { ThemesVariants, themes, themesVariables } from ".";
import { SystemThemesVariants, ThemeContext, ThemesVariables } from "./context";

type ThemeProps = ViewProps;

const ThemeProvider = ({ children, className, ...props }: ThemeProps) => {
  const colorScheme = Appearance.getColorScheme();
  const userPreferedTheme = colorScheme === "light" ? "light" : "dark";

  const [theme, setTheme] = useState<ThemesVariants | null>(null);
  const [systemEnabled, setSystemEnabled] = useState<boolean>(true);
  const [systemTheme, setSystemTheme] =
    useState<SystemThemesVariants>(userPreferedTheme);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(
    useCallback(() => {
      (async () => {
        const storedTheme = await AsyncStorage.getItem("app-theme");

        if (storedTheme !== null && storedTheme !== "system") {
          setTheme(storedTheme as ThemesVariants);
          setSystemEnabled(false);
        } else {
          if (storedTheme === "system" || storedTheme === null) {
            try {
              await AsyncStorage.setItem("app-theme", "system");
              setTheme(userPreferedTheme);
              setSystemEnabled(true);
            } catch (e) {
              console.error("Error:", e);
            }
          } else {
            setSystemEnabled(false);
          }
        }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
    []
  );

  const contextValue = useMemo(
    () => ({ theme, systemEnabled, systemTheme }),
    [theme, systemEnabled, systemTheme]
  );

  Appearance.addChangeListener((listener) => {
    (async () => {
      const storedTheme = await AsyncStorage.getItem("app-theme");
      if (storedTheme !== null && storedTheme !== "system") return;

      if (systemEnabled && storedTheme === "system") {
        setTheme(listener.colorScheme!);
      }
    })();
  });

  const getThemeColorByVariable = useCallback(
    (colorKey: ThemesVariables) => {
      const selectedTheme = theme === "system" ? systemTheme : theme;
      return `hsl(${(themesVariables[selectedTheme!] as Record<string, string>)[`--${colorKey}`]})`;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const handleThemeSwitch = useCallback(
    async (newTheme: ThemesVariants) => {
      if (newTheme === "system") {
        setSystemEnabled(true);
        setTheme(Appearance.getColorScheme() === "light" ? "light" : "dark");
        setSystemTheme(
          Appearance.getColorScheme() === "light" ? "light" : "dark"
        );
        await AsyncStorage.setItem("app-theme", "system");
      } else {
        setSystemEnabled(false);
        setTheme(newTheme);
        await AsyncStorage.setItem("app-theme", newTheme);
      }
    },
    [setSystemEnabled, setTheme, setSystemTheme]
  );

  return theme ? (
    <View
      style={themes[theme as "dark" | "light" | "deep-ocean"]}
      className="flex-1"
      {...props}
    >
      <StatusBar
        backgroundColor={getThemeColorByVariable("background")}
        style={theme === "light" ? "dark" : "light"}
      />
      <ThemeContext.Provider
        value={{
          systemEnabled: contextValue.systemEnabled,
          systemTheme: contextValue.systemTheme,
          theme: contextValue.theme!,
          getThemeColorByVariable,
          handleThemeSwitch,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </View>
  ) : (
    <></>
  );
};

export const ContainerTheme = memo(ThemeProvider);

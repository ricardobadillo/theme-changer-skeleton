import { useState } from "react";

import { router } from "expo-router";

import { useThemeChangerContext } from "@/presentation/context/ThemeChangerContext";
import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedCard from "@/presentation/shared/ThemedCard";
import ThemedSwitch from "@/presentation/shared/ThemedSwitch";
import ThemedView from "@/presentation/shared/ThemedView";

const ThemesScreen = () => {
  const { currentTheme, isSystemTheme, setSystemTheme, toggleTheme } =
    useThemeChangerContext();
  const [darkModeSettings, setDarkModeSettings] = useState({
    darkMode: currentTheme === "dark",
    systemMode: isSystemTheme,
  });

  const setDarkMode = (value: boolean) => {
    toggleTheme();

    setDarkModeSettings({
      darkMode: value,
      systemMode: false,
    });
  };

  const setSystemMode = (value: boolean) => {
    if (value) {
      setSystemTheme();
    }

    setDarkModeSettings({
      darkMode: darkModeSettings.darkMode,
      systemMode: value,
    });
  };

  return (
    <ThemedView className="gap-y-4 p-4">
      <ThemedCard className="mt-4">
        <ThemedSwitch
          value={darkModeSettings.darkMode}
          text="Dark text"
          onValueChange={setDarkMode}
        />
      </ThemedCard>

      <ThemedCard>
        <ThemedSwitch
          value={darkModeSettings.systemMode}
          text="System mode"
          onValueChange={setSystemMode}
        />
      </ThemedCard>

      <ThemedCard>
        <ThemedButton onPress={() => router.back()}>
          Volver a página inicial
        </ThemedButton>
      </ThemedCard>
    </ThemedView>
  );
};
export default ThemesScreen;

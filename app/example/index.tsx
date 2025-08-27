import { router } from "expo-router";

import { useTheme } from "@/presentation/themes/context";

import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedText from "@/presentation/shared/ThemedText";
import ThemedView from "@/presentation/shared/ThemedView";

export default function ThemesScreen() {
  const { theme, handleThemeSwitch, systemEnabled } = useTheme();

  return (
    <ThemedView className="bg-background flex-1 gap-y-8 items-center justify-center">
      <ThemedText className="px-4 text-center text-primary" type="h1">
        Multiple Themes with Expo and Nativewind v4
      </ThemedText>

      <ThemedText className="px-4 text-secondary" type="h2">
        This is a secondary text
      </ThemedText>

      <ThemedText
        className="bg-accent p-4 rounded text-accent-foreground"
        type="normal"
      >
        This is a accent background
      </ThemedText>

      <ThemedText className="text-muted" type="semi-bold">
        This is muted
      </ThemedText>

      <ThemedView className="flex flex-row gap-x-2">
        <ThemedButton
          onPress={() => handleThemeSwitch("system")}
          className={`border-input duration-300 p-2 rounded-xl transition-colors ${systemEnabled ? "bg-primary" : ""}`}
          textClassName="text-xl"
        >
          System
        </ThemedButton>

        <ThemedButton
          onPress={() => handleThemeSwitch("light")}
          className={`border-input duration-300 p-2 rounded-xl transition-colors ${theme === "light" && !systemEnabled ? "bg-primary" : ""}`}
          textClassName="text-xl"
        >
          Light
        </ThemedButton>

        <ThemedButton
          onPress={() => handleThemeSwitch("dark")}
          className={`border-input duration-300 p-2 rounded-xl transition-colors ${theme === "dark" && !systemEnabled ? "bg-primary" : ""}`}
          textClassName="text-xl"
        >
          Dark
        </ThemedButton>

        <ThemedButton
          onPress={() => handleThemeSwitch("deep-ocean")}
          className={`border-input duration-300 p-2 rounded-xl transition-colors ${theme === "deep-ocean" && !systemEnabled ? "bg-primary" : ""}`}
          textClassName="text-xl"
        >
          Deep Ocean
        </ThemedButton>
      </ThemedView>

      <ThemedView>
        <ThemedButton
          className="px-4 py-2 rounded-xl"
          textClassName="text-xl"
          onPress={() => router.dismiss()}
        >
          Ir a página inicial
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  );
}

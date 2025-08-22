import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useColorScheme } from "nativewind";

import { ThemeChangerProvider } from "@/presentation/context/ThemeChangerContext";

import { themes } from "@/presentation/utils/color-theme";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    SplashScreen.hideAsync();
    return null;
  }

  return (
    <GestureHandlerRootView
      style={{
        backgroundColor: themes[colorScheme ?? "dark"]["--background"],
        flex: 1,
      }}
    >
      <ThemeChangerProvider>
        <Stack screenOptions={{}}>
          <Stack.Screen
            name="index"
            options={{
              title: "Theme Changer Skeleton",
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="themes/index"
            options={{
              title: "Theme Changer Skeleton",
            }}
          ></Stack.Screen>
        </Stack>
      </ThemeChangerProvider>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

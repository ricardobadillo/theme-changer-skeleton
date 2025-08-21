import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeChangerProvider } from "@/presentation/context/ThemeChangerContext";

import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const backgroundColor = useThemeColor({}, "background");

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
        backgroundColor: backgroundColor,
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

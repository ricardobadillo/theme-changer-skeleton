import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

import { ContainerTheme } from "@/presentation/themes/provider";

import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    KanitThin: require("../assets/fonts/Kanit-Thin.ttf"),
    KanitRegular: require("../assets/fonts/Kanit-Regular.ttf"),
    KanitBold: require("../assets/fonts/Kanit-Bold.ttf"),
  });

  if (!loaded) {
    SplashScreen.hideAsync();
    return null;
  }

  return (
    <GestureHandlerRootView
      style={{
        backgroundColor: "transparent",
        flex: 1,
      }}
    >
      <ContainerTheme>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: "transparent" },
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="home/index"
            options={{
              title: "Theme Changer Skeleton",
            }}
          ></Stack.Screen>

          <Stack.Screen
            name="example/index"
            options={{
              title: "Theme Changer Skeleton",
            }}
          ></Stack.Screen>
        </Stack>
      </ContainerTheme>
    </GestureHandlerRootView>
  );
}

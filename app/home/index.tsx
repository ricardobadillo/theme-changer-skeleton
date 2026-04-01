import { router } from "expo-router";

import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedView from "@/presentation/shared/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView className="flex flex-1 items-center justify-center">
      <ThemedButton
        className="px-4 py-2 rounded-xl"
        textClassName="text-xl"
        onPress={() => router.navigate("/example")}
      >
        Cambiar de tema
      </ThemedButton>
    </ThemedView>
  );
}

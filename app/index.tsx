import { router } from "expo-router";

import ThemedButton from "@/presentation/shared/ThemedButton";
import ThemedView from "@/presentation/shared/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView className="p-8">
      <ThemedButton className="mt-8" onPress={() => router.push("/themes")}>
        Cambiar de tema
      </ThemedButton>
    </ThemedView>
  );
}

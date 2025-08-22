import { Platform, Pressable, Switch, View } from "react-native";

import { useColorScheme } from "nativewind";

import { themes } from "../utils/color-theme";

import ThemedText from "./ThemedText";

interface Props {
  className?: string;
  text?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const isAndroid = Platform.OS === "android";

export default function ThemedSwitch({
  className,
  text,
  value,
  onValueChange,
}: Props) {
  const { colorScheme } = useColorScheme();

  const switchActiveColor = themes[colorScheme!]["--background"];

  return (
    <Pressable
      className={`flex flex-row items-center justify-between mx-2 active:opacity-80 ${className}`}
      onPress={() => onValueChange(!value)}
    >
      {text ? (
        <ThemedText
          style={{
            color: themes[colorScheme!]["--primary"],
          }}
          type="h2"
        >
          {text}
        </ThemedText>
      ) : (
        <View />
      )}
      <Switch
        onValueChange={onValueChange}
        thumbColor={isAndroid ? switchActiveColor : ""}
        trackColor={{
          false: "grey",
          true: switchActiveColor,
        }}
        value={value}
      />
    </Pressable>
  );
}

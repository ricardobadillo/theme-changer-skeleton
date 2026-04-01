import { Pressable, PressableProps, Text } from "react-native";

interface Props extends PressableProps {
  className?: string;
  children: string;
  textClassName?: string;
}

export default function ThemedButton({
  className,
  children,
  textClassName,
  ...rest
}: Props) {
  return (
    <Pressable className={`bg-primary active:bg-accent ${className}`} {...rest}>
      <Text className={`text-fontButton ${textClassName}`}>{children}</Text>
    </Pressable>
  );
}

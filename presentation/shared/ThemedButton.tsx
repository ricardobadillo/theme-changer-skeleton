import { Pressable, PressableProps, Text } from "react-native";

interface Props extends PressableProps {
  className?: string;
  children: string;
}

export default function ThemedButton({ className, children, ...rest }: Props) {
  return (
    <Pressable
      className={`bg-light-primary dark:bg-dark-primary items-center px-6 py-2 rounded-xl active:opacity-80 ${className}`}
      {...rest}
    >
      <Text className="color-white text-2xl">{children}</Text>
    </Pressable>
  );
}

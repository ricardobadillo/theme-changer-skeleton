import { View, ViewProps } from "react-native";

interface Props extends ViewProps {
  className?: string;
}

export default function ThemedCard({ className, children }: Props) {
  return (
    <View
      className={`bg-white dark:bg-black/10 p-2 rounded-xl shadow-black/5 ${className}`}
    >
      {children}
    </View>
  );
}

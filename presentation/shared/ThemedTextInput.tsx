import { TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
  className?: string;
}
export default function ThemedTextInput({ className, ...rest }: Props) {
  return (
    <TextInput
      className="px-2 py-4 text-black dark:text-white"
      placeholderTextColor="grey"
      {...rest}
    />
  );
}

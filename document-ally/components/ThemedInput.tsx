import { Text, type TextProps, StyleSheet, TextInput } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedInputProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  onChange?: React.Dispatch<React.SetStateAction<string>>;
  secureTextEntry?: boolean;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  type = 'default',
  onChange = undefined,
  secureTextEntry = false,
  ...rest
}: ThemedInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TextInput
      onChangeText={onChange}
      secureTextEntry={secureTextEntry}
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
        styles.container,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  container: {
    backgroundColor: '#eee',
    minWidth: 100,
  },
});

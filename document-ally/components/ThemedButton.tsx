import { type TextProps, Pressable, StyleSheet, Text } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  title?: string;
  disabled?: boolean;
  onTap?: () => void;
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  type = 'default',
  title = 'Button',
  disabled = false,
  onTap = () => null,
  ...rest
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return (
    <Pressable
      onPress={disabled ? () => undefined : onTap}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[
        styles.container,
        style,
        { backgroundColor: disabled ? '#eee' : backgroundColor },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    minWidth: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  text: {
    color: 'white',
  },
});

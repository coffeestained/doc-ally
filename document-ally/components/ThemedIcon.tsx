import { type TextProps, Pressable, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export type ThemedIconProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  title?: string;
  icon?: IconDefinition;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

export function ThemedIcon({
  style,
  lightColor,
  darkColor,
  icon = faBell,
  disabled = false,
  onPress = () => null,
  onLongPress = () => null,
  ...rest
}: ThemedIconProps) {
  const theme = useColorScheme() ?? 'light';

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.container, style]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <FontAwesomeIcon
        color={theme === 'light' ? lightColor : darkColor}
        icon={icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  text: {
    color: 'white',
  },
});

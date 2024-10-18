import { ThemedView } from '@/components/ThemedView';
import Documentally from '@/assets/images/documentally.svg';

export function SplashProps({ ...otherProps }) {
  return (
    <ThemedView {...otherProps}>
      <Documentally />
    </ThemedView>
  );
}

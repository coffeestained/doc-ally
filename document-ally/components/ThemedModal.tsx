import {
  Alert,
  Modal,
  StyleSheet,
  Pressable,
  type ViewProps,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { ThemedButton } from './ThemedButton';
import { ThemedIcon } from './ThemedIcon';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export type ThemedModalProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export function ThemedModal({
  style,
  lightColor,
  darkColor,
  isVisible,
  setIsVisible,
  onSubmit = () => setIsVisible(false),
  ...otherProps
}: ThemedModalProps) {
  const theme = useColorScheme() ?? 'light';

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setIsVisible(!isVisible);
      }}
    >
      <ThemedView style={styles.centeredView}>
        <ThemedView style={styles.content} {...otherProps} />
        <ThemedView style={styles.modalToolbar}>
          <ThemedIcon icon={faTimes} onPress={() => setIsVisible(false)} />
          <ThemedIcon icon={faCheck} onPress={onSubmit} />
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalToolbar: {
    margin: 15,
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    backgroundColor: 'white',
    padding: 5,
    alignItems: 'center',
  },
});

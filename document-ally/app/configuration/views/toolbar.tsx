import { ThemedView } from '@/components/ThemedView';
import { useConfigurationContext } from '../contexts/ConfigurationContext';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { ThemedIcon } from '@/components/ThemedIcon';
import { useCallback, useEffect, useState } from 'react';
import { ThemedModal } from '@/components/ThemedModal';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';

export default function Toolbar({}) {
  const configuration = useConfigurationContext();
  const theme = useColorScheme() ?? 'light';

  const [validationStaging, setValidationStaging] = useState('');
  const [resetVisible, setResetVisible] = useState(false);
  const [authenticateVisible, setAuthenticateVisible] = useState(false);

  useEffect(() => {
    configuration.validatePassword(validationStaging).then((isValid) => {
      if (isValid) setValidationStaging('');
    });
  }, [validationStaging]);

  const onPressLock = useCallback(async () => {
    if (configuration.applicationSecurity?.isAuthenticated)
      await configuration.logOut();
    else setAuthenticateVisible(true);
  }, [configuration.applicationSecurity]);

  const onLongPressLock = useCallback(() => {
    setResetVisible(true);
  }, []);

  return (
    <ThemedView
      style={{
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: Colors.themeColor,
        paddingVertical: 2.5,
        paddingHorizontal: 5,
      }}
    >
      {configuration.applicationSecurity?.password ? (
        <>
          <ThemedIcon
            onPress={onPressLock}
            onLongPress={onLongPressLock}
            icon={
              configuration.applicationSecurity?.isAuthenticated
                ? faUnlock
                : faLock
            }
            lightColor="#fff"
            darkColor="#fff"
          />
        </>
      ) : null}

      {/* Reset Modal */}
      <ThemedModal
        setIsVisible={setResetVisible}
        isVisible={resetVisible}
        onSubmit={() => {
          configuration.resetApplication();
          setResetVisible(false);
        }}
      >
        <ThemedView style={{ flexDirection: 'row', width: '50%' }}>
          <ThemedText
            style={{
              fontSize: 10,
              width: 20,
              fontStyle: 'italic',
            }}
          >
            -
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 10,
              flex: 1,
              fontStyle: 'italic',
            }}
          >
            You are resetting your instance.
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ flexDirection: 'row', width: '50%' }}>
          <ThemedText
            style={{
              fontSize: 10,
              width: 20,
              fontStyle: 'italic',
            }}
          >
            -
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 10,
              flex: 1,
              fontStyle: 'italic',
            }}
          >
            You will need to create a new password and reconfigure your remote
            storage.
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ flexDirection: 'row', width: '50%' }}>
          <ThemedText
            style={{
              fontSize: 10,
              width: 20,
              fontStyle: 'italic',
            }}
          >
            -
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 10,
              flex: 1,
              fontStyle: 'italic',
            }}
          >
            You can import your workflows from your remote storage once
            configured.
          </ThemedText>
        </ThemedView>
      </ThemedModal>

      {/* Authenticate Modal */}
      <ThemedModal
        setIsVisible={setAuthenticateVisible}
        isVisible={authenticateVisible}
        onSubmit={() => {
          setAuthenticateVisible(false);
        }}
      >
        <ThemedView style={{ flexDirection: 'row', width: '50%' }}>
          <ThemedText
            style={{
              fontSize: 10,
              flex: 1,
              fontStyle: 'italic',
            }}
          >
            Please authenticate.
          </ThemedText>
        </ThemedView>
        <ThemedView style={{ flexDirection: 'row', width: '50%' }}>
          <ThemedInput onChange={setValidationStaging} />
        </ThemedView>
      </ThemedModal>
    </ThemedView>
  );
}

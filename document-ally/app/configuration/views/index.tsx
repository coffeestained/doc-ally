import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useConfigurationContext } from '../contexts/ConfigurationContext';
import { Collapsible } from '@/components/Collapsible';
import { ThemedInput } from '@/components/ThemedInput';
import { HelloWave } from '@/components/HelloWave';
import { ThemedButton } from '@/components/ThemedButton';
import { useCallback, useEffect, useState } from 'react';

export default function Configuration({}) {
  const configuration = useConfigurationContext();

  const [isValid, setIsValid] = useState<boolean>(false);
  const [info, setInfo] = useState<string>('');
  const [passwordStaging, setPasswordStaging] = useState<string>('');

  useEffect(() => {
    const errors = [];

    if (passwordStaging.length < 8) {
      errors.push('eight characters');
    }

    if (!/[A-Z]/.test(passwordStaging)) {
      errors.push('one capital character(s)');
    }

    if (!/[a-z]/.test(passwordStaging)) {
      errors.push('one lowercase character(s)');
    }

    if (!/\d/.test(passwordStaging)) {
      errors.push('one numberic character(s)');
    }

    if (!/[@$!%*?&]/.test(passwordStaging)) {
      errors.push('one special character(s)');
    }

    let message = 'Invalid password. Password must contain ';
    if (errors.length) {
      message += errors.join(', ');
      message += '.';
      setInfo(message);
      setIsValid(false);
    } else {
      setInfo('');
      setIsValid(true);
    }
  }, [passwordStaging]);

  const submitPassword = useCallback(async () => {
    if (isValid) {
      await configuration.setPassword(passwordStaging);
      setPasswordStaging('');
    }
  }, [isValid, passwordStaging]);

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!configuration.applicationSecurity?.password ? (
        <>
          <ThemedView
            style={{
              flexDirection: 'row',
              width: '50%',
              gap: 20,
              marginLeft: -40,
              marginBottom: 20,
            }}
          >
            <HelloWave></HelloWave>
            <ThemedText>Welcome.</ThemedText>
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
              Please remember or store this password in a secure location.
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
              If you lose this password, there is no recovery workflow.
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
              In the case of a lost password, the documents will remain on the
              device or your remote storage location, but this application will
              need to be reconfigured.
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
              In the case of a lost password, the documents will remain on the
              device or your remote storage location, but this application will
              need to be reconfigured.
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
              Your password must be at least 8 characters long, contain one
              uppercase letter, one lowercase letter, one number, and one
              special character (@, $, !, %, *, ?, &).
            </ThemedText>
          </ThemedView>
          <ThemedView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50%',
              marginTop: 20,
            }}
          >
            <ThemedInput
              onChange={setPasswordStaging}
              secureTextEntry={true}
              style={{ flex: 1, height: 40 }}
            />
            <ThemedButton
              onTap={isValid ? submitPassword : undefined}
              disabled={!isValid}
              lightColor="#FF885B"
              style={{ height: 40 }}
              title="Submit"
            />
          </ThemedView>

          {passwordStaging.length > 0 ? (
            <ThemedText
              style={{
                fontSize: 9,
                marginTop: 10,
                color: '#FF885B',
                fontStyle: 'italic',
              }}
            >
              {info}
            </ThemedText>
          ) : null}
        </>
      ) : null}

      {configuration.applicationSecurity?.password &&
      configuration.applicationSecurity.isAuthenticated ? (
        <Collapsible title="Configuration">
          <ThemedInput />
        </Collapsible>
      ) : null}

      {configuration.applicationSecurity?.password &&
      !configuration.applicationSecurity.isAuthenticated ? (
        <>
          <ThemedText>Confidential. Please log in.</ThemedText>
          <ThemedInput />
        </>
      ) : null}
    </ThemedView>
  );
}

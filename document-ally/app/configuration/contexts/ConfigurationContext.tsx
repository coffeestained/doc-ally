import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import * as crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

const GENERIC_USER_CREDENTIAL = '4a9ffdcc8afd0932904e960d67a6252dfb0d5e30';

let enabled = false;

interface IRemoteStorageConfiguration {
  host: string;
  user: string;
  password: string;
}

interface IApplicationSecurityConfiguration {
  password?: string;
  isAuthenticated: boolean;
}

interface IConfigurationContext {
  applicationSecurity: IApplicationSecurityConfiguration | null;

  remoteStorage: IRemoteStorageConfiguration | null;
  setRemoteStorage: React.Dispatch<
    React.SetStateAction<IRemoteStorageConfiguration | null>
  >;

  setPassword: (password: string) => void;
  validatePassword: (password: string) => Promise<boolean>;

  resetApplication: () => Promise<void>;
  logOut: () => Promise<void>;
  logIn: (password: string) => Promise<boolean>;
}

const ConfigurationContext = createContext<IConfigurationContext | undefined>(
  undefined,
);

interface ConfigurationProviderProps {
  children: ReactNode;
}

export const ConfigurationProvider: React.FC<ConfigurationProviderProps> = ({
  children,
}) => {
  const [applicationSecurity, setApplicationSecurity] =
    useState<IApplicationSecurityConfiguration | null>(null);
  const [remoteStorage, setRemoteStorage] =
    useState<IRemoteStorageConfiguration | null>(null);

  useEffect(() => {
    if (enabled) {
      SecureStore.getItemAsync(GENERIC_USER_CREDENTIAL).then(
        (result: null | string) => {
          if (result)
            setApplicationSecurity({
              password: result,
              isAuthenticated: false,
            });
          else
            setApplicationSecurity({
              password: undefined,
              isAuthenticated: false,
            });
        },
      );
    } else {
      setApplicationSecurity({
        password: undefined,
        isAuthenticated: false,
      });
    }
  }, []);

  const setPassword = useCallback(
    async (password: string) => {
      if (password && applicationSecurity) {
        applicationSecurity.password = await crypto.digestStringAsync(
          crypto.CryptoDigestAlgorithm.SHA512,
          password,
        );
        if (enabled)
          await SecureStore.setItemAsync(GENERIC_USER_CREDENTIAL, password);
        setApplicationSecurity({
          password: password,
          isAuthenticated: true,
        });
      }
    },
    [applicationSecurity],
  );

  const validatePassword = useCallback(
    async (password: string) => {
      if (password && applicationSecurity && applicationSecurity.password) {
        const comparator = await crypto.digestStringAsync(
          crypto.CryptoDigestAlgorithm.SHA512,
          password,
        );
        return comparator === applicationSecurity.password;
      }
      return false;
    },
    [applicationSecurity?.password],
  );

  const logIn = useCallback(
    async (password: string) => {
      if (password && applicationSecurity && applicationSecurity.password) {
        const comparator = await crypto.digestStringAsync(
          crypto.CryptoDigestAlgorithm.SHA512,
          password,
        );
        if (comparator === applicationSecurity.password) {
          setApplicationSecurity({
            ...applicationSecurity,
            isAuthenticated: true,
          });
          return true;
        }
      }
      return false;
    },
    [applicationSecurity?.password],
  );

  const logOut = useCallback(async () => {
    setApplicationSecurity({ ...applicationSecurity, isAuthenticated: false });
  }, [applicationSecurity]);

  const resetApplication = useCallback(async () => {
    if (enabled) await SecureStore.setItemAsync(GENERIC_USER_CREDENTIAL, '');
    setApplicationSecurity({
      password: undefined,
      isAuthenticated: false,
    });
    setRemoteStorage(null);
  }, []);

  const value: IConfigurationContext = {
    applicationSecurity,
    remoteStorage,
    setRemoteStorage,
    setPassword,
    validatePassword,
    resetApplication,
    logOut,
    logIn,
  };

  return (
    <ConfigurationContext.Provider value={value}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfigurationContext = (): IConfigurationContext => {
  const context = useContext(ConfigurationContext);
  if (!context) {
    throw new Error(
      'useConfigurationContext must be used within an ConfigurationContextProvider',
    );
  }
  return context;
};

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from './dashboard/views/index';
import {
  DefaultTheme,
  NavigationContainer,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import Configuration from './configuration/views';
import { useConfigurationContext } from './configuration/contexts/ConfigurationContext';
import { useEffect } from 'react';
import { Splash } from './_splash';

const Drawer = createDrawerNavigator();

export default function Navigator() {
  const theme = useTheme();
  const configuration = useConfigurationContext();
  const navigationRef = React.useRef<any>();
  const ClientTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(33, 33, 33)',
    },
  };

  useEffect(() => {
    console.log(configuration.applicationSecurity);
    if (configuration.applicationSecurity?.isAuthenticated)
      navigationRef.current?.navigate('Configuration');
    else navigationRef.current?.navigate('Dashboard');
  }, [configuration.applicationSecurity]);

  return (
    <NavigationContainer
      theme={ClientTheme}
      independent={true}
      ref={navigationRef}
    >
      <Drawer.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitleStyle: {
            color: theme.colors.text,
          },
        }}
        initialRouteName={
          configuration.applicationSecurity?.password
            ? 'Dashboard'
            : 'Configuration'
        }
      >
        <Drawer.Screen name="Splash" component={Splash} />
        {configuration.applicationSecurity?.password ? (
          <Drawer.Screen name="Dashboard" component={Index} />
        ) : null}
        {configuration.applicationSecurity?.password &&
        configuration.applicationSecurity?.isAuthenticated ? (
          <Drawer.Screen name="Configuration" component={Configuration} />
        ) : null}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

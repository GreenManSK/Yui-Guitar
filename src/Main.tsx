import React from 'react';
import { RouterStackParamList } from './Router.interfaces';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { OneMinuteChange } from './OneMinuteChange/OneMinuteChange';
import { SoundContextProvider } from './Contexts/SoundContext';
import { ScreenContextProvider } from './Contexts/ScreenContext';
import { RecordsDataProvider } from './Data/RecordsDataContext';

const Stack = createStackNavigator<RouterStackParamList>();

export const Main = () => (
  <RecordsDataProvider>
    <SoundContextProvider>
      <ScreenContextProvider>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name={'OneMinuteChange'}
              component={OneMinuteChange}
              options={{ title: 'One minute changes' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ScreenContextProvider>
    </SoundContextProvider>
  </RecordsDataProvider>
);

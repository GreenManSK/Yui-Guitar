import React from 'react';
import { RouterStackParamList } from './Router.interfaces';
import { createStackNavigator } from '@react-navigation/stack';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { OneMinuteChange } from './OneMinuteChange/OneMinuteChange';

const Stack = createStackNavigator<RouterStackParamList>();

export const Main = () => (
  <NavigationContainer theme={DarkTheme}>
    <Stack.Navigator>
      <Stack.Screen
        name={'OneMinuteChange'}
        component={OneMinuteChange}
        options={{ title: 'One minute changes' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
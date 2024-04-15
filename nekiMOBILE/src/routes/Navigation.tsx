import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Home from '../pages/Home';

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
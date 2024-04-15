import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/routes/Navigation';

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <AppNavigator />
    </NavigationContainer>
  );
}
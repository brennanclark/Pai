import React from 'react';
<<<<<<< HEAD
import { createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
=======
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

>>>>>>> feature/longpressdb
import MainTabNavigator from './MainTabNavigator';
import TrackScreen from '../screens/TrackScreen';





export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginScreen,
  Main: MainTabNavigator,
  TrackScreen
});



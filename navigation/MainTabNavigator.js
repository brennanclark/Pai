import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LinksScreen from '../screens/LinksScreen';
import TrackScreen from '../screens/TrackScreen';
import BarCode from '../screens/BarCode';




const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  // Name of tabs on nav bar
  tabBarLabel: 'Profile',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const BarStack = createStackNavigator({
  Bars: BarCode,
  Links: LinksScreen
});

const LinksStack = createStackNavigator({
  Links: LinksScreen,
  Track: TrackScreen,
});

LinksStack.navigationOptions = {
  // Name of tabs on nav bar
  tabBarLabel: 'Connections',

  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      onPress={() => {

      }}
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-link'}
    />
  ),
};


export default createMaterialTopTabNavigator(
  {

    ProfileStack,
    LinksStack,
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'black',
      style: {
        backgroundColor: 'tomato',
        opacity: .5
      },
      indicatorStyle: {
        backgroundColor: 'black'
      }
    }
  }
);

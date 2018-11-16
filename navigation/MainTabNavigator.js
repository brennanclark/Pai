import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ProfileScreen from '../screens/ProfileScreen';
import LinksScreen from '../screens/LinksScreen';
import TrackScreen from '../screens/TrackScreen';

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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  // Name of tabs on nav bar
  tabBarLabel: 'Connections',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contacts' : 'md-link'}
    />
  ),
};

const TrackStack = createStackNavigator({
  Track: TrackScreen,
});

TrackStack.navigationOptions = {
  tabBarLabel: 'Target Mode',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-disc' : 'md-link'}
    />
  ),
};


export default createBottomTabNavigator({
  ProfileStack,
  LinksStack,
  TrackStack,
});

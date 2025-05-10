// src/screens/ProfileScreen.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import swipescreen from './swipescreen';
import profileScreen from './profilescreen';
import chatscreen from './chatscreen';
import masscreen from './masscreen';

const Tab = createBottomTabNavigator();

const Mainscreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Swipe" component={swipescreen} options={{ headerShown: false }} />
      <Tab.Screen name="profile" component={profileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="chat" component={chatscreen} options={{ headerShown: false }}/>
      <Tab.Screen name="mas" component={masscreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default Mainscreen;

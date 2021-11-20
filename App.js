import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import ControlScreen from './screens/ControlScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faCamera, faSlidersH } from '@fortawesome/free-solid-svg-icons'

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faCamera} size={size} color={color} />
            ),
            tabBarLabel: 'Camera',

          }} />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faHome} size={size} color={color} />
            ),
            tabBarLabel: 'Home',

          }} />
        <Tab.Screen
          name="Control"
          component={ControlScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faSlidersH} size={size} color={color} />
            ),
            tabBarLabel: 'Control',

          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

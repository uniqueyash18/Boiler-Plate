import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FastImage from 'react-native-fast-image';
import imagePath from '../constants/imagePath';
import navigationsStrings from '../constants/navigationsStrings';
import colors from '../styles/colors';
import MainStack from './MainStack';

const TabRoutes = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShown: false,
        tabBarStyle: { },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
          },
          tabBarIcon: ({focused}) => {
            return (
              <FastImage
                style={{width: 25, height: 25}}
                resizeMode="contain"
                tintColor={
                  focused ? colors.orangeooryks : colors.blackOpacity43
                }
                source={imagePath.ic_home}
              />
            );
          },
        }}
        component={MainStack}
        name={navigationsStrings.MainStack}
      />
         <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
          },
          tabBarIcon: ({focused}) => {
            return (
              <FastImage
                style={{width: 25, height: 25}}
                resizeMode="contain"
                tintColor={
                  focused ? colors.orangeooryks : colors.blackOpacity43
                }
                source={imagePath.form}
              />
            );
          },
        }}
        component={MainStack}
        name={navigationsStrings.CartStack}
      />
         <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
          },
          tabBarIcon: ({focused}) => {
            return (
              <FastImage
                style={{width: 25, height: 25}}
                resizeMode="contain"
                tintColor={
                  focused ? colors.orangeooryks : colors.blackOpacity43
                }
                source={imagePath.ic_account}
              />
            );
          },
        }}
        component={MainStack}
        name={navigationsStrings.AccountStack}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;

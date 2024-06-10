import React from 'react';
import Login from '../Screens/Login/Login';
import Signup from '../Screens/Signup/Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpVerify from '../Screens/OtpVerification/OtpVerify';
import Onboarding from '../Screens/Onboarding/Onboarding';
import navigationsStrings from '../constants/navigationsStrings';
const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Screen component={Onboarding} name={navigationsStrings.Onboarding} />
      <Stack.Screen component={Signup} name={navigationsStrings.Signup} />
      <Stack.Screen component={Login} name={navigationsStrings.Login} />
      <Stack.Screen component={OtpVerify} name={navigationsStrings.OtpVerify} />
    </>
  );
};

export default AuthStack;

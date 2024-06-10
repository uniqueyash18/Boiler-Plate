import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationsStrings from '../constants/navigationsStrings';
import TabRoutes from './TabRoutes';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers';
import AuthStack from './AuthStack';

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const userData = useSelector((state: RootState) => state?.auth?.userData);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userData?.authToken ? (
          <Stack.Screen
            component={TabRoutes}
            name={navigationsStrings.TabRoutes}
          />
        ) : (
          AuthStack()
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

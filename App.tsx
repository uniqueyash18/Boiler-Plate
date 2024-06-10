/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {View} from 'react-native';

import FlashMessage from 'react-native-flash-message';
import Routes from './src/navigation/Routes';
import {getItem} from './src/services/apiService';
import ForegroundHandler from './src/utils/ForegroundHandler';
import {useChangeLanguage} from './src/utils/helperFunctions';

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  const changeLanguage = useChangeLanguage();
  useEffect(() => {
    const lang = getItem('appLanguage');
    changeLanguage(lang);
  }, []);
  return (
    <View style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <ForegroundHandler />
        <Routes />
      </QueryClientProvider>
      <FlashMessage position="top" />
    </View>
  );
}

export default App;

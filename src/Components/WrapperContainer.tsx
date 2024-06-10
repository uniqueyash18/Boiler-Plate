import React, { FC, ReactNode, useRef } from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import { moderateScale } from 'react-native-size-matters';
import colors from '../styles/colors';
interface Proptypes {
  children: ReactNode,
  isLoading?: boolean,
  bgColor?: string,
  statusBarColor?: string,
  barStyle?: string,
  withModal?: boolean,
  isSafeArea?: boolean,
  colorsArray?:any
}

const WrapperContainer: FC<Proptypes> = ({
  colorsArray=[colors.themeColor2,colors.white],
  children,
  isLoading = false,
  bgColor = colors.white,
  statusBarColor = colors.themeColor2,
  barStyle = 'dark-content',
  withModal = false,
  isSafeArea = true,
}: Proptypes) => {
  const keyboardDismiss = useRef(null);
  if (isSafeArea) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: statusBarColor,
        }}>
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle={barStyle as any}
        />
          <LinearGradient
            colors={colorsArray}
            style={{
              flex: 1,
              paddingHorizontal: moderateScale(12)
            }}
          >
            <View ref={keyboardDismiss} style={{flex: 1 }}>{children}</View>
          </LinearGradient>
      </SafeAreaView>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: statusBarColor,
        paddingHorizontal: moderateScale(12)
      }}>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={barStyle as any}
      />
      <LinearGradient
        colors={colorsArray} // Example gradient colors
        style={{
          flex: 1
        }}
      >
        <View style={{ backgroundColor: 'transparent', flex: 1 }}>{children}</View>
      </LinearGradient>
    </View>
  );
};

export default React.memo(WrapperContainer);

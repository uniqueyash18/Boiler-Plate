import React, { FC, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { height, textScale, width } from '../styles/responsiveSize';
import TextContainer from './TextContainer';

interface Props {
  item: {
    image: string;
    name: string;
  };
  onPressItem?: () => void;
  index?: number;
}

const BrandView: FC<Props> = ({ item, onPressItem, index }) => {
  const [isPressed, setIsPressed] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true, // Improve performance on some devices
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
    <TouchableOpacity
      onPress={onPressItem}
      style={styles.brandContainer}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      
        <FastImage resizeMode='stretch' style={styles.imgStyles} source={{ uri: item?.image }} />
      <TextContainer style={styles.textStyle} text={item?.name} />
    </TouchableOpacity>
    </Animated.View>
  );
};

export default BrandView;

const styles = StyleSheet.create({
  brandContainer: {
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginVertical: moderateVerticalScale(6),
    shadowColor: colors.black, // Shadow color
    shadowOffset: { width: 4, height: 4 }, // Shadow offset
    shadowRadius: 5, // Shadow blur radius
    elevation: 4,
  },
  imgStyles: {
    height: height / 5,
    width: width - 24,
    borderTopLeftRadius: moderateScale(12),
    borderTopRightRadius: moderateScale(12),
  },
  textStyle: {
    margin: moderateVerticalScale(6),
    marginVertical: moderateVerticalScale(8),
    fontSize: textScale(18),
    fontFamily: fontFamily.ProximaNovaBold,
  },
});

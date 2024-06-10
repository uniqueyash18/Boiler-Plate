// src/components/CustomImagePicker.tsx
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { textScale } from '../styles/responsiveSize';
import { androidCameraPermission } from '../utils/permisions';

interface CustomImagePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({ label, value, onChange }) => {
  const pickImage = async () => {
    let permission = await androidCameraPermission();
    if (!permission) {
      return;
    }
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      onChange(result.assets[0].uri as any);
    }
  };

  const removeImage = () => {
    onChange('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {value ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: value }} style={styles.image} />
          <TouchableOpacity onPress={removeImage} style={styles.removeButton}>
            <Image source={imagePath.close} style={styles.removeIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={pickImage} style={styles.addButton}>
          <Image style={styles.addIcon} source={imagePath.circleplus} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateVerticalScale(10),
  },
  label: {
    marginVertical: moderateVerticalScale(12),
    fontSize: textScale(14),
    fontFamily: fontFamily.ProximaNovaBold,
    color:colors.black
  },
  imageContainer: {
    position: 'relative',
    width: moderateScale(100),
    height: moderateVerticalScale(100),
    marginVertical: moderateVerticalScale(10),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.backGroundGreyD,
    borderRadius: moderateScale(15),
    padding: 5,
  },
  removeIcon: {
    width: moderateScale(15),
    height: moderateVerticalScale(15),
  },
  addButton: {
    height: moderateVerticalScale(40),
    width: '100%',
    backgroundColor: colors.white,
    padding: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  addIcon: {
    width: moderateScale(20),
    height: moderateVerticalScale(20),
    resizeMode:'contain'
  },
});

export default CustomImagePicker;

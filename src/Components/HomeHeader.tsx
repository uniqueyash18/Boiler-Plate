import { isEmpty } from 'lodash';
import React, { FC } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import fontFamily from '../styles/fontFamily';
import { textScale, width } from '../styles/responsiveSize';
interface Proptypes {
  currLocation?: any;
  onPressLoc?: Function;
  onPressSearch?:()=>void;
}
const HomeHeader: FC<Proptypes> = ({currLocation, onPressLoc,onPressSearch}: Proptypes) => {
  return (
    <View>
      <View style={styles.container}>
        <FastImage
          source={imagePath.logo}
          resizeMode="contain"
          style={styles.iconStyle}
        />
        {!isEmpty(currLocation) ? <View style={styles.centerarea}>
          <Image source={imagePath.locationIcon} />
          <Text numberOfLines={1} style={styles.location}>
           {currLocation?.display_name}
          </Text>
        </View>:
       <View style={styles.centerarea}>
       <Image source={imagePath.locationIcon} />
       <Text numberOfLines={1} style={styles.location}>
        Search for location...
       </Text>
     </View>
        }
        {/* <TouchableOpacity style={styles.iconStyle}>
          <FastImage
            style={styles.notibell}
            source={imagePath.bellicon}
            resizeMode="contain"
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={onPressSearch} style={styles.searchbar}>
          <Image source={imagePath.searchIcon} />
          <TextInput value='Search your deal here....' editable={false} style={styles.textbar}/>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.filterIcon} >
        <Image source={imagePath.fliterIcon}/>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: moderateVerticalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    height: moderateVerticalScale(70),
    width: moderateScale(40),
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerarea: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  location: {
    marginHorizontal: moderateScale(12),
    maxWidth: moderateScale(width / 1.5),
    textAlign: 'center',
    fontFamily: fontFamily.ProximaNovaMedium,
    fontSize: textScale(14),
    color:colors.black
  },
  notibell: {
    height: moderateVerticalScale(20),
    width: moderateScale(20),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchbar: {
    borderWidth: 1,
    borderColor: colors.blackOpacity30,
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    paddingHorizontal:moderateScale(12),
    borderRadius:moderateScale(6),
    backgroundColor:colors.whiteOpacity50
  },
  textbar:{
    marginHorizontal:moderateScale(12),
    flex:1,
    maxHeight:moderateVerticalScale(50),
    color:colors.black
  },
  filterIcon:{
    marginLeft:moderateScale(12)
  }
});
export default HomeHeader;

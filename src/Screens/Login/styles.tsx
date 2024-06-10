import {StyleSheet} from 'react-native';
import {textScale} from '../../styles/responsiveSize';
import fontFamily from '../../styles/fontFamily';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import colors from '../../styles/colors';

export const styles = StyleSheet.create({
  topview: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.3,
  },
  logintxt: {
    fontSize: textScale(24),
    fontFamily: fontFamily.medium,
    color:colors.black
  },
  bottomview: {
    marginTop: moderateVerticalScale(30),
    flex:1
  },
  inputarea: {
    marginTop: moderateVerticalScale(24),
  },
  forgot: {
    textAlign: 'right',
    fontSize: textScale(14),
    color: colors.themeColor,
    marginTop:moderateVerticalScale(12)
  },
  horizontalLine: {
    height: 1,
    borderWidth: 1,
    borderColor: colors.borderColor,
    flex: 1,
  },
  orLoginView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:moderateVerticalScale(32)
  },
  socialview:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  dontHaveAcc:{
    alignItems:'center',
    marginTop:moderateVerticalScale(24)
  },
  socialbox:{
    flex:1,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
  },
  google:{
  marginLeft:moderateScale(12),
  fontFamily:fontFamily.ProximaNovaMedium,
  fontSize:textScale(16),
  color:colors.white
  },
  language:{
    textTransform:'uppercase',
    fontSize:textScale(12),
    fontFamily:fontFamily.ProximaNovaMedium,
    marginHorizontal:moderateScale(12)
  },
  locationView:{
    borderRadius:moderateScale(8),
    backgroundColor:colors.whiteSmokeColor,
    padding:moderateScale(6),
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'flex-end'
  },
  languageDrop:{
    backgroundColor:'white',
    position:'absolute',
    top:moderateVerticalScale(55),
    right:0,
    zIndex:1,
    padding:moderateScale(8),
    borderRadius:moderateScale(8),
    maxHeight:moderateVerticalScale(80)
  },
  langText:{
    marginVertical:moderateVerticalScale(4),
    fontFamily:fontFamily.ProximaNovaMedium,
    fontSize:textScale(12),
  }
});

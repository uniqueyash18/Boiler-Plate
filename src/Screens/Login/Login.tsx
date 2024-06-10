import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { t } from 'i18next';
import React, { FC, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { CustomTextInput } from '../../Components/CustomTextInput';
import GradientButton from '../../Components/GradientButton';
import { PhoneNumberInput } from '../../Components/PhoneNumberInput';
import TextContainer from '../../Components/TextContainer';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import navigationsStrings from '../../constants/navigationsStrings';
import usePostData from '../../hooks/usePostData';
import { changeAppLanguage } from '../../redux/actions/appSetting';
import { RootState } from '../../redux/reducers';
import { setUserdata } from '../../redux/reducers/auth';
import { setItem } from '../../services/apiService';
import { LOGIN } from '../../services/routes';
import colors from '../../styles/colors';
import { textScale, width } from '../../styles/responsiveSize';
import {
  googleLogin,
  showError,
  showSuccess,
  useChangeLanguage,
} from '../../utils/helperFunctions';
import validate from '../../utils/validation';
import { styles } from './styles';
interface ComponentState {
  phoneNumber: string;
  passWord: any;
  hidePass: boolean;
  countryCode: string;
  countryFlag: string;
  isLangModal?: boolean;
}
interface PropTypes {
  data?: any;
}
interface LoginResponseData {
  data: any;
  user?: object;
  token?: any;
  message: string;
}
let langauges = [
  {
    label: 'English',
    code: 'en',
  },
  {
    label: 'Hindi',
    code: 'hi',
  },
];
interface LoginRequestData {}
type LoginScreenNavigationProp = StackNavigationProp<any>;
const Login: FC<PropTypes> = ({data}: PropTypes) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const language = useSelector(
    (state: RootState) => state?.appSetting?.language,
  );
  const changeLanguage = useChangeLanguage();
  const dispatch = useDispatch();
  const [state, setState] = useState<ComponentState>({
    phoneNumber: '',
    passWord: '',
    hidePass: true,
    countryCode: '91',
    countryFlag: 'IN',
    isLangModal: false,
  });

  const {
    phoneNumber,
    passWord,
    hidePass,
    countryCode,
    countryFlag,
    isLangModal,
  } = state;
  const updateState = (data: any) => setState(state => ({...state, ...data}));
  const onPressRight = () => [
    updateState({
      hidePass: !hidePass,
    }),
  ];
  const {mutate: onLoginUser, isPending} = usePostData<
    LoginResponseData,
    Error,
    LoginRequestData
  >(LOGIN, {
    onSuccess: async (data, variable) => {
      console.log(data, 'login res');
      setItem('userData', {...data?.data?.user, ...{token: data?.data?.token}});
      dispatch(
        setUserdata({...data?.data?.user, ...{token: data?.data?.token}}),
      );
      showSuccess(data?.data?.message);
    },
    onError: async (error, variable) => {
      console.log(error, 'errorerror');
      showError(error);
    },
  });

  const onPressLogin = async () => {
    const res = validate({
      phoneNumber: String(phoneNumber),
      password: passWord,
    });
    if (res == true) {
      onLoginUser({phoneNumber: phoneNumber, password: passWord});
    } else {
      showError(res);
    }
  };

  return (
    <WrapperContainer>
      <View style={styles.topview}>
        <TouchableOpacity
          onPress={() => updateState({isLangModal: !isLangModal})}
          style={styles.locationView}>
          <FastImage
            source={imagePath.languageIcon}
            resizeMode="contain"
            style={{
              width: moderateScale(18),
              height: moderateVerticalScale(18),
            }}
          />
          <TextContainer text={language} style={styles.language} />
          <FastImage
            tintColor={colors.black}
            source={imagePath.downArrow}
            resizeMode="contain"
            style={{height: moderateScale(10), width: moderateScale(10)}}
          />
        </TouchableOpacity>
        {!!isLangModal && (
          <ScrollView style={styles.languageDrop}>
            {langauges.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    changeLanguage(item?.code);
                    changeAppLanguage(item?.code);
                    updateState({isLangModal:false})
                  }}
                  style={{width: width / 2}}>
                  <Text style={styles.langText}>{item?.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        <Image
          style={{resizeMode: 'contain', width: width / 1.5}}
          source={imagePath.newLogo}
        />
      </View>
      <ScrollView style={styles.bottomview}>
        <View style={{...styles.bottomview, marginTop: 0}}>
          <Text style={styles.logintxt}>{t('Log_In')}</Text>
          <View style={styles.inputarea}>
            <PhoneNumberInput
              setCountryCode={txt => {
                updateState({countryCode: txt});
              }}
              setCountryFlag={txt => {
                updateState({countryFlag: txt});
              }}
              countryCode={countryCode}
              countryFlag={countryFlag}
              value={phoneNumber}
              keyboardType="numeric"
              placeholder={t('Phone_number')}
              onChangeText={val => {
                updateState({phoneNumber: val});
              }}
              containerStyles={{marginBottom: moderateVerticalScale(12)}}
              maxLength={10}
            />
            <CustomTextInput
              value={passWord}
              keyboardType="default"
              placeholder={t('Password')}
              onChangeText={val => {
                updateState({passWord: val});
              }}
              containerStyles={{marginTop: moderateVerticalScale(12)}}
              rightImg={imagePath.hideEye}
              rightImageStyle={{height: moderateVerticalScale(20)}}
              onPressRight={onPressRight}
              secureTextEntry={hidePass}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(navigationsStrings.OtpVerify)}>
              <TextContainer style={styles.forgot} text={"Forgot_Passsword"} />
            </TouchableOpacity>
          </View>
          <GradientButton
            onPress={onPressLogin}
            indicator={isPending}
            btnText={t('LOGIN')}
          />
        </View>
        <View style={styles.orLoginView}>
          <View style={styles.horizontalLine} />
          <Text
            style={{
              marginHorizontal: moderateScale(12),
              color: colors.textGreyB,
            }}>
            {' '}
            {t('Or_Login_with')}
          </Text>
          <View style={styles.horizontalLine} />
        </View>
        <GradientButton
          onPress={() => googleLogin()}
          textStyle={styles.google}
          textImgViewStyle={styles.socialbox}
          isImgWithTxt
          leftImgSrc={imagePath.goodleLogo}
          colorsArray={[colors.black, colors.black]}
          btnText={t('SIGN_IN_WITH_GOOGLE')}
        />
        <View style={styles.dontHaveAcc}>
          <Text style={{fontSize: textScale(14), color: colors.black}}>
            {t('DONT_HAVE_ACCOUNT')}
            <Text
              onPress={() => {
                navigation.navigate(navigationsStrings.Signup as never);
              }}
              style={{color: colors.themeColor}}>
              {' '}
              {t('SIGNUP')}
            </Text>
          </Text>
        </View>
      </ScrollView>
    </WrapperContainer>
  );
};

export default Login;

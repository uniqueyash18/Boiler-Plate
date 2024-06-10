import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { CustomTextInput } from '../../Components/CustomTextInput';
import GradientButton from '../../Components/GradientButton';
import Header from '../../Components/Header';
import TextContainer from '../../Components/TextContainer';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import { sendOtp, verifyOtp } from '../../redux/actions/auth';
import colors from '../../styles/colors';
import { showError, showSuccess } from '../../utils/helperFunctions';
import { styles } from './styles';
import navigationsStrings from '../../constants/navigationsStrings';
interface RouteParams {
  params: {
    phonenumber: Number;
    email: String;
    name: String;
    password: String;
    isAdmin: Boolean;
    _id: any;
  };
}
interface PropTypes {
  route?: RouteParams;
}
interface ConponentState {
  otpInput: any;
  password: string;
  confirmPassword: string;
  hidePass: boolean | undefined;
  hideConfirmPass: boolean | undefined;
  emailAdded: boolean;
  email: string;
  isLoading:boolean
}
const OtpVerify: FC<PropTypes> = ({route}: PropTypes) => {
  const {t} = useTranslation();
  const navigation = useNavigation<StackNavigationProp<any>>();
  let otpInputRef = useRef(null);

  const [state, setState] = useState<ConponentState>({
    otpInput: '',
    password: '',
    confirmPassword: '',
    hidePass: true,
    hideConfirmPass: true,
    emailAdded: false,
    email: '',
    isLoading:true
  });
  const {
    otpInput,
    password,
    confirmPassword,
    hidePass,
    hideConfirmPass,
    emailAdded,
    email,
    isLoading
  } = state;

  const updateState = (data: Partial<ConponentState>) =>
    setState(state => ({...state, ...data}));

  useEffect(() => {
    if (emailAdded) {
      // sendmyOtp();
    }
  }, [emailAdded]);

  const sendmyOtp = async () => {
    if(!email){
      showError('Please enter a valid Email')
      return
    }
    updateState({isLoading:true})
    const res = await sendOtp({email});
    updateState({isLoading:false})
    showSuccess(res?.message);
  };

  const verifyMyOtp = async () => {
    updateState({isLoading:true})
    const res = await verifyOtp({otp: otpInput,email,password});
    console.log(res,'resresres')
    if(!!res?.success){
      navigation.navigate(navigationsStrings.Login)
    }
    updateState({isLoading:false})
  };
  const onPressRightPass = () => {
    updateState({
      hidePass: !hidePass,
    });
  };
  const onPressRightConfirmPass = () => {
    updateState({
      hideConfirmPass: !hideConfirmPass,
    });
  };
  return (
    <WrapperContainer>
      {!emailAdded ? (
        <ScrollView>
          <Header
            leftIcon={imagePath.backAngle}
            isCustomLeft={true}
            OnPressLeft={() => navigation.goBack()}
            isLeft={true}
            cetnerTitle={t('EMAIL')}
          />
          <View>
            <TextContainer
              style={styles.enterRegEmail}
              text="ENTER_REGISTERED_EMAIL"
            />
            <CustomTextInput
              value={email}
              keyboardType="email-address"
              placeholder={t('EMAIL')}
              containerStyles={{marginBottom: moderateScale(18)}}
              onChangeText={val => {
                updateState({email: val});
              }}
            />
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <Header
            leftIcon={imagePath.backAngle}
            isCustomLeft={true}
            OnPressLeft={() => updateState({emailAdded: false})}
            isLeft={true}
            cetnerTitle={t('Verification_Code')}
          />
          <View style={styles.topview}>
            <Text style={styles.codesendto}>
              {t('A_code_has_been_sent_to')}
              <Text style={styles.usernumber}> {email}</Text>
            </Text>
            <View style={styles.didNtRecieve}>
              <Text style={{color: colors.black}}>
                {t('Did_not_recieved_the_code')}
              </Text>
              <TouchableOpacity onPress={sendmyOtp}>
                <Text style={styles.resend}>{t('RESEND_CODE')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <OTPTextView
                inputCount={4}
                ref={otpInputRef}
                tintColor={colors.themeColor}
                keyboardType="numeric"
                textInputStyle={styles.boxInput}
                handleTextChange={val => {
                  updateState({otpInput: val});
                }}
                autoFocus
              />
            </View>
           {otpInput.length==4 && <>
            <TextContainer style={styles.enterNew} text="ENTER_NEW_PASSOWRD" />
            <CustomTextInput
              value={password}
              placeholder={t('PASSWORD')}
              containerStyles={{marginBottom: moderateScale(18)}}
              onChangeText={val => {
                updateState({password: val});
              }}
              rightImg={imagePath.hideEye}
              rightImageStyle={{height: moderateVerticalScale(20)}}
              onPressRight={onPressRightPass}
              secureTextEntry={hidePass as undefined}
            />
            <CustomTextInput
              value={confirmPassword}
              placeholder={t('CONFIRM_PASSWORD')}
              containerStyles={{marginBottom: moderateScale(18)}}
              onChangeText={val => {
                updateState({confirmPassword: val});
              }}
              rightImg={imagePath.hideEye}
              rightImageStyle={{height: moderateVerticalScale(20)}}
              onPressRight={onPressRightConfirmPass}
              secureTextEntry={hideConfirmPass as undefined}
            />
            </>}
          </View>
        </ScrollView>
      )}
      <GradientButton
      indicator={!!isLoading && !!emailAdded}
        containerStyle={{marginBottom: moderateVerticalScale(32)}}
        onPress={
          !!emailAdded
            ? () => verifyMyOtp()
            : () => updateState({emailAdded: true})
        }
        btnText={!!emailAdded ? t('VERIFY') : t('NEXT')}
      />
    </WrapperContainer>
  );
};

export default OtpVerify;

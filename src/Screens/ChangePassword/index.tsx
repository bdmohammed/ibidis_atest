/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import React, {useState} from 'react';
import {
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import GradientButton from '../../Components/GradientButton';
import Header from '../../Components/Header';
import loaderOne from '../../assets/lotties/loader.json';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang/index';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import {
  height,
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import {
  showError,
  showSuccess,
} from '../../utils/helperFunctions';
import validations from '../../utils/validations';
import stylesFunc from './styles';
import {useDarkMode} from 'react-native-dynamic';
import {MyDarkTheme} from '../../styles/theme';
import TextInputWithUnderlineAndLabel from '../../Components/TextInputWithUnderlineAndLabel';

export default function ChangePassword({route, navigation}) {
  const theme = useSelector((state) => state?.initBoot?.themeColor);
  const toggleTheme = useSelector((state) => state?.initBoot?.themeToggle);
  const darkthemeusingDevice = useDarkMode();
  const isDarkMode = toggleTheme ? darkthemeusingDevice : theme;
  const currentTheme = useSelector((state) => state?.initBoot);
  const {themeColors, themeLayouts, appStyle} = currentTheme;
  const fontFamily = appStyle?.fontSizeData;
  const styles = stylesFunc({themeColors, fontFamily});
  const commonStyles = commonStylesFunc({fontFamily});
  const appData = useSelector((state) => state?.initBoot?.appData);
  const userData = useSelector((state) => state?.auth?.userData);
  const [state, setState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    password: '',
    isLoading: false,
    isShowPassword: false,
    isShowNewPassword:false,
    isShowConfirmPassword:false

  });
  const {
    confirmPassword,
    password,
    currentPassword,
    newPassword,
    isLoading,
    isShowPassword,
    isShowNewPassword,
    isShowConfirmPassword
  } = state;

  const updateState = (data) => setState((state) => ({...state, ...data}));
  // on change text
  const _onChangeText = (key) => (val) => {
    updateState({[key]: val});
  };


  const errorMethod = (error) => {
    updateState({isLoading: false, isLoadingB: false, isRefreshing: false});
    showError(error?.message || error?.error);
  };

  
  //this function use for chnage password
  const isValidDataOfChangePass = () => {
    const error = validations({
      password: currentPassword,
      newChangePassword: newPassword,
      confirmChangePassword: confirmPassword,
    });
    if (error) {
      showError(error);
      return;
    }
    return true;
  };

  const changePassword = () => {

      const checkValid = isValidDataOfChangePass();
      if (!checkValid) {
        return;
      }
      let data = {
        oldPassword: currentPassword,
        password: newPassword,
        rePassword: confirmPassword,
      };
      updateState({isLoading: true});
      actions
        .changePassword(data)
        .then((res) => {
          console.log(res,"reseeseses")
          updateState({isLoading: false});
          showSuccess('Password update successfully');
          updateState({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        })
        .catch((err) => {
          showError(err?.errors && err?.errors[0] && err?.errors[0]?.msg);

            updateState({isLoading: false});
        });
  };


  
  const showHidePassword = (keyName,value) => {
    updateState({ [keyName]: !value });
  };

  //Change password info tab
  const changePasswordView = () => {
    return (
      <KeyboardAwareScrollView
        style={{height: height / 2}}
        enableAutomaticScroll={true}>
        <View
          style={{
            height: height / 1.7,
            marginVertical: moderateScaleVertical(50),
            marginHorizontal: moderateScale(24),
          }}>
          <TextInputWithUnderlineAndLabel
            onChangeText={_onChangeText('currentPassword')}
            label={strings.ENTER_CURRENT_PASSWORD}
            value={currentPassword}
            containerStyle={{marginVertical: moderateScaleVertical(10)}}
            undnerlinecolor={colors.textGreyB}
            labelStyle={{
              color: colors.textGreyB,
              textTransform: 'uppercase',
              fontSize: textScale(12),
            }}
            secureTextEntry={isShowPassword ? false : true}

            rightIcon={
              currentPassword.length > 0
                ? !isShowPassword
                  ? imagePath.icShowPassword
                  : imagePath.icHidePassword
                : false
            }
            onPressRight={()=>showHidePassword('isShowPassword',state?.isShowPassword)}
            isShowPassword={isShowPassword}
          />

          <TextInputWithUnderlineAndLabel
            onChangeText={_onChangeText('newPassword')}
            value={newPassword}
            label={strings.ENTER_NEW_PASSWORD}
            undnerlinecolor={colors.textGreyB}
            labelStyle={{
              color: colors.textGreyB,
              textTransform: 'uppercase',
              fontSize: textScale(12),
            }}
            secureTextEntry={isShowNewPassword ? false : true}

            rightIcon={
              newPassword.length > 0
                ? !isShowNewPassword
                  ? imagePath.icShowPassword
                  : imagePath.icHidePassword
                : false
            }
            onPressRight={()=>showHidePassword('isShowNewPassword',state?.isShowNewPassword)}
            isShowPassword={isShowNewPassword}
            containerStyle={{marginVertical: moderateScaleVertical(10)}}
          />
          <TextInputWithUnderlineAndLabel
            onChangeText={_onChangeText('confirmPassword')}
            value={confirmPassword}
            label={strings.ENTER_CONFIRM_PASSWORD}
            undnerlinecolor={colors.textGreyB}
            labelStyle={{
              color: colors.textGreyB,
              textTransform: 'uppercase',
              fontSize: textScale(12),
            }}
            rightIcon={
              confirmPassword.length > 0
                ? !isShowConfirmPassword
                  ? imagePath.icShowPassword
                  : imagePath.icHidePassword
                : false
            }
            secureTextEntry={isShowConfirmPassword ? false : true}

            onPressRight={()=>showHidePassword('isShowConfirmPassword',state?.isShowConfirmPassword)}
x            containerStyle={{marginVertical: moderateScaleVertical(10)}}
          />
          <GradientButton
            btnStyle={{marginTop: moderateScaleVertical(57)}}
            colorsArray={[themeColors.primary_color, themeColors.primary_color]}
            textStyle={styles.textStyle}
            onPress={changePassword}
            // marginTop={moderateScaleVertical(50)}
            marginBottom={moderateScaleVertical(50)}
            btnText={strings.CHANGE_PASS_CAPS}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  };


  //
  return (
    <WrapperContainer
      isLoadingB={isLoading}
      bgColor={
        isDarkMode ? MyDarkTheme.colors.background : colors.backgroundGrey
      }
      statusBarColor={colors.backgroundGreyC}
      source={loaderOne}>
      <Header
        leftIcon={imagePath.icBackb}
        centerTitle={strings.CHANGE_PASS}
        headerStyle={{
          backgroundColor: isDarkMode
            ? MyDarkTheme.colors.background
            : colors.backgroundGreyC,
        }}
      />
      <View style={{...commonStyles.headerTopLine}} />
      {/* top section user general info */}

   {changePasswordView()}
    </WrapperContainer>
  );
}

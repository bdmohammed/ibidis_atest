/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  Alert,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import navigationStrings from '../../navigation/navigationStrings';
import {useSelector} from 'react-redux';
import ToggleSwitch from 'toggle-switch-react-native';
import Header from '../../Components/Header';
import loaderOne from '../../assets/lotties/loader.json';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang/index';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';
import {MyDarkTheme} from '../../styles/theme';
import stylesFunc from './styles';
import {
  USER_SHOW_ADDRESS,
  USER_SHOW_EMAIL,
  USER_SHOW_MOBILE_NUMBER,
} from '../../config/urls';
import ConfirmationModal from '../../Components/ConfirmationModal';
import RewardedAds from '../AdsSection/Rewarded';

export default function Settings({route, navigation}) {
  // const appData = useSelector(state => state?.initBoot?.appData);

  const theme = useSelector(state => state?.initBoot?.themeColor);
  const toggleTheme = useSelector(state => state?.initBoot?.themeToggle);
  const userSettings = useSelector(state => state?.auth?.userSettings);
  const userData = useSelector(state => state?.auth?.userData);

  const darkthemeusingDevice = useDarkMode();
  const isDarkMode = toggleTheme ? darkthemeusingDevice : theme;
  const {currencies, appData, languages, appStyle, themeColors} = useSelector(
    state => state?.initBoot,
  );
  const [isAlertShow, setIsShowAlert] = useState(false);
  const [state, setState] = useState({
    ...userSettings,
    isLoading: false,
    country: 'uk',
    appCurrencies: currencies,
    appLanguages: languages,
    selectedThemeOption: null,
  });
  useEffect(()=>{
    RewardedAds()
  },[])
  const {isLoading, isOn, selectedThemeOption} = state;
  const fontFamily = appStyle?.fontSizeData;
  const styles = stylesFunc({themeColors, fontFamily});
  const commonStyles = commonStylesFunc({fontFamily});

  //update state
  const updateState = data => setState(state => ({...state, ...data}));
  useEffect(() => {
    getAllUserSettings();
  }, []);

  useEffect(() => {
    updateState(userSettings);
  }, [userSettings]);

  const moveToNewScreen =
    (screenName, data = {}) =>
    () => {
      navigation.navigate(screenName, {data});
    };
  const _toggleOnOff = (isOn, keyName, apiName) => {
    updateState({
      [keyName]: isOn ? true : false,
    });
    showUserMobileNumber(apiName);
  };
  const getAllUserSettings = () => {
    actions
      .getAllUserSettings()
      .then(res => {
        console.log(res.data, 'res.data');
        if (res.status == 200) {
          updateState(res.data);
        } else {
          // setUserSetting(null)
        }
      })
      .catch(() => null);
  };

  const handlePress = async url => {
    // Checking if the link is supported for links with custom URL scheme.
    await Linking.openURL('https://www.youtube.com/shorts/YMoJfdTb6Q8');
    return;
    const supported = await Linking.canOpenURL(
      'https://www.youtube.com/shorts/YMoJfdTb6Q8',
    );
    console.log(supported, 'supported');
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };
  const showUserMobileNumber = apiName => {
    actions
      .showUserMobileNumber(apiName, {
        showAddress: state?.showAddress,
        showEmail: state?.showEmail,
        showMobileNumber: state?.showMobileNumber,
      })
      .then(res => {
        console.log(res, 'ressddsdsdsd');
        if (res.status == 200) {
        }
      })
      .catch(() => null);
  };

  const confirmLogout = () => {
    actions.userLogout();
    setIsShowAlert(false);
    moveToNewScreen(navigationStrings.ACCOUNTS, {})();
    moveToNewScreen(navigationStrings.HOMESTACK, {})();
  };

  //Logout function
  const userlogout = () => {
    if (!!userData?.auth_token) {
      setIsShowAlert(true);
      // Alert.alert('', strings.LOGOUT_SURE_MSG, [
      //   {
      //     text: 'Cancel',
      //     onPress: () => console.log('Cancel Pressed'),
      //     // style: 'destructive',
      //   },
      //   {
      //     text: 'Confirm',
      //     onPress: () => {
      //       actions.userLogout();
      //       moveToNewScreen(navigationStrings.LOGIN, {})();
      //     },
      //   },
      // ]);
    } else {
      moveToNewScreen(navigationStrings.LOGIN, {})();
    }
  };

  return (
    <>

 
    <WrapperContainer
      bgColor={
        isDarkMode ? MyDarkTheme.colors.background : colors.backgroundGrey
      }
      statusBarColor={colors.white}
      source={loaderOne}
      isLoadingB={isLoading}>
      <Header
        leftIcon={imagePath?.icBackb}
        centerTitle={strings.SETTINGS}
        // rightIcon={imagePath.cartShop}
        headerStyle={
          isDarkMode
            ? {backgroundColor: MyDarkTheme.colors.background}
            : {backgroundColor: colors.white}
        }
      />
      

      <View style={{...commonStyles.headerTopLine}} />
      <View
        style={{
          marginHorizontal: moderateScale(20),
          marginTop: moderateScaleVertical(20),
        }}>
        <Text
          style={{
            ...styles.darkAppearanceTextStyle,
            color: isDarkMode ? MyDarkTheme.colors.text : colors.blackOpacity43,
            fontSize: textScale(12),
          }}>
          {strings.PERSONAL}
        </Text>
      </View>
      <View style={{height: 10}} />
      <View
        style={{
          backgroundColor: isDarkMode
            ? MyDarkTheme.colors.lightDark
            : colors.white,
          borderTopWidth: 0.7,
          borderBottomWidth: 0.7,
          borderColor: isDarkMode
            ? MyDarkTheme.colors.text
            : colors.blackOpacity20,
        }}>
        <View style={styles.row}>
          <Text
            style={
              isDarkMode
                ? [
                    styles.darkAppearanceTextStyle,
                    {color: MyDarkTheme.colors.text},
                  ]
                : styles.darkAppearanceTextStyle
            }>
            {strings.SHOW_MOBILE_NUMBER}
          </Text>
          <ToggleSwitch
            isOn={state?.showMobileNumber}
            onColor={themeColors.primary_color}
            offColor={colors.textGreyB}
            size="medium"
            onToggle={isOn =>
              _toggleOnOff(isOn, 'showMobileNumber', USER_SHOW_MOBILE_NUMBER)
            }
            animationSpeed={400}
          />
        </View>
        <View style={{height: 10}} />
      </View>

      <View
        style={{
          backgroundColor: isDarkMode
            ? MyDarkTheme.colors.lightDark
            : colors.white,
          borderTopWidth: 0,
          borderBottomWidth: 0.7,
          borderColor: isDarkMode
            ? MyDarkTheme.colors.text
            : colors.blackOpacity20,
          paddingBottom: 8,
        }}>
        <View style={styles.row}>
          <Text
            style={
              isDarkMode
                ? [
                    styles.darkAppearanceTextStyle,
                    {color: MyDarkTheme.colors.text},
                  ]
                : styles.darkAppearanceTextStyle
            }>
            {strings.SHOW_EMAIL}
          </Text>
          <ToggleSwitch
            isOn={state?.showEmail}
            onColor={themeColors.primary_color}
            offColor={colors.textGreyB}
            size="medium"
            onToggle={isOn => _toggleOnOff(isOn, 'showEmail', USER_SHOW_EMAIL)}
            animationSpeed={400}
          />
        </View>
        {/* <View style={{ height: 10 }} /> */}
      </View>

      <View
        style={{
          backgroundColor: isDarkMode
            ? MyDarkTheme.colors.lightDark
            : colors.white,
          borderTopWidth: 0,
          borderBottomWidth: 0.7,
          borderColor: isDarkMode
            ? MyDarkTheme.colors.text
            : colors.blackOpacity20,
          paddingBottom: 8,
        }}>
        <View style={styles.row}>
          <Text
            style={
              isDarkMode
                ? [
                    styles.darkAppearanceTextStyle,
                    {color: MyDarkTheme.colors.text},
                  ]
                : styles.darkAppearanceTextStyle
            }>
            {'Show Address'}
          </Text>
          <ToggleSwitch
            isOn={state?.showAddress}
            onColor={themeColors.primary_color}
            offColor={colors.textGreyB}
            size="medium"
            onToggle={isOn =>
              _toggleOnOff(isOn, 'showAddress', USER_SHOW_ADDRESS)
            }
            animationSpeed={400}
          />
        </View>
        {/* <View style={{ height: 10 }} /> */}
      </View>

      <View
        style={{
          marginHorizontal: moderateScale(20),
          marginTop: moderateScaleVertical(20),
        }}>
        <Text
          style={{
            ...styles.darkAppearanceTextStyle,
            color: isDarkMode ? MyDarkTheme.colors.text : colors.blackOpacity43,
            fontSize: textScale(12),
          }}>
          {strings.SECURITY}
        </Text>
      </View>
      <View style={{height: 10}} />

      <View
        style={{
          backgroundColor: isDarkMode
            ? MyDarkTheme.colors.lightDark
            : colors.white,
          borderTopWidth: 0.7,
          borderBottomWidth: 0.7,
          borderColor: isDarkMode
            ? MyDarkTheme.colors.text
            : colors.blackOpacity20,
        }}>
        <TouchableOpacity
          onPress={() =>
            moveToNewScreen(navigationStrings.CHANGE_PASSWORD, {})()
          }
          style={styles.row}>
          <Text
            style={
              isDarkMode
                ? [
                    styles.darkAppearanceTextStyle,
                    {color: MyDarkTheme.colors.text},
                  ]
                : styles.darkAppearanceTextStyle
            }>
            {strings.CHANGE_PASS}
          </Text>
          <Image alignSelf={'center'} source={imagePath.goRight} />
        </TouchableOpacity>
        <View style={{height: 10}} />
      </View>

      <View
        style={{
          marginHorizontal: moderateScale(20),
          marginTop: moderateScaleVertical(20),
        }}>
        <Text
          style={{
            ...styles.darkAppearanceTextStyle,
            color: isDarkMode ? MyDarkTheme.colors.text : colors.blackOpacity43,
            fontSize: textScale(12),
          }}>
          {'Public'}
        </Text>
      </View>
      <View style={{height: 10}} />
      <View
        style={{
          backgroundColor: isDarkMode
            ? MyDarkTheme.colors.lightDark
            : colors.white,
          borderTopWidth: 0.7,
          borderBottomWidth: 0.7,
          borderColor: isDarkMode
            ? MyDarkTheme.colors.text
            : colors.blackOpacity20,
        }}>
        <TouchableOpacity
          onPress={() =>
            handlePress(
              'https://www.youtube.com/watch?v=YMoJfdTb6Q8&list=PLeHqwgRfPnR8Bij2UtS7QpszsI3nJL2BB',
            )
          }
          style={styles.row}>
          <Text
            style={
              isDarkMode
                ? [
                    styles.darkAppearanceTextStyle,
                    {color: MyDarkTheme.colors.text},
                  ]
                : styles.darkAppearanceTextStyle
            }>
            {'Public Response'}
          </Text>
          <Image alignSelf={'center'} source={imagePath.goRight} />
        </TouchableOpacity>
        <View style={{height: 10}} />
      </View>
      <View
        style={{
          backgroundColor: isDarkMode
            ? MyDarkTheme.colors.lightDark
            : colors.white,
          borderTopWidth: 0.7,
          borderBottomWidth: 0.7,
          borderColor: isDarkMode
            ? MyDarkTheme.colors.text
            : colors.blackOpacity20,
        }}>
        <TouchableOpacity
          onPress={() =>
            handlePress(
              'https://www.youtube.com/watch?v=YMoJfdTb6Q8&list=PLeHqwgRfPnR8Bij2UtS7QpszsI3nJL2BB',
            )
          }
          style={styles.row}>
          <Text
            style={
              isDarkMode
                ? [
                    styles.darkAppearanceTextStyle,
                    {color: MyDarkTheme.colors.text},
                  ]
                : styles.darkAppearanceTextStyle
            }>
            {'How its different'}
          </Text>
          <Image alignSelf={'center'} source={imagePath.goRight} />
        </TouchableOpacity>
        <View style={{height: 10}} />
      </View>
      {/* <View
        style={{
          zIndex: -1,
          flexDirection: 'row',
          alignSelf: 'center',
          marginVertical: moderateScaleVertical(24),
        }}>
        <Text
          style={{
            ...commonStyles.regularFont11,
            color: isDarkMode ? MyDarkTheme.colors.text : colors.textGrey,
          }}>
          App Version{' '}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            ...commonStyles.regularFont11,
            color: isDarkMode ? MyDarkTheme.colors.text : colors.textGrey,
          }}>
          {`${DeviceInfo.getVersion()}`}
          <Text>{`(${DeviceInfo.getBuildNumber()})`}</Text>
          <Text>
            {API_BASE_URL == 'https://api.rostaging.com/api/v1' ? 'S' : ''}
          </Text>
        </Text>
      </View> */}

      <View style={styles.loginView}>
        <TouchableOpacity
          onPress={userlogout}
          style={styles.touchAbleLoginVIew}>
          <Text
            style={[
              styles.loginLogoutText,
              {fontFamily: fontFamily.regular, fontSize: 20},
            ]}>
            {!!userData?.auth_token ? strings.LOGOUT : strings.LOGIN}
          </Text>
          {/* <Image
              source={imagePath.rightBlue}
              style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
            /> */}
        </TouchableOpacity>
      </View>
      {isAlertShow && (
        <ConfirmationModal
          headerTitle={'Warning!'}
          closeModal={() => setIsShowAlert(false)}
          ShowModal={isAlertShow}
          showBottomButton={true}
          btnText={'Logout'}
          mainText={strings.LOGOUT_SURE_MSG}
          bottomButtonClick={confirmLogout}
          // updateStatus={(item) => updateStatus(item)}
        />
      )}
    </WrapperContainer>
    </>
  );
}

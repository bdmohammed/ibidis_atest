import React, {Fragment, useState} from 'react';
import {Text, TouchableOpacity, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import ConfirmationModal from '../Components/ConfirmationModal';
import colors from '../styles/colors';
import {useDarkMode} from 'react-native-dynamic';
import {MyDarkTheme} from '../styles/theme';
// import {getColorCodeWithOpactiyNumber} from '../utils/helperFunctions';
import navigationStrings from '../navigation/navigationStrings';
import InterstitialAdsScreen from '../Screens/AdsSection/Interstitial';

const CustomBottomTabBar = ({
  state,
  descriptors,
  navigation,
  // bottomTabNotify,

  ...props
}: any) => {
  const insets = useSafeAreaInsets();
  //@ts-ignore
  const userData = useSelector(state => state?.auth?.userData);

  const {themeToggle, themeColor} = useSelector(
    //@ts-ignore
    state => state.initBoot,
  );

  const darkthemeusingDevice = useDarkMode();
  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;
  const [isAlertShow, setIsShowAlert] = useState(false);
  const loginPopup = () => {
    setIsShowAlert(false);
    navigation.navigate(navigationStrings.LOGIN);
    // Alert.alert(
    //   'Login Required!!',
    //   'Please Login To Continue',
    //   [
    //     {
    //       text: 'Login',
    //       onPress: () => {
    //         navigation.navigate(navigationStrings.LOGIN);
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       onPress: () => console.log('No button clicked'),
    //       style: 'cancel',
    //     },
    //   ],
    //   {
    //     cancelable: true,
    //   },
    // );
  };

  return (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 1}}
      style={{
        height: Platform.OS === 'ios' ? 60 + insets.bottom : 70 + insets.bottom,
        flexDirection: 'row',
        paddingBottom: insets.bottom,
        // borderTopLeftRadius: 10,
        // borderTopRightRadius: 10,
        // style={{marginBottom:Platform.OS === 'ios'?30:10}}
      }}
      colors={
        isDarkMode
          ? [MyDarkTheme.colors.lightDark, MyDarkTheme.colors.lightDark]
          : ['#FFFFFF', '#FFFFFF', '#FFFFFF']
      }>
      {state.routes.map((route: any, index: any) => {
        // console.log(route, 'routesssssss');
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
       
          
          if (!isFocused && !event.defaultPrevented) {
            if (userData?.auth_token) {
              if(route.name == 'Cart'){
                InterstitialAdsScreen()
                setTimeout(()=>navigation.navigate(route.name),500)
              }else{
                navigation.navigate(route.name);
              }
              
            } else {
             return setIsShowAlert(true);
            }
          }
        };

        return (
          <Fragment key={route.name}>
            <TouchableOpacity
              accessibilityRole="button"
              //@ts-ignore
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              // onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 52,
                paddingTop: 8,

                // marginBottom:20
              }}>
              {options.tabBarIcon({focused: isFocused})}
              <Text
                style={{
                  ...props.labelStyle,
                  color: isFocused ? colors.purple : '#000000',
                  // opacity: isFocused ? 1 : 0.6,
                  paddingTop: 4,
                }}>
                {label}
              </Text>
            </TouchableOpacity>
            {!!isAlertShow && (
              <ConfirmationModal
                headerTitle={'Login Required'}
                closeModal={() => setIsShowAlert(false)}
                ShowModal={isAlertShow}
                showBottomButton={true}
                btnText={'Login'}
                mainText={'Please Login To Continue'}
                bottomButtonClick={loginPopup}
                // updateStatus={(item) => updateStatus(item)}
              />
            )}
          </Fragment>
        );
      })}
    </LinearGradient>
  );
};
export default React.memo(CustomBottomTabBar);

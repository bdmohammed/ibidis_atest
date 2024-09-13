import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  I18nManager,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
// import {hitSlopProp} from '../styles/commonStyles';
import {
  moderateScale,
  StatusBarHeight,
  textScale,
} from '../styles/responsiveSize';
import {useDarkMode} from 'react-native-dynamic';
import {MyDarkTheme} from '../styles/theme';
import strings from '../constants/lang';
// import {boolean} from 'is_js';

const Header = ({
  leftIcon = imagePath.back,
  centerTitle,
  textStyle = {},
  //@ts-ignore
  // horizontLine = true,
  rightIcon = '',
  onPressLeft,
  onPressRight,
  customRight,
  hideRight = true,
  headerStyle,
  noLeftIcon = false,
  rightViewStyle = {},
  customLeft,
  rightIconStyle = {},
  showImageAlongwithTitle = false,
  //@ts-ignore
  imageAlongwithTitle = imagePath.dropDownSingle,
  imageAlongwithTitleStyle = {tintColor: colors.black},
  onPressImageAlongwithTitle,
  onPressCenterTitle,
  leftIconStyle,
  isRightText = false,
  onPressRightTxt = () => {},
  rightTxt = strings.CLEAR_CART2,
  rightTxtContainerStyle = {},
  rightTxtStyle = {},
  searchIconRight = false,
  onPressSearch,
}: any) => {
  //@ts-ignore
  const {appStyle} = useSelector(state => state?.initBoot);
  //@ts-ignore
  const toggleTheme = useSelector(state => state?.initBoot?.themeToggle);
  //@ts-ignore
  const theme = useSelector(state => state?.initBoot?.themeColor);
  const darkthemeusingDevice = useDarkMode();
  const isDarkMode = toggleTheme ? darkthemeusingDevice : theme;
  const fontFamily = appStyle?.fontSizeData;
  const styles = stylesFunc({fontFamily});
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          ...styles.headerStyle,
          ...headerStyle,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            alignItems: 'flex-start',
            flex: 0.2,
            ...rightViewStyle,
          }}>
          {!noLeftIcon &&
            (customLeft ? (
              customLeft()
            ) : (
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  hitSlop={{
                    top: 50,
                    right: 10,
                    left: 50,
                    bottom: 50,
                  }}
                  activeOpacity={0.7}
                  onPress={
                    !!onPressLeft
                      ? onPressLeft
                      : () => {
                          navigation.goBack();
                        }
                  }>
                  <Image
                    resizeMode="contain"
                    source={leftIcon}
                    style={{
                      ...leftIconStyle,
                      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
        </View>
        <View style={{flex: 1}} />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              onPress={onPressCenterTitle}
              numberOfLines={1}
              style={{
                ...styles.textStyle,
                color: isDarkMode ? MyDarkTheme.colors.text : colors.black,
                ...textStyle,
              }}>
              {centerTitle}
            </Text>
            {!!showImageAlongwithTitle && (
              <TouchableOpacity onPress={onPressImageAlongwithTitle}>
                <Image
                  style={imageAlongwithTitleStyle}
                  source={imageAlongwithTitle}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{flex: 1, alignItems: 'center'}}>
          {searchIconRight && (
            <TouchableOpacity onPress={onPressSearch}>
              <Image
                resizeMode="contain"
                source={imagePath.search}
                style={{
                  ...leftIconStyle,
                  tintColor: colors.purple,
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={{alignItems: 'flex-end'}}>
          {isRightText ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPressRightTxt}
              style={{...rightTxtContainerStyle}}>
              <Text
                style={{
                  fontFamily: fontFamily.medium,
                  color: colors.blackOpacity70,
                  fontSize: textScale(12),
                  ...rightTxtStyle,
                }}>
                {rightTxt}
              </Text>
            </TouchableOpacity>
          ) : !!rightIcon ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                hitSlop={{
                  top: 30,
                  left: 30,
                  right: 30,
                  bottom: 25,
                }}
                onPress={onPressRight}>
                <Image
                  style={
                    isDarkMode
                      ? {
                          transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                          ...leftIconStyle,
                          tintColor: MyDarkTheme.colors.text,
                        }
                      : rightIconStyle
                  }
                  source={rightIcon}
                />
              </TouchableOpacity>
            </View>
          ) : !!customRight ? (
            customRight()
          ) : hideRight ? (
            <View style={{width: 25}} />
          ) : (
            <Image source={imagePath.cartShop} />
          )}
        </View>
      </View>
    </>
  );
};

export function stylesFunc({fontFamily}: any) {
  const styles = StyleSheet.create({
    headerStyle: {
      // padding: moderateScaleVertical(16),
      paddingHorizontal: moderateScale(16),
      height: StatusBarHeight,
      paddingTop: 4,
    },

    textStyle: {
  //@ts-ignore
      color: colors.black2Color,
      fontSize: textScale(16),
      lineHeight: textScale(28),
      textAlign: 'center',
      fontWeight: '600',
      fontFamily: fontFamily.regular,
    },
  });
  return styles;
}
export default React.memo(Header);

/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-nocheck
import React, {useState, useRef} from 'react';
import {
  Image,
  // ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  // TextInput,
  I18nManager,
  // Keyboard,
  Pressable,
} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {API_UPLOAD_URL} from '../config/urls';
import imagePath from '../constants/imagePath';
import colors from '../styles/colors';
import commonStylesFunc from '../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../styles/responsiveSize';
import {MyDarkTheme} from '../styles/theme';
import { AdView } from '../Screens/AdsSection/NativeAdView';
let cardWidth = width / 2 - 8;

const MyAddsComponent = ({
  data = {},
  index=0,
  titlestyle,
  selectedTab,
  onPress,
  navigation,
  onPressRateOrder,
  updateOrderStatus,
  onPressReturnOrder,
  etaTime = null,
  cardStyle,
  updateLocalItem,
  showRepeatOrderButton,
  onClickMore,
  onRepeatOrderPress,
}) => {
  
  const {themeColors, themeLayouts, appStyle, themeToggle, themeColor} =
    useSelector(state => state?.initBoot);
  const darkthemeusingDevice = useDarkMode();
  const isDarkMode = themeToggle ? darkthemeusingDevice : themeColor;
  const fontFamily = appStyle?.fontSizeData;

  const styles = stylesFunc({fontFamily, themeColors});

  const [sliderActiveSlide, setActiveSlide] = useState(0);

  const bannerRef = useRef();
  return (
    <>
   
   <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        ...styles.cardStyle,
        backgroundColor: isDarkMode
          ? MyDarkTheme.colors.lightDark
          : colors.white,
        ...cardStyle,
        width:data?.id =='ads' ? width :  cardWidth
      
      }}>
        {!data?.id && <>
          {onClickMore && (
        <Pressable
          hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}
          onPress={() => onClickMore()}
          style={{
            position: 'absolute',
            right: 15,
            zIndex: 1000,
            top: 10,
          }}>
          <Image
            resizeMode="contain"
            // style={{
            //   height:moderateScale(32),width:moderateScale(28)
            // }}
            source={imagePath?.icMoreVer}
          />
        </Pressable>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 0.5,
          // alignItems: 'flex-start',
        }}>
        <FastImage
          style={[
            styles.cardViewStyle,
            {
              width: '100%',
            },
          ]}
          resizeMode={'cover'}
          source={{
            uri: `${API_UPLOAD_URL}/${data?.thumbnail}`,
            priority: FastImage.priority.high,
          }}></FastImage>

        {/* <View style={{

          position: 'absolute',
          bottom: -15,
          left: '25%',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Pagination
            dotsLength={5}
            activeDotIndex={sliderActiveSlide}
            dotColor={'gray'}
            dotStyle={[styles.dotStyle]}
            inactiveDotColor={'black'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.8}
          />
        </View> */}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: moderateScale(12),
          paddingTop: moderateScaleVertical(8),
        }}>
        <View
          style={
            {
              // flex: 0.5,
            }
          }>
          <Text style={[styles.orderLableStyle, {fontWeight: '700'}]}>
            {data?.subcategory}
          </Text>

          <Text style={[styles.orderLableStyle, {fontSize: textScale(12)}]}>
            {data?.categoryname}
          </Text>

          {/* <Text style={[styles.orderLableStyle, {fontSize: textScale(12)}]}>
            {moment(data?.createdDate).format('DD-MM-YYYY')}
          </Text> */}
        </View>

        {/* <View
          style={{
            flex: 0.57,
            alignItems: 'flex-end',
          }}>
          <Text
            style={[
              styles.orderLableStyle,
              {
                fontSize: 12,
                fontWeight: 'bold',
              },
            ]}>
            {`${data?.currencycode} ${data?.price}`}
          </Text>
          <Text style={[styles.orderLableStyle, {fontSize: textScale(12)}]}>
            {moment(data?.createdDate).format('DD-MM-YYYY')}
          </Text>
        </View> */}
      </View>
      <View
        style={{
          paddingHorizontal: moderateScale(12),
          paddingBottom: moderateScaleVertical(8),
        }}>
        <Text
          numberOfLines={1}
          style={[
            styles.orderLableStyle,
            {
              opacity: 0.8,

              lineHeight: 18,
              fontSize: textScale(12),
            },
          ]}>
          {data?.itemName}
        </Text>
        <Text
          style={[
            styles.orderLableStyle,
            {
              fontSize: 12,
              fontWeight: 'bold',
            },
          ]}>
          {`${data?.currencycode} ${data?.price}`}
        </Text>
      </View>
        </>}
     
      {data?.id =='ads' && <AdView loadOnMount={true} index={index} type="image" media={true} />}
    </TouchableOpacity>
   
    </>
  );
};
export function stylesFunc({fontFamily, themeColors}) {
  const commonStyles = commonStylesFunc({fontFamily});

  const styles = StyleSheet.create({
    dotStyle: {height: 8, width: 8, borderRadius: 8 / 2},
    cardStyle: {
      width: cardWidth,
      // ...commonStyles.shadowStyle,
      marginHorizontal: 2,
      justifyContent: 'flex-start',
      padding: moderateScaleVertical(5),
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.borderColorB,
      borderRadius: moderateScale(6),
      paddingHorizontal: 8,
    },
    lableOrders: {
      // ...commonStyles.mediumFont14Normal,
      color: colors.buyBgDark,
      lineHeight: moderateScaleVertical(19),
      fontFamily: fontFamily.medium,
      fontSize: textScale(10),
    },
    valueOrders: {
      color: colors.textGreyB,
      fontFamily: fontFamily.medium,
      fontSize: textScale(10),
      // opacity: 0.6,

      lineHeight: moderateScaleVertical(16),
    },
    cardViewStyle: {
      // alignItems: 'center',
      height: width / 2,
      width: width / 2,
    },
    orderAddEditViews: {
      color: themeColors.primary_color,
      fontFamily: fontFamily.bold,
      fontSize: textScale(14),
    },
    rateOrder: {
      color: themeColors.secondary_color,
      fontFamily: fontFamily.bold,
      fontSize: textScale(16),
    },

    //vendor app order listing styles.
    orderLableStyle: {
      color: colors.black,
      fontFamily: fontFamily.medium,
      fontSize: textScale(14),
      opacity: 0.8,
      lineHeight: 24,
    },
    userName: {
      color: colors.blackC,
      fontFamily: fontFamily.medium,
      fontSize: textScale(12),
    },
    qtyViewStyle: {
      marginHorizontal: moderateScale(15),
      color: colors.textGreyI,
      fontFamily: fontFamily.medium,
      fontSize: textScale(14),
      opacity: 0.6,
    },
    borderStyle: {
      borderWidth: 0.3,
      borderStyle: 'dashed',
      borderRadius: 1,
      borderColor: colors.lightGreyBgColor,
    },
    orderStatusStyle: {
      color: colors.black,
      fontFamily: fontFamily.semiBold,
      fontSize: textScale(12),
    },
    trackOrderTextStyle: {
      color: themeColors.secondary_color,
      fontFamily: fontFamily.regular,
      fontSize: textScale(10),
    },
    orderStatusStyleSecond: {
      color: colors.white,
      fontFamily: fontFamily.medium,
      fontSize: textScale(10),
    },
    orderAcceptAndReadyStyle: {
      backgroundColor: themeColors.primary_color,
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(2),
      borderRadius: moderateScale(8.5),
      alignItems: 'center',
    },
    orderAcceptAndReadyStyleSecond: {
      flex: 0.6,
      backgroundColor: themeColors.primary_color,
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(5),
      borderRadius: moderateScale(3),
      alignItems: 'center',
    },
    orderAccept: {
      backgroundColor: colors.green,
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(5),
      borderRadius: moderateScale(3),
      alignItems: 'center',
    },
    orderReject: {
      backgroundColor: colors.redColor,
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(5),
      borderRadius: moderateScale(3),
      alignItems: 'center',
    },
    imageCardStyle: {
      height: width / 4,
      width: width / 4,
      borderRadius: width / 12,
      marginRight: moderateScale(5),
    },
    circularQuantityView: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColors.primary_color,
      position: 'absolute',
      right: -2,
      top: -2,
      height: 25,
      width: 25,
      borderRadius: 25 / 2,
    },
    qunatityText: {
      color: colors.white,
      fontSize: textScale(10),
      fontFamily: fontFamily.medium,
    },
    scrollableContainer: {
      flexDirection: 'row',
      // marginBottom: moderateScaleVertical(10),
      alignItems: 'center',
      flexWrap: 'wrap',
      paddingVertical: moderateScale(10),
    },
    currentStatusView: {
      paddingHorizontal: moderateScale(10),
      paddingVertical: moderateScale(2),
      borderRadius: moderateScale(8.5),
      alignItems: 'center',
    },
    trackStatusView: {
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(8),
      borderRadius: moderateScale(8),
      alignItems: 'center',
    },
    bottomFirstHalf: {
      flex: 0.4,
      alignItems: 'flex-start',
      justifyContent: 'center',
      // flexWrap:'wrap'
    },
    bottomSecondHalf: {
      flex: 0.6,
      alignItems: 'flex-end',
      justifyContent: 'center',
      // backgroundColor: 'black',
      // flexWrap:'wrap'
    },
    ariveTextStyle: {
      fontFamily: fontFamily.bold,
      fontSize: textScale(11),
    },
    ariveView: {
      padding: moderateScale(6),
      borderTopRightRadius: moderateScale(6),
      borderTopLeftRadius: moderateScale(6),
    },
    reasonText: {
      flex: 1,
      fontFamily: fontFamily.medium,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      fontSize: textScale(11),
    },
  });
  return styles;
}
export default React.memo(MyAddsComponent);

import {Platform, StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../styles/responsiveSize';

export default ({themeColors,fontFamily}: any) => {
  const styles = StyleSheet.create({
    currency: {
      color: colors.blackB,
      // textAlign: 'center',
      fontFamily: fontFamily.regular,
      fontSize: textScale(14),
    },
    darkAppearanceTextStyle: {
      lineHeight: 24,
      color: colors.blackB,
      // textAlign: 'center',
      fontFamily: fontFamily.regular,
      fontSize: textScale(14),
    },
    dropDownTouch: {
      marginHorizontal: moderateScale(20),
      paddingVertical: moderateScaleVertical(10),
      paddingHorizontal: moderateScale(15),
      justifyContent: 'space-between',

      borderWidth: 0.5,

      borderRadius: moderateScale(5),
    },
    row:{
      flexDirection: 'row',
      marginHorizontal: moderateScale(20),
      justifyContent: 'space-between',
      paddingTop: moderateScaleVertical(10),
      paddingHorizontal: moderateScale(5),
      borderColor:colors.blackOpacity20,
    }, loginView: {
      marginTop: moderateScaleVertical(30),
      marginBottom:
        Platform.OS === 'ios'
          ? moderateScaleVertical(10)
          : moderateScaleVertical(100),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchAbleLoginVIew: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginLogoutText: {
      //@ts-ignore
      ...commonStyles.futuraHeavyBt,
      color: themeColors?.primary_color,
      marginRight: 8,
    },
  });
  return styles;
};

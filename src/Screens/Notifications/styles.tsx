//@ts-nocheck
import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import commonStylesFunc from '../../styles/commonStyles';
import {textScale} from '../../styles/responsiveSize';

export default ({fontFamily}) => {
  const commonStyles = commonStylesFunc({fontFamily});
  const styles = StyleSheet.create({
    backTextWhite: {
      color: '#FFF',
      fontFamily: fontFamily.bold,
      fontSize: textScale(12),
    },
    rowFront: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // paddingLeft: 15,
    },
    backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
    },
    backRightBtnLeft: {
      backgroundColor: 'red',
      right: 72,
    },
    backRightBtnRight: {
      backgroundColor: 'green',
      right: 0,

    },
    approve: {
      backgroundColor: 'green',
      paddingHorizontal:16,
      paddingVertical:8,
      marginHorizontal:16,
      marginTop:16,
      flex:0.3,
      borderRadius:4

    },
    reject:{
      backgroundColor: 'red',
      paddingHorizontal:16,
      paddingVertical:8,
      marginTop:16,
      flex:0.3,
      borderRadius:4
    },



    container: {
      backgroundColor: colors.white,
      paddingHorizontal: 15,
      paddingVertical:15
    },
    status: {
      color: colors.yellowText,
      textTransform: 'uppercase',
      fontFamily: fontFamily.bold,
      fontSize: textScale(12),
    },
    mesasge: {
      ...commonStyles.mediumFont14Normal,
      color: colors.buyBgDark,
      lineHeight:24
    },
    time: {
      color: colors.buyBgDark,
      fontFamily: fontFamily.regular,
      fontSize: textScale(12),
      opacity: 0.5,
      lineHeight:24
    },
    headerLine: {
      ...commonStyles.headerTopLine,
    },
  });
  return styles;
};

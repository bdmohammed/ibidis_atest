import {StyleSheet} from 'react-native';
// import {useDarkMode} from 'react-native-dynamic';
// import colors from '../../styles/colors';
// import {
//   height,
//   moderateScale,
//   moderateScaleVertical,
//   textScale,
//   width,
// } from '../../styles/responsiveSize';
// import {MyDarkTheme} from '../../styles/theme';

export default () => {
  const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      // left: 0,
      // right: 0,
      // bottom: 0,
      // top: height - height / 3,
      // borderRadius: moderateScale(25),
      // overflow: 'hidden',
      justifyContent: 'flex-start',
      // paddingBottom: moderateScaleVertical(30),
      // maxHeight: height / 2,
    },
    loadMoreBtn: {
      padding: 10,
      backgroundColor: '#800000',
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    btnText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
    },
  });

  return styles;
};

import {StyleSheet} from 'react-native';
import colors from '../styles/colors';
import { itemWidth, moderateScale } from '../styles/responsiveSize';

const styles = StyleSheet.create({
    mainModalContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        marginBottom:moderateScale(25),
        width: itemWidth-moderateScale(20),
        alignSelf: 'center',
    },

    modalSeparator: {
        height: moderateScale(0.6),
        opacity: 0.5,
        backgroundColor: 'rgba(17, 17, 17, 0.4)'
    },
    modalTopLabel:{
        paddingVertical: moderateScale(15),
        fontSize: moderateScale(13),
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        color: '#8f8f8f'
    },
    modalInnerContainer: {
        borderRadius: moderateScale(14),
        backgroundColor: '#FFFFFF'
    },
    modalDismissContainer: {
        borderRadius: moderateScale(14),
        marginTop: moderateScale(8),
        backgroundColor: '#fff'
    },
    modalActionLabel: {
        fontSize: moderateScale(18),
        textAlign: 'center',
        color: colors.themeColor,
        fontWeight: 'normal',
        fontStyle: 'normal',
        paddingVertical: moderateScale(16)
    },
    modalLabelDismiss: {
        fontSize: moderateScale(20),
        textAlign: 'center',
        color: colors.themeColor,
        fontStyle: 'normal',
        paddingVertical: moderateScale(16),
        fontWeight: '600'
    },

});

export default styles

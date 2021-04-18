import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/index';

export const RestaurantStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    },
    looping: {
        flex: 1,
        flexDirection:"column",
        width: SIZES.width,
        height: SIZES.height,
        alignItems: 'center',
        justifyContent: "center",
    },
   
})
import React from 'react';

import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'

import { icons, images, SIZES, FONTS, COLORS } from '../constants/index';
import { HomeStyles } from './styles/HomeStyles';

//database
import { restaurantData, categoryData, initialCurrentLocation } from '../database/HomeDataBase';

const renderHeader = () => {

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', height: 50, marginTop: 30 }}>
            <TouchableOpacity
                style={{
                    width: 50,
                    paddingLeft: SIZES.padding * 1,
                    justifyContent: 'center'
                }}>
                <Image
                    source={icons.nearby}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
            </TouchableOpacity>
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: COLORS.lightGray3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: SIZES.radius
                }}>
                    <Text>Localização atual</Text>
                </View>
            </View>
            <TouchableOpacity
                style={{
                    width: 50,
                    paddingLeft: SIZES.padding * 1,
                    justifyContent: 'center'
                }}>
                <Image
                    source={icons.basket}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}




const Home = () => {
    return (
        <SafeAreaView style={HomeStyles.container}>
            {renderHeader()}
        </SafeAreaView>
    )
}

export default Home;
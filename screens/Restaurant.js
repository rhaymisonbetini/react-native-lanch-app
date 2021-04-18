import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    ActivityIndicator
} from 'react-native'
import { icons, SIZES, FONTS, COLORS } from '../constants/index';
import { RestaurantStyles } from './styles/RestaurantStyles';

import { restaurantData } from '../database/HomeDataBase';

const Restaurant = ({ route }) => {

    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null)

    React.useEffect(() => {
        let { item, currentLocation } = route.params;
        let currentRestaurant = restaurantData.find(rest => rest.id == item.id);
        setCurrentLocation(currentLocation);
        setTimeout(() => {
            setRestaurant(currentRestaurant);
        }, 3000)

    }, [])


    const renderHeader = () => {

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', height: 50, marginTop: 30 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding,
                        justifyContent: 'center'
                    }}>
                    <Image
                        source={icons.back}
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
                        <Text>{currentLocation?.streetName}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding,
                        justifyContent: 'center'
                    }}>
                    <Image
                        source={icons.list}
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

    const renderFoodInfo = () => {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
            >
                {
                    !restaurant ?
                        <View style={[RestaurantStyles.looping]}>
                            <ActivityIndicator size="large" color="#FC6D3F" />
                            <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Carregando Lanche</Text>
                        </View>
                        :
                        restaurant?.menu.map((item, index) => (
                            <View
                                key={`menu-${index}`}
                                style={{
                                    alignItems: 'center'
                                }}>
                                <View style={{ height: SIZES.height * 0.35 }}>
                                    <Image
                                        source={item.photo}
                                        resizeMode="cover"
                                        style={{
                                            width: SIZES.width,
                                            height: '100%'
                                        }}
                                    />
                                    <View
                                        style={{
                                            position: 'absolute',
                                            bottom: -20,
                                            width: SIZES.width,
                                            height: 50,
                                            justifyContent: 'center',
                                            flexDirection: 'row'
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                width: 50,
                                                backgroundColor: COLORS.white,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderTopLeftRadius: 25,
                                                borderBottomLeftRadius: 25
                                            }}
                                        >
                                            <Text style={{ ...FONTS.body1 }}> - </Text>
                                        </TouchableOpacity>
                                        <View
                                            style={{
                                                width: 50,
                                                backgroundColor: COLORS.white,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Text>0</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                width: 50,
                                                backgroundColor: COLORS.white,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderTopRightRadius: 25,
                                                borderBottomRightRadius: 25
                                            }}
                                        >
                                            <Text style={{ ...FONTS.body1 }}> + </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                }

            </Animated.ScrollView>
        )
    }

    return (
        <SafeAreaView style={RestaurantStyles.container}>
            {renderHeader()}
            {renderFoodInfo()}
        </SafeAreaView>
    )
}

export default Restaurant;
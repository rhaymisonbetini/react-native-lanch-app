import React from 'react';
import {
    SafeAreaView,
    ScrollView,
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

    const scrollX = new Animated.Value(0);
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
            <ScrollView>

                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ], { useNativeDriver: false })}
                >
                    {

                        restaurant?.menu.map((item, index) => (
                            <View
                                key={`menu-${index}`}
                                style={{
                                    alignItems: 'center',
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
                                <View
                                    style={{
                                        width: SIZES.width,
                                        alignItems: 'center',
                                        marginTop: 15,
                                        paddingHorizontal: SIZES.padding * 2
                                    }}
                                >
                                    <Text style={{
                                        marginVertical: 10,
                                        textAlign: 'center',
                                        ...FONTS.h1
                                    }} >
                                        {item.name}
                                    </Text>
                                    <Text style={{
                                        textAlign: 'center',
                                        ...FONTS.h1
                                    }} >
                                        R$ {item.price.toFixed(2)}
                                    </Text>
                                    <Text style={{
                                        ...FONTS.body3,
                                        textAlign: 'center',
                                    }} >
                                        {item.description}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10
                                    }}
                                >
                                    <Image
                                        source={icons.fire}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            marginRight: 10
                                        }}
                                    />
                                    <Text> Cal. {item.calories.toFixed(2)}</Text>
                                </View>
                            </View>
                        ))
                    }

                </Animated.ScrollView>
            </ScrollView>
        )
    }

    const renderDots = () => {
        const dotPostion = Animated.divide(scrollX, SIZES.width);

        return (
            <View style={{ height: 30, marginTop: 20 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: SIZES.padding
                    }}
                >
                    {
                        restaurant?.menu.map((item, index) => {

                            const opacity = dotPostion.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: 'clamp'
                            })

                            const dotSize = dotPostion.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                                extrapolate: 'clamp'
                            })

                            const dotColor = dotPostion.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                                extrapolate: 'clamp'
                            })

                            return (
                                <Animated.View
                                    key={`dot-${index}`}
                                    opacity={opacity}
                                    style={{
                                        borderRadius: SIZES.radius,
                                        marginHorizontal: 6,
                                        width: dotSize,
                                        height: dotSize,
                                        backgroundColor: dotColor
                                    }}

                                />
                            )
                        })
                    }

                </View>
            </View>
        )
    }

    const renderOrder = () => {


        return (
            <View>
                {
                    renderDots()
                }
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>
                            Itens do Carrinho
                        </Text>
                        <Text style={{ ...FONTS.h3 }}>
                            R$ 45,50
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.pin}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Localização</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={icons.master_card}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.darkgray
                                }}
                            />
                            <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>6969</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius
                            }}
                        >
                            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Finalizar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        )
    }

    return (
        <>
            {
                !restaurant ?
                    <View style={[RestaurantStyles.looping]}>
                        <ActivityIndicator size="large" color="#FC6D3F" />
                        <Text style={{ ...FONTS.h3, color: COLORS.primary }}>Carregando Lanche</Text>
                    </View>
                    :

                    <SafeAreaView style={RestaurantStyles.container}>
                        {

                        }
                        {renderHeader()}
                        {renderFoodInfo()}
                        {renderOrder()}
                    </SafeAreaView>
            }
        </>
    )
}

export default Restaurant;
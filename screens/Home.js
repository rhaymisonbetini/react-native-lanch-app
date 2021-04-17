import React, { useState } from 'react';

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



const Home = () => {

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)

    const renderHeader = () => {

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
                        <Text>{initialCurrentLocation.streetName}</Text>
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

    const onSelectItem = (item) => {
        let restaurantList = restaurantData.filter(restaurant => restaurant.categories.includes(item.id))
        setRestaurants(restaurantList);
        setSelectedCategory(item)
    }

    function renderMainCategories() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor:  COLORS.primary,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: SIZES.padding,
                        ...HomeStyles.shadow
                    }}
                    onPress={() => onSelectItem(item)}
                >
                    <View style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.white
                    }}>
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>
                    <Text style={{
                        marginTop: SIZES.padding,
                        color: COLORS.white,
                        ...FONTS.body5
                    }}>
                        {item.name}
                    </Text>

                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h1 }}>Os</Text>
                <Text style={{ ...FONTS.h1 }}>mais pedidos</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: SIZES.padding * 2 }}

                />
            </View>
        )
    }

    return (
        <SafeAreaView style={HomeStyles.container}>
            {renderHeader()}
            {renderMainCategories()}
        </SafeAreaView>
    )
}

export default Home;
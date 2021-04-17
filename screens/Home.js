import React from 'react';

import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native'

import { icons, SIZES, FONTS, COLORS } from '../constants/index';
import { HomeStyles } from './styles/HomeStyles';

//database
import { restaurantData, categoryData, initialCurrentLocation } from '../database/HomeDataBase';



const Home = ({ navigation }) => {

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)

    const onSelectItem = (item) => {
        let restaurantList = restaurantData.filter(restaurant => restaurant.categories.includes(item.id))
        setRestaurants(restaurantList);
        setSelectedCategory(item)
    }

    const getCategorieNameById = (categorie) => {

        let category = categories.filter(catego => catego.id == categorie)
        if (category.length > 0) {
            return category[0].name
        } else {
            return ""
        }

    }

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
                        paddingLeft: SIZES.padding,
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

    function renderMainCategories() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    activeOpacity={1.0}
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.secondary,
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
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray3,
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
            <View style={{ padding: SIZES.padding }}>
                <Text style={{ ...FONTS.h1 }}>Os</Text>
                <Text style={{ ...FONTS.h1 }}>mais pedidos</Text>
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ padding: SIZES.padding * 1 }}

                />
            </View>
        )
    }

    const renderRestaurantList = () => {

        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={1.0}
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Restaurant", { item, currentLocation })}
            >
                <View
                    style={{ marginBottom: SIZES.padding }}
                >
                    <Image
                        source={item.photo}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 50,
                            width: SIZES.width * 0.3,
                            borderTopRightRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.lightGray3,
                            ...HomeStyles.shadow
                        }}
                    >
                        <Text>
                            {item.duration}
                        </Text>
                    </View>
                </View>
                <Text style={{ ...FONTS.body2 }}>{item.name}</Text>
                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text>{item.rating}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            item.categories.map((categorie) => {
                                return (
                                    <View
                                        style={{
                                            flexDirection: 'row'
                                        }}
                                        key={categorie}
                                    >
                                        <Text style={{ ...FONTS.body3 }}>{getCategorieNameById(categorie)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }

                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={HomeStyles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

export default Home;
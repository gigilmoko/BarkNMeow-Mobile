import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from "react-native-paper";
import { iconOptions } from "../../screens/ProductDetails";

const CartItem = ({
    name,
    amount,
    qty,
    stock,
    index,
    imgSrc,
    id,
    price,
    decrementHandler,
    incrementhandler,
    addToWishlistHandler,
    navigate,
}) => {

    return (
        <TouchableOpacity
            // key={data.key}
            onPress={() => navigate.navigate('productdetails', {id})}
            style={{
                width: '100%',
                height: 100,
                marginVertical: 6,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <View
                style={{
                    width: '30%',
                    height: 100,
                    padding: 14,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "#F4B546",
                    borderRadius: 10,
                    marginRight: 22,
                }}>
                <Image
                    source={{
                        uri: imgSrc,
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    }}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    height: '100%',
                    justifyContent: 'space-around',
                }}>
                <View style={{}}>
                    <Text
                        style={{
                            fontSize: 14,
                            maxWidth: '100%',
                            color: '#000000',
                            fontWeight: '600',
                            letterSpacing: 1,
                        }}>
                        {name}
                    </Text>
                    <View
                        style={{
                            marginTop: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            opacity: 0.6,
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                maxWidth: '85%',
                                marginRight: 4,
                            }}>
                            ${amount}
                        </Text>
                        {/* <Text>
                            (~&#8377;
                            {data.productPrice + data.productPrice / 20})
                        </Text> */}
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            onPress={() => decrementHandler(id, name, amount, imgSrc, stock, qty)}
                        >
                            <View
                                style={{
                                    borderRadius: 100,
                                    marginRight: 20,
                                    padding: 4,
                                    borderWidth: 1,
                                    borderColor: '#B9B9B9',
                                    opacity: 0.5,
                                }}>
                                <MaterialCommunityIcons
                                    name="minus"
                                    style={{
                                        fontSize: 16,
                                        color: '#777777',
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                        <Text>{qty}</Text>
                        <TouchableOpacity
                            onPress={() => incrementhandler(id, name, amount, imgSrc, stock, qty)}
                        >
                            <View
                                style={{
                                    borderRadius: 100,
                                    marginLeft: 20,
                                    padding: 4,
                                    borderWidth: 1,
                                    borderColor: '#B9B9B9',
                                    opacity: 0.5,
                                }}>
                                <MaterialCommunityIcons
                                    name="plus"
                                    style={{
                                        fontSize: 16,
                                        color: '#777777',
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => addToWishlistHandler(id, name, price, imgSrc, stock)}>
                        <MaterialCommunityIcons
                            name="cards-heart-outline"
                            style={{
                                fontSize: 16,
                                color: '#777777',
                                backgroundColor: '#F0F0F3',
                                padding: 8,
                                borderRadius: 100,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CartItem;
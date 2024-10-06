import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Button } from "react-native-paper";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductCard = ({
    stock,
    name,
    price,
    image,
    id,
    addToCardHandler,
    addToWishlistHandler,
    i,
    navigate,
}) => {
    const isOutOfStock = stock === 0;

    // Function to truncate the name if it exceeds a certain number of lines
    const truncateName = (name, maxLength) => {
        if (name.length > maxLength) {
            return name.substring(0, maxLength) + '...';
        }
        return name;
    };

    return (
        <TouchableOpacity
            onPress={() => navigate.navigate("productdetails", { id })} style={{
                width: '48%',
                
                marginVertical: 14,
            }}>
            <View
                style={{
                    width: '100%',
                    height: 140,
                    borderRadius: 10,
                    backgroundColor: '#F0F0F3',
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                }}>
                <Image
                    source={{
                        uri: image,
                    }}
                    style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain',
                    }}
                />
            </View>
            <Text
                style={{
                    fontSize: 16,
                    color: '#000000',
                    fontWeight: '600',
                    marginBottom: 2,
                }}>
                {truncateName(name, 50)}
            </Text>
            {isOutOfStock ? (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <FontAwesome
                        name="circle"
                        style={{
                            fontSize: 12,
                            marginRight: 6,
                            color: '#C04345',
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#C04345',
                        }}>
                        Unavailable
                    </Text>
                </View>

            ) : (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <FontAwesome
                        name="circle"
                        style={{
                            fontSize: 12,
                            marginRight: 6,
                            color: '#00AC76',
                        }}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            color: '#00AC76',
                        }}>
                        Available
                    </Text>
                </View>
            )}
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: '#e84219',
                    marginBottom: 4,
                }}
                className="text-semibold text-md">$ {price}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#F4B546",
                    borderRadius: 0,
                    paddingVertical: 4,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                    width: "100%",
                }}
            >
                <Button
                    onPress={() => addToCardHandler(id, name, price, image, stock)}
                    textColor="rgb(45,45,45)"
                    style={{ flex: 4 }}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
                </Button>
                <TouchableOpacity
                    onPress={() => addToWishlistHandler(id, name, price, image, stock)}
                    style={{ flex: 2, padding: 4 }}
                >
                    <FontAwesome
                        name="heart"
                        size={18}
                        color="#ffffff"
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

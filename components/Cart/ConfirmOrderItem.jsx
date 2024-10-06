import { View, Text, Image } from "react-native";
import React from "react";

const ConfirmOrderItem = ({ price, quantity, image, name }) => {
    return (
        <View
            style={{
                width: '100%',
                height: 100,
                marginVertical: 6,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
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
                        uri: image,
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

                        <Text style={{ marginHorizontal: 10 }}>{quantity}</Text>
                        <Text style={{ marginHorizontal: 10 }}>x</Text>
                        <Text style={{ marginHorizontal: 10 }}>${price}</Text>

                    </View>

                </View>
            </View>
        </View>
    );
};

export default ConfirmOrderItem;
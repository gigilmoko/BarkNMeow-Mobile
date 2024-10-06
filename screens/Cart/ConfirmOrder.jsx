import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
} from 'react-native';
// import { COLOURS, Items } from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmOrderItem from '../../components/Cart/ConfirmOrderItem'
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { placeOrder } from "../../redux/actions/cartActions";
import Header from '../../components/Layout/Header';


const ConfirmOrder = () => {
    const navigate = useNavigation();
    const { user } = useSelector((state) => state.user);

    const { cartItems } = useSelector((state) => state.cart)

    const [itemsPrice] = useState(cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0));
    const [shippingCharges] = useState(itemsPrice > 1000 ? 0 : 200);
    const [tax] = useState(Number((0.18 * itemsPrice).toFixed()));
    const [totalAmount] = useState(itemsPrice + shippingCharges + tax);

    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#ffffff',
                position: 'relative',
            }}>
            <Header back={true} />
                <Text
                    style={{
                        fontSize: 20,
                        color: '#000000',
                        fontWeight: '500',
                        letterSpacing: 1,
                        paddingTop: 20,
                        paddingLeft: 16,
                        marginBottom: 10,
                    }}>
                    Confirm Order
                </Text>
                <ScrollView>
                <View style={{ paddingHorizontal: 16 }}>
                    {cartItems.map((i) => (
                        <ConfirmOrderItem
                            key={i.product}
                            price={i.price}
                            image={i.image}
                            name={i.name}
                            quantity={i.quantity}
                        />
                    ))}
                </View>
            </ScrollView>
            <View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        // marginVertical: 10,
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#000000',
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>
                        Delivery Location
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '80%',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    color: '#0043F9',
                                    backgroundColor: '#F0F0F3',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 12,
                                    borderRadius: 10,
                                    marginRight: 18,
                                }}>
                                <MaterialCommunityIcons
                                    name="truck-delivery-outline"
                                    style={{
                                        fontSize: 20,
                                        color: '#0043F9',
                                    }}
                                />
                            </View>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#000000',
                                        fontWeight: '500',
                                    }}>
                                    {user?.address}, {user?.city}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#000000',
                                        fontWeight: '400',
                                        lineHeight: 20,
                                        opacity: 0.5,
                                    }}>
                                    {user?.country}, {user?.pinCode}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        paddingHorizontal: 16,
                        marginTop: 40,
                        marginBottom: 80,
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            color: '#000000',
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>
                        Order Info
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                        }}>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '400',
                                maxWidth: '80%',
                                color: '#000000',
                                opacity: 0.5,
                            }}>
                            Subtotal
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                color: '#000000',
                                opacity: 0.8,
                            }}>
                            ${itemsPrice}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                maxWidth: '80%',
                                color: '#000000',
                                opacity: 0.5,
                            }}>
                            Shipping
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                color: '#000000',
                                opacity: 0.8,
                            }}>
                            {shippingCharges}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 22,
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                maxWidth: '80%',
                                color: '#000000',
                                opacity: 0.5,
                            }}>
                            Tax
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '400',
                                color: '#000000',
                                opacity: 0.8,
                            }}>
                            {tax}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '500',
                                maxWidth: '80%',
                                color: '#000000',
                                opacity: 0.5,
                            }}>
                            Total Payment
                        </Text>
                        <Text
                            style={{
                                fontSize: 24,
                                fontWeight: '500',
                                color: '#e84219',
                            }}>
                            ${totalAmount}
                        </Text>
                    </View>
                </View>
            </View>


            <View
                style={{
                    position: 'absolute',
                    bottom: 10,
                    height: '8%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() =>
                        navigate.navigate("payment", {
                            itemsPrice,
                            shippingCharges,
                            tax,
                            totalAmount,
                        })
                    }
                    style={{
                        width: '86%',
                        height: '90%',
                        backgroundColor: '#bc430b',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons
                            name="chevron-right"
                            style={{ fontSize: 22, color: '#ffffff', marginRight: 10 }}
                        />
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                letterSpacing: 1,
                                color: '#ffffff',
                                textTransform: 'uppercase',
                            }}
                        >
                            Payment
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ConfirmOrder;
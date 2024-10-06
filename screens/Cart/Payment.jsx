import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
// import { colors, defaultStyle } from "../styles/styles";
import Header from "../../components/Layout/Header";
// import Heading from "../components/Heading";
import { Button, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../redux/actions/orderActions";
import { useMessageAndErrorOrder } from "../../utils/hooks";
import { useStripe } from "@stripe/stripe-react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import { server } from "../../redux/store";
import Loader from "../../components/Layout/Loader";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Payment = ({ navigation, route }) => {
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loaderLoading, setLoaderLoading] = useState(false);

    const dispatch = useDispatch();
    const stripe = useStripe();

    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);

    const redirectToLogin = () => {
        navigation.navigate("login");
    };

    const codHandler = (paymentInfo) => {
        const shippingInfo = {
            address: user.address,
            city: user.city,
            country: user.country,
            pinCode: user.pinCode,
        };

        const itemsPrice = route.params.itemsPrice;
        const shippingCharges = route.params.shippingCharges;
        const taxPrice = route.params.tax;
        const totalAmount = route.params.totalAmount;

        dispatch(
            placeOrder(
                cartItems,
                shippingInfo,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingCharges,
                totalAmount,
                paymentInfo
            )
        );
    };
    const onlineHandler = async () => {
        try {
            const {
                data: { client_secret },
            } = await axios.post(
                `${server}/order/payment`,
                {
                    totalAmount: route.params.totalAmount,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            const init = await stripe.initPaymentSheet({
                paymentIntentClientSecret: client_secret,
                merchantDisplayName: "6PackEcom",
            });

            if (init.error)
                return Toast.show({ type: "error", text1: init.error.message });

            const presentSheet = await stripe.presentPaymentSheet();
            setLoaderLoading(true);

            if (presentSheet.error) {
                setLoaderLoading(false);
                return Toast.show({ type: "error", text1: presentSheet.error.message });
            }

            const { paymentIntent } = await stripe.retrievePaymentIntent(
                client_secret
            );

            if (paymentIntent.status === "Succeeded") {
                codHandler({ id: paymentIntent.id, status: paymentIntent.status });
            }
        } catch (error) {
            console.log(error); // Add this line to log the error
            return Toast.show({
                type: "error",
                text1: "Some Error",
                text2: error,
            });
        } finally {
            setLoaderLoading(false); // Ensure loaderLoading is set to false in all cases
        }
    };



    const loading = useMessageAndErrorOrder(
        dispatch,
        navigation,
        "profile",
        () => ({
            type: "clearCart",
        })
    );

    console.log(loading);
    console.log(paymentMethod);

    return loaderLoading ? (
        <Loader />
    ) : (
        <>
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
                    Payment
                </Text>

                <View className="bg-white p-4 rounded shadow-md">
                    <Text className="text-lg font-semibold mb-4">Payment Method</Text>
                    <View className="flex flex-col">
                        <RadioButton.Group
                            onValueChange={setPaymentMethod}
                            value={paymentMethod}
                        >
                            <View className="flex flex-row items-center justify-between mb-4">
                                <Text className="text-base font-semibold text-black">Cash On Delivery</Text>
                                <RadioButton color="#c70049" value={"COD"} />
                            </View>
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-base font-semibold text-black">ONLINE</Text>
                                <RadioButton color="#c70049" value={"ONLINE"} />
                            </View>
                        </RadioButton.Group>
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
                        disabled={loading}
                        onPress={
                            !isAuthenticated
                                ? redirectToLogin
                                : paymentMethod === "COD"
                                    ? () => codHandler()
                                    : () => onlineHandler()
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
                                name={paymentMethod === "COD" ? "check-circle" : "circle-multiple-outline"}
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
                                {paymentMethod === "COD" ? "Place Order" : "Pay"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
};


export default Payment;
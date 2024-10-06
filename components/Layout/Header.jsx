import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
// import { colors } from "../styles/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

const Header = ({ back, emptyCart = false, emptyWishlist = false }) => {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();

    const emptyCartHandler = () => {
        dispatch({
            type: "clearCart",
        });
    };

    const emptyWishlistHandler = () => {
        dispatch({
            type: "clearWishlist",
        });
    };

    const handleCartPress = () => {
        if (emptyCart) {
            emptyCartHandler();
        } else {
            navigate.navigate("cart");
        }
    };

    const handleWishlistPress = () => {
        if (emptyWishlist) {
            emptyWishlistHandler();
        } else {
            navigate.navigate("wishlist");
        }
    };


    return (
        <>
            <View
                style={{
                    marginTop: 10,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 16,
                }}>
                {back && (
                    <TouchableOpacity
                        style={{ backgroundColor: "#bc430b" }}
                        onPress={() => navigate.goBack()}
                        className="p-2 rounded-tr-2xl rounded-bl-2xl mt-2"
                    >
                        <Entypo
                            name="chevron-left"
                            style={{
                                fontSize: 18,
                                color: '#ffffff',
                            }}
                        />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 20,
                        top: 25,
                        zIndex: 10,
                    }}
                    onPress={() => {
                        if (emptyCart) {
                            handleCartPress();
                        } else if (emptyWishlist) {
                            handleWishlistPress();
                        }
                    }}
                >
                    {emptyCart ? (
                        <Ionicons
                            name={emptyCart ? "trash-outline" : "cart-outline"}
                            size={30}
                            style={{
                                color: route.name === "productdetails" ? "#ffffff" : "#FB6831",
                            }}
                        />
                    ) : emptyWishlist ? (
                        <Ionicons name="trash-outline"
                            style={{
                                fontSize: 30,
                                color: "#FB6831",
                            }}
                        />

                    ) : (
                        <Ionicons name="heart-outline" size={30} color="#FB6831" />
                    )}
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Header;

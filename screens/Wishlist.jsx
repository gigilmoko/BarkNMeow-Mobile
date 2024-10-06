import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import WishListCard from "../components/WishlistCard";
import Header from "../components/Layout/Header";

const Wishlist = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch();

    const { wishlistItems } = useSelector((state) => state.wishlist);
    const cart = useSelector(state => state.cart.cartItems);

    const removeWishlistHandler = (id) => {
        dispatch({ type: "removeFromWishlist", payload: id });
    };

    const addToCardHandler = (id, name, price, image, stock) => {
        if (stock === 0)
            return Toast.show({
                type: "error",
                text1: "Out Of Stock",
            })
            
            const cartItem = cart.find(item => item.product === id);

            if (cartItem) {
                dispatch({ type: "removeFromWishlist", payload: id });

                return Toast.show({
                    type: "info",
                    text1: "Already in the cart.",
                });
            } else {
                dispatch({
                    type: "addToCart",
                    payload: {
                        product: id,
                        name,
                        price,
                        image,
                        stock,
                        quantity: 1,
                    },
                });
                dispatch({ type: "removeFromWishlist", payload: id });
        
                Toast.show({
                    type: "success",
                    text1: "Added To Cart",
                });
            }

        
    };


    return (
        <>
            <Header back={true} emptyWishlist={true} />

            <View style={styles.container}>
                <View style={styles.screenNameContainer}>
                    <View>
                        <Text style={styles.screenNameText}>My Wishlist</Text>
                    </View>
                    <View>
                        <Text style={styles.screenNameParagraph}>
                            View, add or remove products from wishlist for later purchase
                        </Text>
                    </View>
                </View>
                <ScrollView
                    style={{ flex: 1, width: "100%", padding: 20 }}
                    showsVerticalScrollIndicator={false}
                >

{wishlistItems.length > 0 ? (
                    wishlistItems.map((i, index) => (
                        <WishListCard
                            navigate={navigate}
                            key={i.product}
                            id={i.product}
                            name={i.name}
                            stock={i.stock}
                            price={i.price}
                            imgSrc={i.image}
                            index={index}
                            removeWishlistHandler={removeWishlistHandler}
                            addToCartHandler={addToCardHandler}
                        />
                    ))
                    // < View style={styles.emptyView}></View>
                ) : (
                    <View style={styles.ListContiainerEmpty}>
                        <Text style={styles.secondaryTextSmItalic}>
                            "There are no product in wishlist yet."
                        </Text>
                    </View>
                )}
            </ScrollView >
        </View >
        </>
    );
};

export default Wishlist;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    topBarContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    toBarText: {
        fontSize: 15,
        fontWeight: "600",
    },
    screenNameContainer: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    screenNameText: {
        fontSize: 30,
        fontWeight: "800",
        color: "#000000",
    },
    screenNameParagraph: {
        marginTop: 5,
        fontSize: 15,
    },
    bodyContainer: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    emptyView: {
        height: 20,
    },
    ListContiainerEmpty: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    secondaryTextSmItalic: {
        fontStyle: "italic",
        fontSize: 15,
        color: "#707981",
    },
});

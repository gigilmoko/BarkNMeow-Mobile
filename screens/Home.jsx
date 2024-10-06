import React, { useState, useEffect } from 'react';
import Footer from "../components/Layout/Footer";
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
// import {COLOURS, Items} from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/productActions";
import { useSetCategories } from "../utils/hooks";
import ProductCard from '../components/ProductCard';
import { Avatar, Button } from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import Header from '../components/Layout/Header';

const Home = () => {
    const [category, setCategory] = useState("");
    const [activeSearch, setActiveSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const slides = [
        require("../assets/images/banner/banner1.png"),
        require("../assets/images/banner/banner2.png"),
    ];

    const navigate = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { products } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.user);
    const wishlist = useSelector(state => state.wishlist.wishlistItems) || [];
    const cart = useSelector(state => state.cart.cartItems);

    console.log(user)
    const categoryButtonHandler = (id) => {
        setCategory(id);
    };


    const addToCardHandler = (id, name, price, image, stock) => {
        if (!user || user === undefined || Object.keys(user).length === 0) {
            navigate.navigate("login");
            return Toast.show({
                type: "info",
                text1: "Log in to continue.",
            });
            
        }
        const cartItem = cart.find(item => item.product === id);

    if (cartItem) {
        if (cartItem.quantity < stock) {
            dispatch({
                type: "updateCartQuantity",
                payload: {
                    product: id,
                    quantity: 1,
                },
            });

            Toast.show({
                type: "info",
                text1: "Already in Cart. Quantity +1",
            });
        } else {
            Toast.show({
                type: "info",
                text1: "Cannot add more. Stock limit reached.",
            });
        }
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

        Toast.show({
            type: "success",
            text1: "Added To Cart",
        });
    }

    if (stock === 0)
        return Toast.show({
            type: "error",
            text1: "Out Of Stock",
        });

    };

    const addToWishlistHandler = (id, name, price, image, stock) => {
        if (!user) {
            navigate.navigate("login"); 
            return;
        }

        const isAlreadyInWishlist = wishlist.some(item => item.product === id);

        if (isAlreadyInWishlist) {
            Toast.show({
                type: "info",
                text1: "Already in Wishlist",
            });
        } else {
            dispatch({
                type: "addToWishlist",
                payload: {
                    product: id,
                    name,
                    price,
                    image,
                    stock,
                }
            });
    
            Toast.show({
                type: "success",
                text1: "Added To Wishlist",
            });
        }
    };

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setCategory(categoryId === null ? "" : categoryId);
    };

    useSetCategories(setCategories, isFocused);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            dispatch(getAllProducts(searchQuery, category, ""));
        }, 200);
        return () => {
            clearTimeout(timeOutId);
        };
    }, [dispatch, searchQuery, category, isFocused]);


    return (
        <>
            <View
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: "#ffffff",
                }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.promotiomSliderContainer}>
                        <SliderBox
                            images={slides}
                            sliderBoxHeight={140}
                            dotColor="#FB6831"
                            inactiveDotColor="#707981"
                            paginationBoxVerticalPadding={10}
                            autoplayInterval={1000}
                        />
                    </View>
                    <View
                        style={{
                            padding: 16,
                        }}>

                        <View style={styles.primaryTextContainer}>
                            <Text style={styles.primaryText}>Categories</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                height: 80,
                            }}
                        >
                            <ScrollView
                                horizontal
                                contentContainerStyle={{ alignItems: "center" }}
                                showsHorizontalScrollIndicator={false}
                            >
                                {/* "All" button */}
                                <Button
                                    style={{
                                        backgroundColor: selectedCategory === null ? "gray" : '#bc430b',
                                        borderRadius: 10,
                                        margin: 5,
                                        paddingHorizontal: 12,
                                    }}
                                    onPress={() => handleCategoryClick(null)}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: selectedCategory === null ? "#FFFFFF" : "#FFFFFF"
                                        }}
                                    >
                                        All
                                    </Text>
                                </Button>

                                {categories.map((item, index) => (
                                    <Button
                                        key={item._id}
                                        style={{
                                            backgroundColor: category === item._id ? '#bc430b' : "#F4B546",
                                            borderRadius: 10,
                                            margin: 5,
                                            paddingHorizontal: 12,
                                        }}
                                        onPress={() => categoryButtonHandler(item._id)}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: category === item._id ? "#FFFFFF" : '#000000'
                                            }}
                                        >
                                            {item.category}
                                        </Text>
                                    </Button>
                                ))}
                            </ScrollView>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        fontSize: 24,
                                        color: '#000000',
                                        fontWeight: '700',
                                        letterSpacing: 1,
                                    }}>
                                    Products
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                            }}>
                            {products.map((item, index) => (
                                <ProductCard
                                    stock={item.stock}
                                    name={item.name}
                                    price={item.price}
                                    image={item.images[0]?.url}
                                    addToCardHandler={addToCardHandler}
                                    addToWishlistHandler={addToWishlistHandler}
                                    id={item._id}
                                    key={item._id}
                                    i={index}
                                    navigate={navigate}
                                />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Footer activeRoute={"home"} />
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    primaryTextContainer: {
        // padding: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        paddingTop: 10
    },
    primaryText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    promotiomSliderContainer: {
        marginTop: 30,
        height: 140,
        backgroundColor: "#F5F5F5",
    },
});
import React, { useEffect } from "react";
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import 'react-native-gesture-handler';
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/Home";
import Camera from "./screens/Camera";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart/Cart";
import ConfirmOrder from "./screens/Cart/ConfirmOrder";
import Payment from "./screens/Cart/Payment";
import Login from "./screens/User/Login";
import SignUp from "./screens/User/SignUp";
import Orders from "./screens/Order/Orders";
import OrderDetails from "./screens/Order/OrderDetails";
import Toast from "react-native-toast-message";
// import ForgetPassword from "./screens/ForgetPassword";
// import Verify from "./screens/Verify";
import Profile from "./screens/User/Profile";
import AdminPanel from "./screens/Admin/AdminPanel";
import Categories from "./screens/Admin/Categories";
import UpdateCategory from "./screens/Admin/UpdateCategory";
import Wishlist from "./screens/Wishlist";
import MyAccount from "./screens/User/MyAccount";
import UpdateProfile from "./screens/User/UpdateProfile";
import ChangePassword from "./screens/User/ChangePassword";
import Analytics from "./screens/Admin/Analytics";
import Products from "./screens/Admin/Products";
import NewProduct from "./screens/Admin/NewProduct";
import UpdateProduct from "./screens/Admin/UpdateProduct";
import AdminOrders from "./screens/Admin/AdminOrders";
import AdminOrderDetails from "./screens/Admin/AdminOrderDetails";
import AdminUsers from "./screens/Admin/AdminUsers";

import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "./redux/actions/userActions";
// import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CLIENT_ID_ANDROID, CLIENT_ID_IOS, CLIENT_ID_WEB } from "@env";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
import { useMessageAndErrorUser } from "./utils/hooks";
// import UserLists from "./screens/Admin/UserLists";

const CustomDrawerContent = (props) => {
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { navigation } = props;
    const loading = useMessageAndErrorUser(navigation, dispatch, "profile");
    const loadingSignOut = useMessageAndErrorUser(navigation, dispatch, "login");
    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId: CLIENT_ID_WEB,
            androidClientId: CLIENT_ID_ANDROID,
            iosClientId: CLIENT_ID_IOS,
        });
    };
    useEffect(() => {
        configureGoogleSignIn();
    });
    const navigateTohome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "home" }],
        });
    };
    const logoutHandler = () => {
        if (user.signInMethod === "google") {
            signOut();
        }
        dispatch(logout());
        dispatch({ type: "resetContacts" })
    };
    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}
                /* contentContainerStyle={{ backgroundColor: '#F4B546' }} */>
                {/* <View style={{ alignItems: "center", padding: 20 }}>
                {!loading && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            if (isAuthenticated) navigation.navigate("profile");
                            else navigation.navigate("login");
                        }}
                    >
                        <Avatar.Image
                            source={user?.avatar ? { uri: user.avatar.url } : require("./assets/images/default-user-icon.jpg")}
                            size={100}
                            style={{ backgroundColor: "#c70049" }}
                        />
                    </TouchableOpacity>
                )}

                {!loading && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            if (isAuthenticated) navigation.navigate("profile");
                            else navigation.navigate("login");
                        }}
                    >
                        <Text style={{ marginTop: 20 }}>{user?.name || "Login"}</Text>
                    </TouchableOpacity>
                )}
            </View>

            <DrawerItem label="Home" onPress={navigateTohome} />
            {user ? (
                <>
                    <DrawerItem
                        label="Orders"
                        onPress={() => navigation.navigate("orders")}
                    />
                </>
            ) : null}

            <DrawerItemList {...props} />
            {user && !loadingSignOut && (
                <DrawerItem label="Sign Out" onPress={logoutHandler} />
            )} */}
                <ImageBackground
                    source={require('./assets/images/bg5.png')}
                    style={{ alignItems: "center", padding: 20, }}>
                    {!loading && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (isAuthenticated) navigation.navigate("profile");
                                else navigation.navigate("login");
                            }}
                        >
                            <Image
                                source={user?.avatar && user.avatar.url ? { uri: user.avatar.url } : require("./assets/images/default-user-icon.jpg")}
                                style={{ height: 100, width: 100, borderRadius: 80, marginBottom: 10 }}
                            />
                        </TouchableOpacity>
                    )}
                    {!loading && (
                        <>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    if (isAuthenticated) navigation.navigate("profile");
                                    else navigation.navigate("login");
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#ffffff',
                                        fontSize: 24,
                                        fontFamily: 'Roboto-Medium',
                                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                        textShadowOffset: { width: -1, height: 1 },
                                        textShadowRadius: 10
                                    }}>
                                    {user?.name || 'Login'}
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    color: '#ffffff',
                                    fontSize: 18,
                                    fontFamily: 'Roboto-Medium',
                                    marginBottom: 5,
                                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                    textShadowOffset: { width: -1, height: 1 },
                                    textShadowRadius: 10
                                }}>
                                {user?.email}
                            </Text>
                        </>
                    )}
                </ImageBackground>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity>
                {user && !loadingSignOut && (
                    <TouchableOpacity onPress={logoutHandler} style={{ paddingVertical: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="exit-outline" size={22} />
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontFamily: 'Roboto-Medium',
                                    marginLeft: 5,
                                }}>
                                Sign Out
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Group>
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="productdetails" component={ProductDetails} />
                <Stack.Screen name="cart" component={Cart} />
                <Stack.Screen name="confirmorder" component={ConfirmOrder} />
                <Stack.Screen name="payment" component={Payment} />
                <Stack.Screen name="wishlist" component={Wishlist} />
                <Stack.Screen name="camera" component={Camera} />
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="signup" component={SignUp} />
                <Stack.Screen name="profile" component={Profile} />
                <Stack.Screen name="myaccount" component={MyAccount} />
                <Stack.Screen name="updateprofile" component={UpdateProfile} />
                <Stack.Screen name="changepassword" component={ChangePassword} />

                <Stack.Screen name="orders" component={Orders} />
                <Stack.Screen name="orderdetails" component={OrderDetails} />



                {/* Dashboard */}
                <Stack.Screen name="adminpanel" component={AdminPanel} />
                <Stack.Screen name="categories" component={Categories} />
                <Stack.Screen name="updatecategory" component={UpdateCategory} />
                <Stack.Screen name="products" component={Products} />
                <Stack.Screen name="newproduct" component={NewProduct} />
                <Stack.Screen name="updateproduct" component={UpdateProduct} />
                <Stack.Screen name="adminorders" component={AdminOrders} />
                <Stack.Screen name="adminorderdetails" component={AdminOrderDetails} />
                <Stack.Screen name="adminusers" component={AdminUsers} />
                <Stack.Screen name="analytics" component={Analytics} />

                {/* Password Reset Routes */}
                {/* <Stack.Screen name="forgetpassword" component={ForgetPassword} />
            <Stack.Screen name="verify" component={Verify} /> */}
            </Stack.Group>
        </Stack.Navigator>
    );
};

const Main = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadUser(user));
    }, [dispatch]);

    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: '#bc430b',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#333',
                    drawerLabelStyle: {
                        marginLeft: -25,
                        fontFamily: 'Roboto-Medium',
                        fontSize: 15,
                    },
                }}
            >
                {/* <Drawer.Screen name="Home" component={HomeStack} /> */}
                <Drawer.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="home-outline" size={22} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="person-outline" size={22} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Messages"
                    component={Profile}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Orders"
                    component={Orders}
                    options={{
                        drawerIcon: ({ color }) => (
                            <Ionicons name="albums-outline" size={22} color={color} />
                        ),
                    }}
                />
            </Drawer.Navigator>

            <Toast position="top" bottomOffset={20} />
        </NavigationContainer>
    );
};

export default Main;

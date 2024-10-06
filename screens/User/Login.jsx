import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import Footer from "../../components/Layout/Footer";
import * as Icons from "react-native-heroicons/solid";
import Toast from "react-native-toast-message";
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login, verifyToken, loadUser } from "../../redux/actions/userActions";
import { useMessageAndErrorUser } from "../../utils/hooks";
import { CLIENT_ID_WEB, CLIENT_ID_ANDROID, CLIENT_ID_IOS } from "@env";
import Header from "../../components/Layout/Header";

const Login = ({ navigation }) => {
    // const navigation = useNavigation();
    const [error, setError] = useState();

    const { newUser, user } = useSelector((state) => state.user);
    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId: CLIENT_ID_WEB,
            androidClientId: CLIENT_ID_ANDROID,
            iosClientId: CLIENT_ID_IOS,
        });
    };
    const navigateToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: "home" }],
        });
        
    };

    useEffect(() => {
        
        console.log(user);
        if (user && user.googleId) {
            console.log("User with Google ID found");
            navigateToHome();
        } else if (user && user.signInMethod === "local") {
            // User logged in via email and password
            console.log("User with email found");
            navigateToHome();
        } else if (newUser) {
            console.log("verified yung token at di pa existing");
            navigation.navigate("signup");
            // showToast("success", "Kindly complete your profile before continue");
        } else if (user === null && newUser === false) {
            console.log("User null")
        }
    }, [newUser, user, navigation]);

    useEffect(() => {
        configureGoogleSignIn();
        GoogleSignin.signOut();
    });

    const showToast = (type, text) => {
        Toast.show({
            type: type,
            text1: text,
            visibilityTime: 3000,
            autoHide: true,
        });
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const loading = useMessageAndErrorUser(navigation, dispatch, "home");

    const submitHandler = () => {
        dispatch(login(email, password));
    };
/*     useEffect(() => {
        dispatch(loadUser(user));
      }, [dispatch]); */

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            dispatch(verifyToken(userInfo.idToken));
            setError();

        } catch (e) {
            setError(e);
        }

    };

    return (
        <>
            <View className="flex-1" style={{ backgroundColor: "#F4B546" }}>
                <View className="flex">
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <TouchableOpacity onPress={() => navigation.goBack('home')}>
                            <Entypo
                                name="chevron-left"
                                style={{
                                    fontSize: 18,
                                    color: '#ffffff',
                                    padding: 12,
                                    backgroundColor: '#bc430b',
                                    borderRadius: 10,
                                    marginTop: 30,
                                    marginLeft: 10
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-center mt-[-40px]">
                        <Image source={require("../../assets/images/cat_dog_home.png")}
                            style={{ width: 200, height: 200, marginTop: 50 }}
                        />
                    </View>

                </View>

                <View className="flex-1 bg-white px-8 pt-8" style={{ elevation: 10, borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                    <View className="form space-y-2">
                        <Text className="text-gray-700 ml-4">
                            Email Address
                        </Text>
                        <TextInput
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter email address"
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        />
                        <Text className="text-gray-700 ml-4">
                            Password
                        </Text>
                        <TextInput
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter password"
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                        />
                        <TouchableOpacity
                            className="flex items-end mb-5"
                            onPress={() => navigation.navigate("forgetpassword")}
                        >
                            <Text className="text-gray-700">
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="py-2 bg-yellow-400 rounded-xl"
                            loading={loading}
                            disabled={email === "" || password === ""}
                            onPress={submitHandler}
                        >
                            <Text className="text-gray-700 font-bold text-center">
                                Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text className="text-xl text-gray-700 text-center font-bold py-2">
                        Or
                    </Text>
                    <View className="flex-row justify-center">
                        <TouchableOpacity className="flex-row items-center p-2 bg-gray-100 rounded-2xl" onPress={signIn}>
                            <Image source={require("../../assets/images/google-icon.png")}
                                className="w-8 h-8"
                            />
                            <Text className="text-gray-700 font-bold text-center mx-6">Google Sign In</Text>

                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-center py-2">
                        <Text className="text-gray-500 font-semibold">Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                            <Text className="text-yellow-400 font-semibold ml-2">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* <Footer activeRoute={"home"} /> */}
        </>
    );
};

export default Login;
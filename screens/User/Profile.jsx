import { StatusBar, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, } from "react-native";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Layout/Footer";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../../components/Layout/Loader";
import OptionList from "../../components/User/OptionList";
import { Avatar, Button } from "react-native-paper";
import { loadUser, logout } from "../../redux/actions/userActions";
import {
    useMessageAndErrorOther,
    useMessageAndErrorUser,
} from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import mime from "mime";
import { updatePic } from "../../redux/actions/otherActions";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CLIENT_ID_ANDROID, CLIENT_ID_IOS, CLIENT_ID_WEB } from "@env";
import Header from "../../components/Layout/Header";

const Profile = ({ navigation, route }) => {
    const { user } = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(user?.avatar ? user.avatar.url : require("../../assets/images/default-user-icon.jpg"));

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const loading = useMessageAndErrorUser(navigation, dispatch, "login");
    const configureGoogleSignIn = () => {
        GoogleSignin.configure({
            webClientId: CLIENT_ID_WEB,
            androidClientId: CLIENT_ID_ANDROID,
            iosClientId: CLIENT_ID_IOS,
        });
    }
    useEffect(() => {
        configureGoogleSignIn();
    });

    const logoutHandler = () => {
        if (user.signInMethod === "google") {
            signOut();
            console.log("google logout")
        }
        dispatch(logout());
    };

    const signOut = async () => {
        try {
            await GoogleSignin.signOut();
        } catch (error) {
            console.log(error)
        }
    }

    const navigateHandler = (text) => {
        switch (text) {
            case "Admin":
                navigation.navigate("adminpanel");
                break;
            case "Orders":
                navigation.navigate("orders");
                break;
            case "Profile":
                navigation.navigate("updateprofile");
                break;
            case "Password":
                navigation.navigate("changepassword");
                break;
            case "People":
                navigation.navigate("peoplescreen");
                break;
            case "Contacts":
                navigation.navigate("contactscreen");
                break;
            case "Message":
                navigation.navigate("chatscreen");
                break;
            case "Sign Out":
                logoutHandler();
                break;

            default:
            case "Orders":
                navigation.navigate("orders");
                break;
        }
    };

    const loadingPic = useMessageAndErrorOther(dispatch, null, null, loadUser);

    useEffect(() => {
        if (route.params?.image) {
            setAvatar(route.params.image);
            // dispatch updatePic Here
            const myForm = new FormData();
            myForm.append("file", {
                uri: route.params.image,
                type: mime.getType(route.params.image),
                name: route.params.image.split("/").pop(),
            });
            dispatch(updatePic(myForm));
        }

        dispatch(loadUser());
    }, [route.params, dispatch, isFocused]);

    useEffect(() => {
        if (user?.avatar) {
            setAvatar(user.avatar.url);
        }
    }, [user]);

    return (
        <>
        <Header back={true} />
            <View style={styles.container}>
                <View style={styles.TopBarContainer}>
                    {/* <View
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
                                }}
                            />
                        </TouchableOpacity>
                    </View> */}
                    
                </View>
                <View style={styles.screenNameContainer}>
                    <Text style={styles.screenNameText}>Profile</Text>
                </View>

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <View style={styles.UserProfileCardContianer}>
                            <View style={styles.UserContainer}>
                                <View style={styles.avatarContainer}>
                                    <View>
                                        <Avatar.Image
                                            source={
                                                typeof avatar === 'number'
                                                    ? avatar
                                                    : { uri: avatar }
                                            }
                                            size={100}
                                            style={{ backgroundColor: "#c70049" }}
                                        />

                                        {/* <TouchableOpacity
                                            disabled={loadingPic}
                                            onPress={() =>
                                                navigation.navigate("camera", { updateProfile: true })
                                            }
                                        >
                                            <Button
                                                disabled={loadingPic}
                                                loading={loadingPic}
                                                textColor="#c70049"
                                            >
                                                Change Photo
                                            </Button>
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.usernameText}>
                                        <Text style={{ color: '#000000' }}>Hi,</Text> {user?.name}
                                    </Text>
                                    <Text style={styles.secondaryText}>{user?.email}</Text>
                                </View>
                            </View>
                            <View style={styles.OptionsContainer}>
                                <OptionList
                                    text={"Orders"}
                                    Icon={Ionicons}
                                    iconName={"albums"}
                                    onPress={() => navigateHandler("Orders")}
                                />
                                {user?.role === "admin" && (
                                    <OptionList
                                        handler={navigateHandler}
                                        iconName={"bar-chart"}
                                        text={"Admin"}
                                        Icon={Ionicons}
                                        // iconName={"person"}
                                        onPress={() => navigateHandler("Admin")}
                                    />
                                )}
                                <OptionList
                                    text={"My Account"}
                                    Icon={Ionicons}
                                    iconName={"person"}
                                    onPress={() => navigation.navigate("myaccount")}
                                />
                                <OptionList
                                    handler={navigateHandler}
                                    text={"Wishlist"}
                                    Icon={Ionicons}
                                    iconName={"heart-circle"}
                                    onPress={() => navigation.navigate("wishlist")}
                                />
                                {/* <OptionList
                                text={"Settings"}
                                Icon={Ionicons}
                                iconName={"settings-sharp"}
                                onPress={() => console.log("working....")}
                                />
                                <OptionList
                                text={"Help Center"}
                                Icon={Ionicons}
                                iconName={"help-circle"}
                                onPress={() => console.log("working....")}
                                /> */}
                                {/* <OptionList
                                    text={"Logout"}
                                    Icon={Ionicons}
                                    iconName={"log-out"}
                                    onPress={() => {
                                        logoutHandler();
                                        dispatch({ type: "resetUser" })
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: "home" }],
                                        });
                                    }}
                                /> */}
                            </View>
                        </View>
                    </>
                )}
            </View>

            <Footer activeRoute={"home"} />
        </>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        flex: 1,
    },
    TopBarContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    UserProfileCardContianer: {
        width: "100%",
        height: "25%",
    },
    screenNameContainer: {
        marginTop: 10,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
    },
    screenNameText: {
        fontSize: 30,
        fontWeight: "800",
        color: "#000000",
    },
    OptionsContainer: {
        width: "100%",
    },
    UserContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 20,
    },
    avatarContainer: {
        display: "flex",
        width: "40%",

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFC8B2",
        borderRadius: 20,
        padding: 10,
    },
    infoContainer: {
        display: "flex",
        width: "50%",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "#F5F5F5",
        paddingLeft: 10,
    },
    usernameText: {
        fontWeight: "bold",
        fontSize: 24,
        color: '#bc430b',
    },
    secondaryText: {
        fontWeight: "bold",
        fontSize: 16,
    },
});
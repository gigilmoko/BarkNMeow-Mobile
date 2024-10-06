import { View, Text, TouchableOpacity, StyleSheet, } from "react-native";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Layout/Footer";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
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
import Header from "../../components/Layout/Header";

const MyAccount = ({ navigation, route }) => {
    const { user } = useSelector((state) => state.user);
    const [avatar, setAvatar] = useState(user?.avatar ? user.avatar.url : require("../../assets/images/default-user-icon.jpg"));

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const loading = useMessageAndErrorUser(navigation, dispatch, "login");

    const navigateHandler = (text) => {
        switch (text) {
            case "Update Profile":
                navigation.navigate("updateprofile");
                break;
            case "Change Password":
                navigation.navigate("changepassword");
                break;
            default:
                console.log(`No navigation handler for ${text}`);
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
                <View style={styles.screenNameContainer}>
                    <Text style={styles.screenNameText}>My Account</Text>
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
                                            source={{
                                                uri: avatar,
                                            }}
                                            size={100}
                                            style={{ backgroundColor: "#c70049" }}
                                        />

                                        <TouchableOpacity
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
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.usernameText}>
                                        {user?.name}
                                    </Text>
                                    <Text style={styles.secondaryText}>{user?.email}</Text>
                                    <Text style={styles.addressText}>{user?.address} {user?.city}, {user?.country}, {user?.pinCode}</Text>
                                </View>
                            </View>
                            <View style={styles.OptionsContainer}>
                                <OptionList
                                    text={"Change Password"}
                                    Icon={Ionicons}
                                    iconName={"key-sharp"}
                                    onPress={() => navigation.navigate("changepassword")}
                                />
                                <OptionList
                                    text={"Update Profile"}
                                    Icon={Ionicons}
                                    iconName={"person"}
                                    onPress={() => navigation.navigate("updateprofile")}
                                />
                            </View>
                        </View>
                    </>
                )}
            </View>

            <Footer activeRoute={"home"} />
        </>
    );
};

export default MyAccount;

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
        fontSize: 26,
        color: '#bc430b',
    },
    secondaryText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    addressText: {
        // fontWeight: "bold",
        fontSize: 14,
    },
});
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    ToastAndroid,
} from "react-native"; import { colors, defaultStyle, formHeading } from "../../styles/styles";
import Header from "../../components/Layout/Header";
import { useIsFocused } from "@react-navigation/native";
import { Headline } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
// import { deleteUser } from "../../redux/actions/otherActions";
import { deleteUser, getAllUsers } from "../../redux/actions/userActions";
import UserList from "../../components/User/UserList";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import defaultAvatar from '../../assets/images/default-user-icon.jpg';

const AdminUsers = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.user);
    const [showMessage, setShowMessage] = useState(false);

    const deleteHandler = (id) => {
        dispatch(deleteUser(id)).then(() => {
            dispatch(getAllUsers());
            setShowMessage(true);
        });
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            dispatch(getAllUsers());
        }, 200);
        return () => {
            clearTimeout(timeOutId);
        };
    }, [dispatch, isFocused]);
    console.log(users); // Add this line to log the users array


    useEffect(() => {
        if (showMessage) {
            // Show message using ToastAndroid
            ToastAndroid.show("User deleted completely", ToastAndroid.SHORT);
            setShowMessage(false);
        }
    }, [showMessage]);

    return (
        <>
        <Header back={true} />
        <View style={styles.container}>
            <View style={styles.screenNameContainer}>
                <View>
                    <Text style={styles.screenNameText}>View Users</Text>
                </View>
                <View>
                    <Text style={styles.screenNameParagraph}>View all Users</Text>
                </View>
            </View>
                <ScrollView
                    style={{ width: "100%" }}
                    showsVerticalScrollIndicator={false}
                >
                    {users.length > 0 ? (
                        // In the AdminUsers component
                        users.map((user, index) => {
                            console.log(user); // Add this line to log the user data
                            return (
                                <UserList
                                    key={user._id}
                                    id={user._id}
                                    index={index}
                                    avatar={user.avatar ? user.avatar.url : defaultAvatar}
                                    name={user.name}
                                    email={user.email}
                                    address={user.address}
                                    city={user.city}
                                    country={user.country}
                                    pinCode={user.pinCode}
                                    admin={true}
                                    deleteHandler={deleteHandler}
                                />
                            );
                        })
                    ) : (
                        <View style={styles.ListContiainerEmpty}>
                            <Text style={styles.secondaryTextSmItalic}>
                                "There are no users yet."
                            </Text>
                        </View>
                    )}
                </ScrollView>
        </View>
        </>
    );
};

export default AdminUsers;

const styles = StyleSheet.create({
    container: {
        flexDirecion: "row",
        backgroundColor: colors.light,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        flex: 1,
    },
    TopBarContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    formContainer: {
        flex: 2,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        width: "100%",
        flexDirecion: "row",
        padding: 5,
    },

    buttomContainer: {
        width: "100%",
    },
    bottomContainer: {
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    screenNameContainer: {
        marginTop: 10,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: 10,
    },
    screenNameText: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.muted,
    },
    screenNameParagraph: {
        marginTop: 5,
        fontSize: 15,
    },
});



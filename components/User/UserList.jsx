import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";
import { Avatar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const UserList = ({
    id,
    avatar,
    name,
    email,
    address,
    city,
    country,
    pinCode,
    deleteHandler,
    loading,
    admin = false,
    index
}) => {

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Avatar.Image
                    source={
                        typeof avatar === 'number'
                            ? avatar
                            : { uri: avatar }
                    }
                    size={60}
                    style={{ backgroundColor: "#c70049" }}
                />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.usernameText}>{name}</Text>
                <Text style={styles.userEmailText}>{email}</Text>
                <Text style={styles.userEmailText}>{address} {city}, {country}, {pinCode}</Text>
            </View>

            {admin && (
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => deleteHandler(id)}
                    loading={loading}
                    disabled={loading}
                >
                    <Ionicons name="remove-circle-outline" size={25} color="#FF4848" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default UserList;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: colors.white,
        height: 90,
        borderRadius: 10,
        elevation: 2,
        marginLeft: 10,
        marginRight: 10,
        margin: 5,
    },
    profileContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        borderRadius: 25,
        marginHorizontal: 20,
    },
    usernameText: {
        fontWeight: "bold",
        fontSize: 15,
    },
    userEmailText: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.muted,
    },
    userInfoContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    removeButton: {
        position: "absolute",
        top: 1,
        right: 1,
        padding: 5,
    },
});




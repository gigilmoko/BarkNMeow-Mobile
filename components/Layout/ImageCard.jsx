import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const ImageCard = ({ src, id, deleteHandler }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: src,
                }}
                style={{
                    width: "100%",
                    height: "80%",
                    resizeMode: "contain",
                }}
            />
            <TouchableOpacity onPress={() => deleteHandler(id)}>
                <Avatar.Icon
                    size={30}
                    icon={"delete"}
                    style={{
                        backgroundColor: "#f4b546",
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ImageCard;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        height: 250,
        backgroundColor: colors.white,
        borderRadius: 10,
        elevation: 5,
        paddingLeft: 20,
        paddingRight: 20,
    },
    imageHolder: {
        height: 200,
        width: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light,
        borderRadius: 10,
        elevation: 5,
    },
});
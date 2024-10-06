import { Text, TouchableOpacity } from "react-native";
import React from "react";
// import { colors } from "../styles/styles";
import { Avatar } from "react-native-paper";

const AdminButtonBox = ({
    icon,
    text,
    handler,
    reverse = false,
    loading = false,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={{
                backgroundColor: "#FFFFFF",
                height: 100,
                width: 140,
                borderRadius: 20,
                alignItems: "center",
                padding: 10,
                border: "1px solid red"
            }}
            onPress={() => handler(text)}
            disabled={loading}
        >
            <Avatar.Icon
                size={50}
                color="#bc430b"
                style= {{backgroundColor: "transparent"}}
                icon={icon}
            />
            <Text
                style={{
                    color:"#bc430b",
                    textAlign: "center",
                    fontSize: 16,
                }}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default AdminButtonBox;
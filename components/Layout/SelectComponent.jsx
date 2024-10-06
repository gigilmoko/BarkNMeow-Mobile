import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React from "react";
import { Avatar, Headline } from "react-native-paper";

const SelectComponent = ({
    visible,
    setVisible,
    setCategory,
    setCategoryID,
    categories = [],
}) => {
    const selectCategoryHandler = (item) => {
        setCategory(item.category);
        setCategoryID(item._id);
        setVisible(false);
    };

    return (
        visible && (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                <Avatar.Icon
                    size={30}
                    style={{
                        alignSelf: "flex-end",
                        backgroundColor: "transparent",
                    }}
                    icon="close"
                    color="#bc430b"
                />
                </TouchableOpacity>
                <Headline style={styles.heading}> Select a Category</Headline>
                <ScrollView>
                    {categories.map((i) => (
                        <Text
                            key={i._id}
                            onPress={() => selectCategoryHandler(i)}
                            style={styles.text}
                        >
                            {i.category}
                        </Text>
                    ))}
                </ScrollView>
            </View>
        )
    );
};

export default SelectComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F9DAA2",
        position: "absolute",
        padding: 35,
        borderRadius: 20,
        width: "90%",
        height: "70%",
        alignSelf: "center",
        elevation: 5,
        top: 110,
    },
    heading: {
        textAlign: "center",
        marginVertical: 10,
        backgroundColor: "transparent",
        borderRadius: 5,
        padding: 3,
        color: "#bc430b",
    },
    text: {
        fontSize: 17,
        fontWeight: "100",
        marginVertical: 10,
        textAlign: "center"
    },
});
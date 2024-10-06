import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Header from "../../components/Layout/Header";
import { useDispatch } from "react-redux";
import { useMessageAndErrorOther } from "../../utils/hooks";
import { colors, network } from "../../constants";
import { updatePassword } from "../../redux/actions/otherActions";


const ChangePassword = ({ navigation }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);

    const dispatch = useDispatch();
    const loading = useMessageAndErrorOther(dispatch, navigation, "myaccount");

    const submitHandler = async () => {
        try {
            await dispatch(updatePassword(oldPassword, newPassword));
            setIsPasswordChanged(true);
        } catch (error) {
            console.error(error);
        }
    
        setOldPassword("");
        setNewPassword("");
    };

    useEffect(() => {
        if (!loading && isPasswordChanged) {
            navigation.navigate('myaccount');
        }
    }, [loading, isPasswordChanged, navigation]);

    return (
        <>
            <Header back={true} />
            <View style={styles.profileContainer}>
                <View style={styles.screenNameContainer}>
                    <View>
                        <Text style={styles.screenNameText}>Update Password</Text>
                    </View>
                    <View>
                        <Text style={styles.screenNameParagraph}>
                            Your new password must be different from previous used password
                        </Text>
                    </View>
                </View>

                <View style={styles.profileFormContainer}>
                    <Text style={styles.screenNameParagraph}>
                        Current Password
                    </Text>
                    <TextInput
                        placeholder="Current Password"
                        secureTextEntry={true}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        style={styles.CustomInput}
                    />
                    <Text style={styles.screenNameParagraph}>
                        New Password
                    </Text>
                    <TextInput
                        placeholder="New Password"
                        keyboardType="email-address"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        style={styles.CustomInput}
                    />
                </View>
                <View
                    style={{
                        // position: 'absolute',
                        bottom: 10,
                        height: '8%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Button
                        loading={loading}
                        disabled={oldPassword === "" || newPassword === ""}
                        textColor='#ffffff'
                        style={{
                            width: '86%',
                            height: '90%',
                            backgroundColor: '#bc430b',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={submitHandler}
                    >
                        Change
                    </Button>
                </View>
            </View>
        </>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    profileContainer: {
        flexDirecion: "row",
        backgroundColor: colors.light,
        alignItems: "center",
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
    screenNameContainer: {
        marginTop: 10,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",

    },
    screenNameText: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.dark,
    },
    screenNameParagraph: {
        marginTop: 5,
        fontSize: 15,
        textAlign: 'left',
        alignSelf: 'stretch',
    },
    profileFormContainer: {
        marginTop: 10,
        marginBottom: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        display: "flex",
        width: "100%",
        flexDirecion: "row",
    },
    CustomInput: {
        height: 35,
        marginBottom: 10,
        marginTop: 10,
        width: "100%",
        padding: 5,
        backgroundColor: colors.white,
        elevation: 3,
        paddingHorizontal: 20,
    },
});
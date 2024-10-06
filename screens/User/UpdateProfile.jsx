import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import Header from "../../components/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/actions/userActions";
import { useMessageAndErrorOther } from "../../utils/hooks";
import { loadUser } from "../../redux/actions/userActions";
import { useIsFocused } from "@react-navigation/native";
import { colors, network } from "../../constants";


const UpdateProfile = ({ navigation }) => {
    const { user } = useSelector(state => state.user);

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [address, setAddress] = useState(user?.address);
    const [city, setCity] = useState(user?.city);
    const [country, setCountry] = useState(user?.country);
    const [pinCode, setPinCode] = useState(user?.pinCode.toString());
    const [isProfileChanged, setIsProfileChanged] = useState(false);

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const loading = useMessageAndErrorOther(dispatch, navigation, "myaccount")

    const submitHandler = async () => {
        try {
            await dispatch(updateProfile(name, email, address, city, country, pinCode));
            setIsProfileChanged(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch, isFocused]);

    useEffect(() => {
        if (!loading && isProfileChanged) {
            navigation.navigate('myaccount');
        }
    }, [loading, isProfileChanged, navigation]);


    return (
        <>
        <Header back={true} />
            <View style={styles.profileContainer}>
                <View style={styles.screenNameContainer}>
                    <View>
                        <Text style={styles.screenNameText}>Update Profile</Text>
                    </View>
                    <View>
                        <Text style={styles.screenNameParagraph}>
                            Update your profile details, such as your name, email and address, here.
                        </Text>
                    </View>
                </View>
                {/* Heading */}

                <View style={styles.profileFormContainer}>
                    <Text style={styles.screenNameParagraph}>
                        Name
                    </Text>
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.CustomInput}
                    />
                    <Text style={styles.screenNameParagraph}>
                        Email Address
                    </Text>
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.CustomInput}
                    />
                    <Text style={styles.screenNameParagraph}>
                        Address
                    </Text>
                    <TextInput
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                        style={styles.CustomInput}
                    />
                    <Text style={styles.screenNameParagraph}>
                        City
                    </Text>
                    <TextInput
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                        style={styles.CustomInput}
                    />
                    <Text style={styles.screenNameParagraph}>
                        Country
                    </Text>
                    <TextInput
                        placeholder="Country"
                        value={country}
                        onChangeText={setCountry}
                        style={styles.CustomInput}
                    />
                    <Text style={styles.screenNameParagraph}>
                        Pin Code
                    </Text>
                    <TextInput
                        placeholder="Pin Code"
                        value={pinCode}
                        onChangeText={setPinCode}
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
                    {/* <TouchableOpacity
                        style={{
                            width: '86%',
                            height: '90%',
                            backgroundColor: '#bc430b',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        loading={loading}
                        textColor={colors.color2}
                        onPress={submitHandler}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '500',
                                letterSpacing: 1,
                                color: '#ffffff',
                                textTransform: 'uppercase',
                            }}>
                            Update
                        </Text>
                    </TouchableOpacity> */}
                    <Button
                        loading={loading}
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
                        Update
                    </Button>
                </View>
                {/* <View>
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        placeholder="Address"
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput
                        placeholder="City"
                        value={city}
                        onChangeText={setCity}
                    />
                    <TextInput
                        placeholder="Country"
                        value={country}
                        onChangeText={setCountry}
                    />

                    <TextInput
                        placeholder="Pin Code"
                        value={pinCode}
                        onChangeText={setPinCode}
                    />

                    <Button
                        loading={loading}
                        textColor={colors.color2}
                        style={styles.btn}
                        onPress={submitHandler}
                    >
                        Update
                    </Button>
                </View> */}
            </View>
        </>
    );
};

export default UpdateProfile;

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
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Footer from "../../components/Layout/Footer";
import * as Icons from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import Entypo from 'react-native-vector-icons/Entypo';
import { Avatar, Button } from "react-native-paper";
import mime from "mime";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndErrorUser } from "../../utils/hooks";
import { register } from "../../redux/actions/userActions";

const SignUp = ({ navigation, route }) => {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [googleId, setGoogleId] = useState();

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user)
    const disableBtn = googleId ? !name || !email || !address || !city || !country || !pinCode :
        !name || !email || !password || !address || !city || !country || !pinCode;

        console.log(name, email, password, address, city, country, pinCode, googleId, avatar)

        useEffect(() => {
            if (user) {
                setName(user.name);
                setEmail(user.email);
                setAvatar(user.picture);
                setGoogleId(user.sub);
                setPassword(googleId);
              }
            }, [user]);

        const submitHandler = async () => {
            const myForm = new FormData();
          
            myForm.append("name", name);
            myForm.append("email", email);
            myForm.append("password", password);
            myForm.append("address", address);
            myForm.append("city", city);
            myForm.append("country", country);
            myForm.append("pinCode", pinCode);
            myForm.append("googleId", googleId);
            if (googleId !== undefined && googleId !== null && googleId !== "") {
              myForm.append("file", avatar);
            } else {
              if (avatar !== "") {
                const file = {
                    uri: avatar,
                    type: mime.getType(avatar),
                    name: avatar.split("/").pop(),
                  };
                  myForm.append("file", file);
              }
            }

          
            /* try {
                await dispatch(register(myForm));
              navigation.navigate('login');
            } catch (error) {
              console.error(error);
              // handle error here
            }
          }; */
          try {
            const result = await dispatch(register(myForm));
            console.log('Result:', result)
            if (result === 'success') {
                console.log('Registration was successful');
                navigation.navigate('login');
            } else {
                console.log('Registration was not successful');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
        };

          const loading = useMessageAndErrorUser(navigation, dispatch, "profile");
          
            
          useEffect(() => {
            console.log("Route params:", route.params); // Check if route.params is defined
            if (route.params?.image) setAvatar(route.params.image);
        }, [route.params]);


    return (
        <>
            <View className="flex-1" style={{ backgroundColor: "#F4B546" }}>
                <View className="flex">
                    <View className="flex-row justify-start">
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
                    </View>
                    <View className="flex-row justify-center mt-[-40px]">
                        <Image source={require("../../assets/images/cat_dog_home.png")}
                            style={{ width: 200, height: 200, marginTop: 50 }}
                        />
                    </View>

                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1 bg-white" style={{
                        elevation: 10, borderTopLeftRadius: 50, borderTopRightRadius: 50
                    }}
                >
                    <View className="flex-1 bg-white px-8 pt-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
                        <View className="form space-y-2">
                            <Avatar.Image
                                style={{
                                    alignSelf: "center",
                                    backgroundColor: "#c70049",
                                }}
                                size={80}
                                source={avatar ? { uri: avatar } : require("../../assets/images/default-user-icon.jpg")}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate("camera")}>
                                <Button textColor="gray">Change Photo</Button>
                            </TouchableOpacity>


                            <Text className="text-gray-700 ml-4">
                                Name
                            </Text>
                            <TextInput
                                placeholder="Enter name"
                                value={name}
                                onChangeText={setName}
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />

                            <Text className="text-gray-700 ml-4">
                                Email Address
                            </Text>
                            <TextInput
                                placeholder="Enter email address"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />

                            <Text className="text-gray-700 ml-4">
                                Password
                            </Text>
                            <TextInput
                                secureTextEntry={true}
                                placeholder="Enter password"
                                value={password}
                                onChangeText={setPassword}
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
                            />

                            <Text className="text-gray-700 ml-4">
                                Address
                            </Text>
                            <TextInput
                                placeholder="Enter address"
                                value={address}
                                onChangeText={setAddress}
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />

                            <Text className="text-gray-700 ml-4">
                                City
                            </Text>
                            <TextInput
                                placeholder="Enter city"
                                value={city}
                                onChangeText={setCity}
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />

                            <Text className="text-gray-700 ml-4">
                                Country
                            </Text>
                            <TextInput
                                placeholder="Enter country"
                                value={country}
                                onChangeText={setCountry}
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />

                            <Text className="text-gray-700 ml-4">
                                Pin Code
                            </Text>
                            <TextInput
                                placeholder="Enter email pin code"
                                value={pinCode}
                                onChangeText={setPinCode}
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            />
                            <TouchableOpacity
                                loading={loading}
                                className="py-2 bg-yellow-400 rounded-xl"
                                disabled={disableBtn}
                                onPress={submitHandler}
                            >
                                <Text className="text-gray-700 font-bold text-center">
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text className="text-xl text-gray-700 text-center font-bold py-2">
                            Or
                        </Text>
                        <View className="flex-row justify-center">
                            <TouchableOpacity className="flex-row items-center p-2 bg-gray-100 rounded-2xl">
                                <Image source={require("../../assets/images/google-icon.png")}
                                    className="w-8 h-8"
                                />
                                <Text className="text-gray-700 font-bold text-center mx-6">Google Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-center py-2">
                            <Text className="text-gray-500 font-semibold">Already have an account?</Text>
                            <TouchableOpacity 
                            onPress={() => {
                                dispatch({type: "resetUser"})
                                navigation.navigate('login')}}>
                                <Text className="text-yellow-400 font-semibold ml-2">Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* <Footer activeRoute={"home"} /> */}
        </>
    );
};

export default SignUp;
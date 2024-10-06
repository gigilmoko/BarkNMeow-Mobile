import {
    StyleSheet,
    Text,
    Image,
    View,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { useMessageAndErrorOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import { getAllCategories, deleteCategory, addCategory } from "../../redux/actions/otherActions";
import * as ImagePicker from 'expo-image-picker';
import Carousel from "react-native-snap-carousel";
import { IconButton } from "react-native-paper";
import { colors } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import Header from "../../components/Layout/Header";

const NewCategory = ({ navigation, route}) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [image, setImage] = useState([]);
    const [category, setCategory] = useState("");

    const disableBtnCondition = !category || !image;
    const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

    const fetchCategories = async () => {
        try {
            await dispatch(getAllCategories());
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const openImagePicker = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
                multiple: true,
            });
    
            if (!result.cancelled && result.assets.length > 0) {
                const newImages = result.assets.map(asset => asset.uri);
                setImage([...image, ...newImages]);
            }
        } catch (error) {
            console.log('Error picking images:', error);
        }
    };

    const submitHandler = async () => {
        try {
            const myForm = new FormData();
            myForm.append("category", category);
            image.forEach((imageUri) => {
                myForm.append(`files`, {
                    uri: imageUri,
                    type: mime.getType(imageUri),
                    name: imageUri.split("/").pop(),
                });
            });
            await dispatch(addCategory(myForm));
            fetchCategories();
            navigation.navigate("categories");
        } catch (error) {
            console.log('Error adding category:', error);
        }
    };

    useEffect(() => {
        if (route.params?.image) setImage(route.params.image);
    }, [route.params]);

    useEffect(() => {
        if (route.params?.image) {
            setImage(prevImages => [...prevImages, ...route.params.image]);
        } else if (route.params?.imageSingle) {
            setImage(prevImages => [...prevImages, route.params.imageSingle]);
        }
    }, [route.params]);

    const deleteImage = (index) => {
        const updatedImages = [...image];
        updatedImages.splice(index, 1);
        setImage(updatedImages);
    };

    const renderCarouselItem = ({ item, index }) => (
        <View key={index}
            style={styles.imageContainer}
        >
            {item && (
                <View
                style={styles.imageHolder}>
                    <Image
                        style={{ width: 300, height: 150, resizeMode: 'contain' }}
                        source={{ uri: item }}
                    />
                    <IconButton
                        icon="delete"
                        color="#f44336"
                        size={20}
                        onPress={() => deleteImage(index)}
                        style={{ alignSelf: 'center' }}
                    />
                </View>
            )}
        </View>
    );

    return (
        <>
            <Header back={true} />
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.screenNameContainer}>
                    <View>
                        <Text style={styles.screenNameText}>Add Product</Text>
                    </View>
                    <View>
                        <Text style={styles.screenNameParagraph}>Add product details</Text>
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, width: "100%" }}
                >
                    <View style={styles.formContainer}>
                        <View style={styles.imageContainer}>
                        {image.length > 0 ? (
                                <Carousel
                                    layout="default"
                                    data={image}
                                    renderItem={renderCarouselItem}
                                    sliderWidth={300}
                                    itemWidth={300}
                                    // loop={true}
                                    style={styles.imageHolder}
                                />
                            ) : (
                                <TouchableOpacity style={styles.imageHolder} onPress={openImagePicker}>
                                    <AntDesign name="pluscircle" size={50} color={colors.muted} />
                                </TouchableOpacity>
                            )}
                        </View>
                        <Button
                            mode="contained"
                            onPress={openImagePicker}
                            style={{ backgroundColor: "#BC430B", marginHorizontal: 80, marginTop: 10, }}
                        >
                            Select Images
                        </Button>
                        <TextInput
                            placeholder="Category"
                            value={category}
                            onChangeText={setCategory}
                            style={styles.customInput}
                        />
                        <Button
                            textColor={"#FFFFFF"}
                            style={{                     
                                backgroundColor: "#BC430B",
                                padding: 15,
                                width: "100%",
                                marginBottom: 10,
                                alignItems: "center",
                                borderRadius: 10,
                                color: "#FFFFFF",
                            }}
                            onPress={submitHandler}
                            loading={loading}
                            disabled={disableBtnCondition}
                        >
                        Create
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </>
    );
}

export default NewCategory;

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
        justifyContent: "flex-start",
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
        marginTop: 10,
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
    imageContainer: {
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
    customInput: {
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        width: "100%",
        padding: 5,
        backgroundColor: colors.white,
        elevation: 5,
        paddingHorizontal: 20,
    },
});
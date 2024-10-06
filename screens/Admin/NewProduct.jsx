import {
    StyleSheet,
    Text,
    Image,
    StatusBar,
    View,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button, TextInput } from "react-native-paper";
import SelectComponent from "../../components/Layout/SelectComponent";
import { useSetCategories, useMessageAndErrorOther } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import mime from "mime";
import { createProduct, getAdminProducts } from "../../redux/actions/otherActions";
import * as Icons from "react-native-heroicons/solid";
import * as ImagePicker from 'expo-image-picker';
import Carousel from "react-native-snap-carousel";
import { IconButton } from "react-native-paper";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../../components/Layout/Header";

const NewProduct = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [statusDisable, setStatusDisable] = useState(false);
    const [image, setImage] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("Choose Category");
    const [categoryID, setCategoryID] = useState(undefined);
    const [categories, setCategories] = useState([]);

    useSetCategories(setCategories, isFocused);
    const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

    const disableBtnCondition =
        !name || !description || !price || !stock || !image;
    
    const fetchProducts = async () => {
        try {
            await dispatch(getAdminProducts());
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

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
            myForm.append("name", name);
            myForm.append("description", description);
            myForm.append("price", price);
            myForm.append("stock", stock);
            image.forEach((imageUri) => {
                myForm.append(`files`, {
                    uri: imageUri,
                    type: mime.getType(imageUri),
                    name: imageUri.split("/").pop(),
                });
            });
            if (categoryID) {
                myForm.append("category", categoryID);
            }
            await dispatch(createProduct(myForm));
            navigation.navigate("products");
            fetchProducts();
        } catch (error) {
            console.error("Error submitting form:", error);
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
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.customInput}
                        />
                        <TextInput
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                            style={styles.customInput}
                        />

                <TextInput
                placeholder="Price"
                keyboardType="number-pad"
                value={price}
                onChangeText={setPrice}
                style={styles.customInput}
                />
                <TextInput
                keyboardType="number-pad"
                placeholder="Stock"
                value={stock}
                onChangeText={setStock}
                style={styles.customInput}
                />

                {/* <Text
                style={{
                    padding: 10,
                    paddingLeft:15,
                    textAlignVertical: "center",
                    marginBottom: 25,
                    backgroundColor: "transparent" ,
                    
                }}
                onPress={() => setVisible(true)}
                >
                {category}
                </Text> */}
                <DropDownPicker
                    placeholder={"Select Product Category"}
                    open={open}
                    value={categoryID}
                    items={categories.map((category) => {
                        return { label: category.category, value: category._id };
                    })}
                    setOpen={setOpen}
                    setValue={setCategoryID}
                    setItems={setCategories}
                    disabled={statusDisable}
                    disabledStyle={{
                        backgroundColor: colors.light,
                        borderColor: colors.white,
                    }}
                    labelStyle={{ color: colors.muted }}
                    style={{ borderColor: "#fff", elevation: 5, marginBottom: 18 }}
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

        {/* <SelectComponent
            categories={categories}
            setCategoryID={setCategoryID}
            setCategory={setCategory}
            visible={visible}
            setVisible={setVisible}
        /> */}
        </>
    );
};


export default NewProduct;

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
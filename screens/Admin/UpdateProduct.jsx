import React, { useEffect, useState } from "react";
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
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "react-native-heroicons/solid";
import mime from "mime";
import * as ImagePicker from 'expo-image-picker';
import Carousel from "react-native-snap-carousel";
import ImageCard from "../../components/Layout/ImageCard";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import { getProductDetails } from "../../redux/actions/productActions";
import { updateProduct } from "../../redux/actions/otherActions";
import SelectComponent from "../../components/Layout/SelectComponent";
import { deleteProductImage, updateProductImage } from "../../redux/actions/otherActions";
import { IconButton } from "react-native-paper";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "../../components/Layout/Header";

const UpdateProduct = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const { product } = useSelector((state) => state.product);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [categories, setCategories] = useState([]);
    const [images] = useState(route.params.images || []);
    const [productId] = useState(route.params.id);
    const [imageChanged, setImageChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [fetchedImages, setFetchedImages] = useState(route.params.images || []);

    useSetCategories(setCategories, isFocused);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getProductDetails(route.params.id));
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
        fetchData();
    }, [dispatch, route.params.id, isFocused]);

    const submitHandler = async () => {
        setLoading(true);
        try {
            await dispatch(updateProduct(route.params.id, name, description, price, stock, categoryID));
            if (selectedImages.length > 0) {
                const myForm = new FormData();
                selectedImages.forEach((image) => {
                    myForm.append("files", {
                        uri: image.uri,
                        type: mime.getType(image.uri),
                        name: image.uri.split("/").pop(),
                    });
                });
                await dispatch(updateProductImage(route.params.id, myForm));
                setSelectedImages([]);
            }
            navigation.navigate("products");
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(String(product.price));
            setStock(String(product.stock));
            setCategory(product.category?.category);
            setCategoryID(product.category?._id);
            setFetchedImages(product.images || []);
        }
    }, [product]);

    // Update Images
    useEffect(() => {
        if (route.params?.image) {
            setSelectedImages([...selectedImages, route.params.image]);
        }
    }, [route.params]);

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
                const newImages = result.assets.map(asset => ({ uri: asset.uri, id: asset.id }));
                setSelectedImages([...selectedImages, ...newImages]);
            }
        } catch (error) {
            console.log('Error picking images:', error);
        }
    };

    const deleteHandler = async (imageId, imageUrl) => {
        try {
            console.log("Deleting image with ID:", imageId);
            console.log("Image URL:", imageUrl);

            if (imageUrl) {
                console.log("Deleting image from fetched images");
                await dispatch(deleteProductImage(productId, imageId));
                const updatedFetchedImages = fetchedImages.filter((img) => img._id !== imageId);
                setFetchedImages(updatedFetchedImages);
            } else {
                console.log("Deleting image from selected images");
                await dispatch(deleteProductImage(productId, imageId));
                const updatedSelectedImages = selectedImages.filter((img) => img.id !== imageId);
                setSelectedImages(updatedSelectedImages);
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };


    const renderCarouselItem = ({ item }) => {
        const imageId = item._id || item.id;
        const imageUrl = item.url || item.uri;

        return (
            <View>
                <ImageCard src={imageUrl} id={imageId} deleteHandler={deleteHandler} />
            </View>
        );
    };

    return (
        <>
            <Header back={true} />
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.screenNameContainer}>
                    <View>
                        <Text style={styles.screenNameText}>Edit Product</Text>
                    </View>
                    <View>
                        <Text style={styles.screenNameParagraph}>Edit product details</Text>
                    </View>
                </View>
                <ScrollView style={{ flex: 1, width: "100%" }}>
                    <View style={styles.formContainer}>
                        <View style={styles.imageContainer}>
                                <View >
                                <Carousel
                                    data={[...(product?.images || []), ...selectedImages]}
                                    renderItem={renderCarouselItem}
                                    sliderWidth={300}
                                    itemWidth={300}
                                    layout={"default"}
                                />
                                </View>
                        </View>
                        <Button
                            mode="contained"
                            onPress={openImagePicker}
                            style={{ backgroundColor: "#BC430B", marginHorizontal: 80, marginTop: 10, }}
                        >
                            Select Images
                        </Button>
                        <View style={styles.inputContainer}>
                            <View >
                                <Text style={styles.label}>Name:</Text>
                                <TextInput
                                    placeholder="Name"
                                    value={name}
                                    onChangeText={setName}
                                    style={styles.customInput}
                                />
                            </View>

                            {/* Description Input */}
                            <View>
                                <Text style={styles.label}>Description:</Text>
                                <TextInput
                                    placeholder="Description"
                                    value={description}
                                    onChangeText={setDescription}
                                    style={styles.customInput}
                                />
                            </View>

                            {/* Price Input */}
                            <View>
                                <Text style={styles.label}>Price:</Text>
                                <TextInput
                                    placeholder="Price"
                                    value={price}
                                    keyboardType="number-pad"
                                    onChangeText={setPrice}
                                    style={styles.priceInput}
                                />
                            </View>

                            {/* Stock Input */}
                            <View>
                                <Text style={styles.label}>Stock:</Text>
                                <TextInput
                                    placeholder="Stock"
                                    value={stock}
                                    keyboardType="number-pad"
                                    onChangeText={setStock}
                                    style={styles.priceInput}
                                />
                            </View>

                            {/* Category Text */}
                            <View>
                                <Text style={styles.label}>Category:</Text>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        textAlignVertical: "center",
                                        borderRadius: 3,
                                        backgroundColor: "#F9DAA2",
                                        padding: 5,
                                        width: 292,
                                        marginTop: 10,
                                        textAlign: "left",
                                        height: 50
                                    }}
                                    onPress={() => setVisible(true)}
                                >
                                    {category}
                                </Text>
                            </View>
                        </View>
                        <Button
                            textColor="#FFFFFF"
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
                            disabled={loading}
                        >
                            Update
                        </Button>
                    </View>
                </ScrollView>
                <SelectComponent
                    categories={categories}
                    setCategoryID={setCategoryID}
                    setCategory={setCategory}
                    visible={visible}
                    setVisible={setVisible}
                />

            </KeyboardAvoidingView>
        </>
    );

}

export default UpdateProduct;

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
        width: 292,
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        width: "100%",
        padding: 5,
        backgroundColor: colors.white,
        elevation: 5,
        paddingHorizontal: 20,
    },
    priceInput: {
        width: 292,
        height: 40,
        marginBottom: 10,
        marginTop: 10,
        padding: 5,
        backgroundColor: colors.white,
        elevation: 5,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'column',
        backgroundColor: colors.light,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
        flex: 1,
    },
    label: {
        // marginRight: 10,
        fontWeight: 'bold',
        fontSize: 16,
        width: 100,
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        height: 40,
    },
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
        marginBottom: 25,
    },
    categoryLabel: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 16,
        width: 100,
    },
});

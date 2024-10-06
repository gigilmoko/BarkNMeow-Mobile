import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { useMessageAndErrorOther, useSetCategories } from "../../utils/hooks";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import mime from "mime";
import * as Icons from "react-native-heroicons/solid";
import { getAllCategories, deleteCategory, addCategory } from "../../redux/actions/otherActions";
import Carousel from "react-native-snap-carousel";
import * as ImagePicker from 'expo-image-picker';

const Categories = ({ navigation, route }) => {
    const [category, setCategory] = useState("");
    const [image, setImage] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.other.categories);
    const loading = useMessageAndErrorOther(dispatch, navigation, "adminpanel");

    useEffect(() => {
        fetchCategories();
    }, [isFocused]);

    const fetchCategories = async () => {
        try {
            await dispatch(getAllCategories());
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    
    const deleteHandler = async (id) => {
        try {
            await dispatch(deleteCategory(id));
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const submitHandler = async () => {
        try {
            console.log('Submitting form data:', category, image);
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
            exitAddForm();
            fetchCategories();
            navigation.navigate("categories");
        } catch (error) {
            console.log('Error adding category:', error);
        }
    };

    // Handler for selecting images
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

    const exitAddForm = () => {
        setShowAddForm(false);
        setCategory("");
        setImage([]); 
    };

    // Render function for carousel items
    const renderCarouselItem = ({ item, index }) => (
        <View key={index}>
            {item && (
                <Image
                    style={{ width: 300, height: 150, resizeMode: 'contain' }}
                    source={{ uri: item }}
                />
            )}
        </View>
    );
    
    return (
        <View style={{ flex: 1, backgroundColor: "#F4B546", padding: 15 }}>
            {/* Navigation back button */}
            <View className="flex-row justify-start">
                <TouchableOpacity onPress={() => {
                    if (navigation.canGoBack()) {
                        navigation.goBack();
                    } else {
                        console.log("Can't go back");
                    }
                }}
                    style={{ backgroundColor: "#bc430b" }}
                    className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-10">
                    <Icons.ArrowLeftIcon size='20' color='white'
                    />
                </TouchableOpacity>
            </View>
            {/* Header */}
            <View style={{ alignItems: "center", marginBottom: 20 }}>
                <Text style={{ fontSize: 24, color: "#FFFFFF", fontWeight: "800" }}>Categories</Text>
            </View>
            {/* Scrollable area */}
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 20 }}>
                    {/* Display categories */}
                    {categories &&  categories.map((i)=> (
                        <CategoryCard
                            key={i._id}
                            name={i.category}
                            id={i._id}
                            image={i.images}
                            deleteHandler={deleteHandler}
                            navigation={navigation}
                        />
                    ))}
                </View>
            </ScrollView>
            {/* Add category button */}
            {!showAddForm && (
                <Button
                    mode="contained"
                    onPress={() => setShowAddForm(true)}
                    style={{ marginBottom: 20, backgroundColor: "#BC430B" }}
                >
                    Add Category
                </Button>
            )}

            {/* Add Category Form */}
            {showAddForm && (
                <View style={styles.container}>
                    <TouchableOpacity onPress={exitAddForm} style={styles.exitButton}>
                        <Text style={{ color: "#bc430b", fontSize: 20 }}>✕</Text>
                    </TouchableOpacity>

                    {/* Button to open multi-image picker */}
                    <Button
                        mode="contained"
                        onPress={openImagePicker}
                        style={{ marginBottom: 20, marginTop: 10, backgroundColor: "#BC430B" }}
                    >
                        Select Images
                    </Button>

                    {/* Display selected images */}
                    <View style={{ marginBottom: 20, alignItems: "center" }}>
                        <Carousel
                            layout="default"
                            data={image}
                            renderItem={renderCarouselItem}
                            sliderWidth={300}
                            itemWidth={300}
                        />
                    </View>

                    {/* Category name input */}
                    <TextInput
                        placeholder="Add Category Name"
                        value={category}
                        onChangeText={setCategory}
                        style={{ backgroundColor: "transparent" }}
                    />
                    {/* Submit button */}
                    <Button
                        mode="contained"
                        onPress={submitHandler}
                        loading={loading}
                        disabled={!category}
                        style={{ marginBottom: 20, marginTop: 10, backgroundColor: "#BC430B" }}
                    >
                        Add
                    </Button>
                </View>
            )}  

        </View>
    );
};

const CategoryCard = ({ name, id, image, deleteHandler, navigation }) => (
    <View style={styles.cardContainer}>
        <View style={styles.infoContainer}>
            <Text style={styles.cardText}>{name}</Text>
            <View style={styles.iconContainer}>
                {/* Delete button */}
                <TouchableOpacity onPress={() => deleteHandler(id)}>
                    <Avatar.Icon
                        icon="delete"
                        size={30}
                        color="#BC430B"
                        style={{ marginRight: 10, backgroundColor: "transparent" }}
                    />
                </TouchableOpacity>
                {/* Edit button */}
                <TouchableOpacity onPress={() => navigation.navigate("updatecategory", { id })}>
                    <Avatar.Icon
                        icon="pen"
                        size={30}
                        color="#BC430B"
                        style={{ backgroundColor: "transparent" }}
                    />
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.imageContainer}>
            {/* Display images */}
            {Array.isArray(image) && image.length > 0 ? (
                <Carousel
                    layout="stack"
                    data={image}
                    renderItem={CarouselCardItem}
                    sliderWidth={300}
                    itemWidth={300}
                    loop={true}
                />
            ) : (
                <Text>No images available</Text>
            )}
        </View>
    </View>
);

const CarouselCardItem = ({ item, index }) => (
    <View key={index}>
        <Image source={{ uri: item.url }} style={styles.categoryImage} />
    </View>
);

export default Categories;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: "#FFFFFF",
        elevation: 5,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    cardText: {
        fontWeight: "600",
        letterSpacing: 1,
        color: "#bc430b",
        fontSize: 18,
    },
    iconContainer: {
        flexDirection: "row",
    },
    imageContainer: {
        alignItems: "center",
    },
    exitButton: {
        position: "absolute",
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: "transparent",
        borderRadius: 5,
    },
    categoryImage: {
        width: 300,
        height: 150,
        resizeMode: "contain",
    },
});

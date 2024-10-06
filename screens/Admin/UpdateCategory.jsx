import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "react-native-heroicons/solid";
import { updateCategory, getCategoryDetails } from "../../redux/actions/otherActions";
import mime from "mime";
import { deleteCategoryImage, updateCategoryImage } from "../../redux/actions/otherActions";
import * as ImagePicker from 'expo-image-picker';
import Carousel from "react-native-snap-carousel";
import ImageCard from "../../components/Layout/ImageCard";

const UpdateCategory = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const [categoryId] = useState(route.params.id);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategoryName] = useState("");
    const { category: categoryDetails } = useSelector((state) => state.other);
    const [fetchedImages, setFetchedImages] = useState(route.params.images || []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getCategoryDetails(route.params.id));
            } catch (error) {
                console.error("Error fetching category details:", error);
            }
        };
        fetchData();
    }, [dispatch, route.params.id, isFocused]);
    

    useEffect(() => {
        if (categoryDetails) {
            setCategoryName(categoryDetails.category);
            setFetchedImages(categoryDetails.images || []);
        }
    }, [categoryDetails]);

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
                await dispatch(deleteCategoryImage(categoryId, imageId));
                const updatedFetchedImages = fetchedImages.filter((img) => img._id !== imageId);
                setFetchedImages(updatedFetchedImages);
            } else {
                console.log("Deleting image from selected images");
                await dispatch(deleteCategoryImage(categoryId, imageId));
                const updatedSelectedImages = selectedImages.filter((img) => img.id !== imageId);
                setSelectedImages(updatedSelectedImages);
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };
    
    
    const renderCarouselItem = ({ item }) => {
        const imageId = item._id || item.id; // Use item._id if it's a fetched image, otherwise use item.id for selected images
        const imageUrl = item.url || item.uri; // Use item.url if it's a fetched image, otherwise use item.uri for selected images
    
        return (
            <ImageCard src={imageUrl} id={imageId} deleteHandler={deleteHandler} />
        );
    };
    
    
    const submitHandler = async () => {
        setLoading(true);
        try {
            await dispatch(updateCategory(route.params.id, category));
            if (selectedImages.length > 0) {
                const myForm = new FormData();
                selectedImages.forEach((image) => {
                    myForm.append("files", {
                        uri: image.uri,
                        type: mime.getType(image.uri),
                        name: image.uri.split("/").pop(),
                    });
                });
                await dispatch(updateCategoryImage(route.params.id, myForm));
                setSelectedImages([]);
            }
            navigation.navigate('categories');
            fetchData();
        } catch (error) {
            console.log("Error updating category:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#f4b546" }}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <TouchableOpacity
                    onPress={() => {
                        if (navigation.canGoBack()) {
                            navigation.goBack();
                        } else {
                            console.log("Can't go back");
                        }
                    }}
                    style={{ backgroundColor: "#bc430b", padding: 10, borderRadius: 5, margin: 10 }}
                >
                    <Icons.ArrowLeftIcon size={20} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: "center", height: 550 }}>
                <ScrollView>
                <Carousel
                    data={[...(categoryDetails?.images || []), ...selectedImages]}
                    renderItem={renderCarouselItem}
                    sliderWidth={300}
                    itemWidth={300}
                    layout={"default"}
                />
                </ScrollView>
                <Button
                    mode="contained"
                    onPress={openImagePicker}
                    style={{ marginBottom: 20, marginTop: 20, marginHorizontal: 20, padding: 6, backgroundColor: "#BC430B" }}
                >
                    Select Images
                </Button>
                <TextInput
                    placeholder="Name"
                    value={category}
                    onChangeText={setCategoryName}
                    style={{ backgroundColor: "transparent", marginHorizontal: 30 }}
                />
                <Button
                    textColor="#FFFFFF"
                    style={{ backgroundColor: "#bc430b", marginHorizontal: 20, padding: 6 }}
                    onPress={submitHandler}
                    loading={loading}
                    disabled={loading}
                >
                    Update
                </Button>
            </View>
        </View>
    );
}

export default UpdateCategory;
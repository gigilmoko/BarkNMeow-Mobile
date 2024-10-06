import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { defaultStyle, colors } from "../styles/styles";
import Header from "../components/Layout/Header";
import Comment from "../components/Comment";
import Carousel from "react-native-snap-carousel";
import { Avatar, Button } from "react-native-paper";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { getProductDetails } from "../redux/actions/productActions";
import { server } from "../redux/store";
import {
    deleteComment,
    getAllComments,
    getProductRatings,
} from "../redux/actions/commentActions";
import { FontAwesome } from "react-native-vector-icons";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = SLIDER_WIDTH;

const ProductDetails = ({ route: { params } }) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const isCarousel = useRef(null);
  const isFocused = useIsFocused();
  const { user } = useSelector((state) => state.user);
 

  const comments = useSelector((state) => state.comment.comments); // Fetch comments from Redux store
  const average = useSelector((state) => state.comment.averageRating); // Fetch comments from Redux store
  const loading = useSelector((state) => state.comment.loading); // Fetch loading state from Redux store
  const wishlist = useSelector(state => state.wishlist.wishlistItems) || [];
  const cart = useSelector(state => state.cart.cartItems);

  // console.log("currently log in:", user);
  const {
    product: { name, price, stock, description, images },
  } = useSelector((state) => state.product);

  console.log("Product image:", images);

  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = stock === 0;

  useEffect(() => {
    dispatch(getAllComments(params.id)); // Fetch comments when component mounts
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, isFocused]);
  // console.log(params.id)
  const incrementQty = () => {
    if (stock <= quantity) {
      return Toast.show({
        type: "error",
        text1: "Maximum Value Added",
      });
    }
    setQuantity((prev) => prev + 1);
  };

  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };

  const addToCardHandler = (id, name, price, image, stock) => {
    if (!user || user === undefined || Object.keys(user).length === 0) {
      navigate.navigate("login");
      return Toast.show({
          type: "info",
          text1: "Log in to continue.",
      });
      
  }
  const cartItem = cart.find(item => item.product === id);

      if (cartItem) {
        if (cartItem.quantity < stock) {
            dispatch({
                type: "updateCartQuantity",
                payload: {
                    product: id,
                    quantity: 1,
                },
            });

            Toast.show({
                type: "info",
                text1: "Already in Cart. Quantity +1",
            });
        } else {
            Toast.show({
                type: "info",
                text1: "Cannot add more. Stock limit reached.",
            });
        }
      } else {
        dispatch({
            type: "addToCart",
            payload: {
                product: id,
                name,
                price,
                image,
                stock,
                quantity: 1,
            },
        });

        Toast.show({
            type: "success",
            text1: "Added To Cart",
        });
      }

      if (stock === 0)
        return Toast.show({
            type: "error",
            text1: "Out Of Stock",
        });
  };

  const addToWishlistHandler = (id, name, price, image, stock) => {
    if (!user) {
      navigate.navigate("login");
      return;
    }
    const isAlreadyInWishlist = wishlist.some(item => item.product === id);

        if (isAlreadyInWishlist) {
            Toast.show({
                type: "info",
                text1: "Already in Wishlist",
            });
        } else {
            dispatch({
                type: "addToWishlist",
                payload: {
                    product: id,
                    name,
                    price,
                    image,
                    stock,
                }
            });
    
            Toast.show({
                type: "success",
                text1: "Added To Wishlist",
            });
        }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await dispatch(deleteComment(commentId));
      Toast.show({
        type: "success",
        text1: "Comment deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      Toast.show({
        type: "error",
        text1: "Failed to delete comment",
      });
    }
  };

  return (
    <ScrollView style={{ ...defaultStyle, padding: 0 }} nestedScrollEnabled>
      <Header back={true} />
      {images && (
        <Carousel
          layout="stack"
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          ref={isCarousel}
          data={images}
          renderItem={CarouselCardItem}
        />
      )}

      <View
        style={{
          backgroundColor: colors.color2,
          padding: 15,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        }}
      >
        <Text numberOfLines={2} style={{ fontSize: 25 }}>
          {name}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "900" }}>${price}</Text>
        <View
          style={{
            backgroundColor: colors.color2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderRadius: 5,
            }}
          >
            <Avatar.Icon
              icon="star"
              size={30}
              color="#FFD700"
              style={{ backgroundColor: "white", marginLeft: -10 }}
            />
          </View>
          <Text style={{ marginLeft: 5 }}>
            {parseFloat(average.averageRating).toFixed(1)}
          </Text>
        </View>
        <Text
          style={{ lineHeight: 20, marginVertical: 15, color: "grey" }}
          numberOfLines={8}
        >
          {description}
        </Text>

        {/* Render reviews */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ color: colors.color3, fontWeight: "100" }}>
            Quantity
          </Text>
          <View
            style={{
              width: 80,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={decrementQty}>
              <Avatar.Icon
                icon={"minus"}
                size={20}
                style={{
                  borderRadius: 5,
                  backgroundColor: colors.color5,
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
            <Text style={style.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQty}>
              <Avatar.Icon
                icon={"plus"}
                size={20}
                style={{
                  borderRadius: 5,
                  backgroundColor: colors.color5,
                  height: 25,
                  width: 25,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flexDirection: "column", marginTop: 20 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => addToCardHandler(params.id, name, price, images[0]?.url, stock)}
            style={{ flex: 8 }}
            disabled={isOutOfStock}
          >
            <Button
              icon={"cart"}
              style={{
                borderRadius: 5,
                backgroundColor: "black",
              }}
              textColor={isOutOfStock ? colors.color2 : colors.color2}
            >
              {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
            </Button>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() =>
                addToWishlistHandler(
                  params.id,
                  name,
                  price,
                  images[0]?.url,
                  stock
                )
              }
            >
              <Button
                icon={"heart"}
                style={{
                  borderRadius: 5,
                  backgroundColor: "white",
                  marginTop: 4,
                  borderWidth: 1,
                  borderColor: colors.color1,
                }}
                textColor={"black"}
              >
                Add to Wishlist
              </Button>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Customer reviews {"("}
            {comments.length}
            {")"}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            marginBottom: 10,
          }}
        />

        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>{item.user.name}</Text>

                <Avatar.Icon
                  icon="star"
                  size={30}
                  color="#FFD700"
                  style={{ backgroundColor: "white" }}
                />
                <Text style={{ marginLeft: -5 }}>{item.rating}</Text>
              </View>

              <Text>Comment: {item.text}</Text>
              {user &&
                (user.role === "admin" ||
                  item.user === user._id ||
                  user.role === "Guest") && (
                  <TouchableOpacity
                    onPress={() => handleDeleteComment(item._id)}
                  >
                    <Text style={{ color: "red" }}>Delete</Text>
                  </TouchableOpacity>
                )}
              {/* Separator line */}
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  marginTop: 10,
                }}
              />
              {/* Logging user.id */}
              {/* {console.log("User:", user)}
              {console.log("Item User:", item.user)}
              {console.log("User Role:", user.role)} */}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Comment />
    </ScrollView>
  );
};

const CarouselCardItem = ({ item, index }) => (
  <View style={style.container} key={index}>
    <Image source={{ uri: item.url }} style={style.image} />
  </View>
);

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.color6,
    width: ITEM_WIDTH,
    paddingVertical: 40,
    height: 380,
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: "contain",
    height: 250,
  },
  quantity: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});

export default ProductDetails;
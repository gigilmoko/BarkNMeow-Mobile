import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Loader from "../../components/Layout/Loader";
import { FontAwesome } from '@expo/vector-icons';
import AdminButtonBox from "../../components/Layout/AdminButtonBox";
// import ProductListHeading from "../../components/ProductListHeading";
// import ProductListItem from "../../components/ProductListItem";
// import Chart from "../../components/Chart";
// import ProductSalesChart from "../../components/ProductSalesChart";
// import MonthlySalesChart from "../../components/MonthlySalesChart";
// import UserSalesChart from "../../components/UserSalesChart";
import {
    useAdminProducts,
    // useMessageAndErrorOther,
    useChartData,
    } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/solid";

const AdminPanel = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { chartData,/*  chartData2, chartData3, */ loading, error } = useChartData(
        dispatch,
        isFocused
      );
    console.log(chartData/* , chartData2, chartData3 */, loading, error);
    // const { products } = useAdminProducts(dispatch, isFocused);

    const navigationHandler = (text) => {
        switch (text) {
        case "Category":
            navigation.navigate("categories");
            break;
        case "All Orders":
            navigation.navigate("adminorders");
            break;
        case "All Users":
            navigation.navigate("adminusers");
            break;
        case "Analytics":
            navigation.navigate("analytics");
            break;
        case "Product":
            navigation.navigate("products");
            break;

        default:
            navigation.navigate("");
            break;
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#F4B546", padding: 15 }}>
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
            <View style={{ alignItems: "center", marginBottom: 40, marginTop: 40 }}>
                <Text style={{ fontSize: 24, color: "#bc430b", fontWeight: "800" }}>Admin Dashboard</Text>
            </View>

        {/* {loading ? (
            <Loader />
        ) : ( */}
            <>
            <View>
                <View
                style={{
                    flexDirection: "row",
                    // padding: 10,
                    justifyContent: "space-evenly",
                }}
                >
                <AdminButtonBox
                    icon="cart-outline"
                    text={"Product"}
                    handler={navigationHandler}
                />

                <AdminButtonBox
                    icon="format-list-bulleted-square"
                    text={"Category"}
                    handler={navigationHandler}
                />
                </View>
            </View>
            <View>
                <View
                style={{
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "space-evenly",
                }}
                >
                <AdminButtonBox
                    icon={"receipt"}
                    text={"All Orders"}
                    handler={navigationHandler}
                    reverse={true}
                />
                <AdminButtonBox
                    icon={"account-outline"}
                    text={"All Users"}
                    handler={navigationHandler}
                    reverse={true}
                />
                </View>
            </View>
            <View>
                <View
                style={{
                    flexDirection: "row",
                    margin: 10,
                    justifyContent: "space-evenly",
                }}
                >
                <AdminButtonBox
                    icon={"graph-outline"}
                    text={"Analytics"}
                    handler={navigationHandler}
                    reverse={true}
                />
                </View>
            </View>
            </>
        {/* )} */}
        </View>
    );
};

export default AdminPanel;

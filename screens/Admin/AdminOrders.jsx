import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Layout/Header";
import Loader from "../../components/Layout/Loader";
import AdminOrderList from "../../components/Order/AdminOrderList";
import { useGetOrders } from "../../utils/hooks";
import { useDispatch } from "react-redux";
import { processOrder } from "../../redux/actions/orderActions";
import { useMessageAndErrorOrder } from "../../utils/hooks";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const AdminOrders = ({ navigation }) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const navigate = useNavigation();
    const { loading, orders } = useGetOrders(isFocused, true);

    const processOrderLoading = useMessageAndErrorOrder(
        dispatch,
        navigation,
        "adminorders",
    );

    const updateHandler = (id) => {
        dispatch(processOrder(id));
    };
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'preparing':
                return 'red';
            case 'shipped':
                return 'yellow';
            case 'delivered':
                return 'green';
            default:
                return 'gray';
        }
    };

    return (
        <>
            <Header back={true} />
            <View style={styles.container}>
                <View style={styles.screenNameContainer}>
                    <View>
                        <Text style={styles.screenNameText}>All Orders</Text>
                    </View>
                    <View>
                        <Text style={styles.screenNameParagraph}>
                            View all orders placed by customers
                        </Text>
                    </View>
                </View>

                {loading ? (
                    <Loader />
                ) : (

                    <ScrollView
                        style={{ flex: 1, width: "100%", padding: 20 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {orders.length > 0 ? (orders
                        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                        .map((item, index) => (
                            <View key={item._id}>
                                <AdminOrderList
                                    key={item._id}
                                    id={item._id}
                                    i={index}
                                    price={item.totalAmount}
                                    status={item.orderStatus}
                                    statusColor={getStatusColor(item.orderStatus)}
                                    paymentMethod={item.paymentMethod}
                                    orderedOn={item.createdAt.split("T")[0]}
                                    address={`${item.shippingInfo.address}, ${item.shippingInfo.city}, ${item.shippingInfo.country} ${item.shippingInfo.pinCode}`}
                                    admin={true}
                                    updateHandler={updateHandler}
                                    loading={processOrderLoading}
                                    navigate={navigate}
                                />
                                <View style={styles.emptyView}></View>
                            </View>
                        ))
                        ) : (
                            <View style={styles.ListContiainerEmpty}>
                                <Text style={styles.secondaryTextSmItalic}>
                                    "There are no orders placed yet."
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                )}
            </View>
        </>
    );
};

export default AdminOrders;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    topBarContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    toBarText: {
        fontSize: 15,
        fontWeight: "600",
    },
    screenNameContainer: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    screenNameText: {
        fontSize: 30,
        fontWeight: "800",
        color: "#000000",
    },
    screenNameParagraph: {
        marginTop: 5,
        fontSize: 15,
    },
    bodyContainer: {
        width: "100%",
        flexDirecion: "row",
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1,
    },
    emptyView: {
        height: 20,
    },
    ListContiainerEmpty: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    secondaryTextSmItalic: {
        fontStyle: "italic",
        fontSize: 15,
        color: "#707981",
    },
});
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const ProductsNavigator = () => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const defaultNavOptions = {
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTitleStyle: {
      fontFamily: "open-sans-bold",
    },
    headerBackTitleStyle: {
      fontFamily: "open-sans",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  };

  const ProductsCartStack = () => (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );

  const OrdersStack = () => (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ headerTitle: "Your Orders" }}
      />
    </Stack.Navigator>
  );

  const UserProducts = () => (
    <Stack.Navigator screenOptions={defaultNavOptions}>
      <Stack.Screen
        name="User"
        component={UserProductsScreen}
        options={{ headerTitle: "User Products" }}
      />
      <Stack.Screen name="EditCreate" component={EditProductScreen} />
    </Stack.Navigator>
  );

  const ShopNavigator = () => (
    <Drawer.Navigator
      drawerContentOptions={{
        labelStyle: { fontFamily: "open-sans-bold" },
        activeTintColor: Colors.primary,
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsCartStack}
        options={{
          title: "Products",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS == "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          title: "Orders",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS == "android" ? "md-list" : "ios-list"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={UserProducts}
        options={{
          title: "Admin",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS == "android" ? "md-create" : "ios-create"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      <ShopNavigator />
    </NavigationContainer>
  );
};

export default ProductsNavigator;

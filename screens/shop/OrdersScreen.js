import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: menuButton,
    });
  }, [navigation]);

  const menuButton = () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
  );
  const orders = useSelector((state) => {
    // console.log(state.orders.orders);
    return state.orders.orders;
  });
  // console.log(orders);
  return (
    <FlatList
      data={orders}
      renderItem={(item) => (
        <OrderItem
          amount={item.item.totalAmount}
          date={item.item.readableDate}
          items={item.item.items}
        />
      )}
    />
  );
};

export default OrdersScreen;

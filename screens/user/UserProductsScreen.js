import React from "react";
import { FlatList, Button, Platform, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

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

  const addProductButton = () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="New"
        iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
        onPress={() => {
          navigation.navigate("EditCreate");
        }}
      />
    </HeaderButtons>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: menuButton,
      headerRight: addProductButton,
    });
  }, [navigation]);

  const editProduct = (productId) => {
    console.log("han", productId);
    navigation.navigate("EditCreate", { productId: productId });
  };

  const confirmChanger = (id) => {
    Alert.alert("U sure?", "remove item", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(productsActions.deleteProduct(id)),
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => editProduct(itemData.item.id)}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => editProduct(itemData.item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => confirmChanger(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

// UserProductsScreen.navigationOptions = navData => {
//   return {
//     headerTitle: 'Your Products',
//     headerLeft: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Menu"
//           iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     )
//   };
// };

export default UserProductsScreen;

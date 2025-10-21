import React, { useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ShopsContext } from "../../contexts/ShopContext";
import Postcard from "../../components/PostCard";
import { useCart } from "../../hooks/useCart";
import { router } from "expo-router";

const BUCKET_ID = "68f3a86d002587148ec0";

const Shop = () => {
  const context = useContext(ShopsContext);
  const { addToCart, totalItems, totalPrice } = useCart();
  if (!context) return null;

  const { items, fetchItems } = context;

  useEffect(() => {
    fetchItems();
  }, []);

  const renderItem = ({ item }: any) => (
    <Postcard
      item={item}
      bucketId={BUCKET_ID}
      onPress={() => console.log("Pressed:", item.name)}
      onAddToCart={() =>
        addToCart({
          $id: item.$id,
          name: item.name,
          price: Number(item.price),
        })
      }
    />
  );

  return (
    <View className="flex-1 bg-oxford pt-12 px-4">
      {/* Header */}
      <Text className="text-white text-4xl font-bold mb-6">Shop</Text>

      {/* Items Grid */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.$id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperClassName="justify-between mb-4"
        contentContainerStyle={{ paddingBottom: 140 }} // leave space for checkout
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Checkout Button */}
      <View className="absolute bottom-6 left-4 right-4 bg-blue-600/40 rounded-full p-1 shadow-lg">
        <TouchableOpacity
          onPress={() => router.push("/checkout")}
          className="bg-blue-600/60 py-4 rounded-full items-center shadow-lg"
        >
          <Text className="text-white font-bold text-lg">
            Checkout ({totalItems} items - ${totalPrice.toFixed(2)})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shop;

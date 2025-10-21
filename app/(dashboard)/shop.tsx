import React, { useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { ShopsContext } from "../../contexts/ShopContext";
import Postcard from "../../components/PostCard";

const BUCKET_ID = "68f3a86d002587148ec0";

const Shop = () => {
  const context = useContext(ShopsContext);
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
      onAddToCart={() => console.log("Added to cart:", item.name)}
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
        <TouchableOpacity className="py-4 items-center">
          <Text className="text-white text-lg font-bold">
            Checkout ({items.length} items)
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Shop;

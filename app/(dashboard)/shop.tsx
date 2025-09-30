import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const chargers = [
  { id: "1", name: "VOLTGO Fast Charger", price: "$29.99" },
  { id: "2", name: "VOLTGO Ultra Charger", price: "$49.99" },
  { id: "3", name: "VOLTGO Portable Charger", price: "$19.99" },
  { id: "4", name: "VOLTGO Car Charger", price: "$24.99" },
];

const Shop = () => {
  return (
    <View className="flex-1 bg-oxford px-6 py-12">
      {/* Header */}
      <Text className="text-white text-4xl font-bold mb-8">Shop</Text>

      {/* Charger List */}
      <FlatList
        data={chargers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mb-4 shadow-lg flex-row justify-between items-center">
            <Text className="text-oxford text-lg font-semibold">
              {item.name}
            </Text>
            <Text className="text-oxford font-semibold">{item.price}</Text>
          </View>
        )}
      />

      {/* Checkout Button */}
      <TouchableOpacity className="bg-white px-6 py-4 rounded-full w-full mt-6 shadow-lg">
        <Text className="text-oxford text-center font-semibold text-lg">
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Shop;

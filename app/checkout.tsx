import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useCart } from "../hooks/useCart";

const Checkout = () => {
  const { cart, totalItems, totalPrice, addToCart, removeFromCart } = useCart();

  const renderItem = ({ item }: any) => (
    <View className="flex-row justify-between items-center bg-white p-4 rounded-xl mb-4 shadow-md">
      <View className="flex-1 pr-4">
        <Text className="text-gray-900 font-semibold text-lg mb-1">
          {item.name}
        </Text>
        <Text className="text-gray-500 text-sm">
          ${item.price} x {item.quantity}
        </Text>
      </View>

      <View className="flex-row items-center space-x-2">
        {/* Decrease */}
        <TouchableOpacity
          onPress={() => removeFromCart(item.$id)}
          className="bg-gray-300 px-4 py-1 rounded-full"
        >
          <Text className="text-gray-900 font-bold text-lg">-</Text>
        </TouchableOpacity>

        {/* Quantity */}
        <View className="px-3 py-1 bg-gray-100 rounded-lg">
          <Text className="text-gray-900 font-semibold text-lg text-center">
            {item.quantity}
          </Text>
        </View>

        {/* Increase */}
        <TouchableOpacity
          onPress={() =>
            addToCart({ $id: item.$id, name: item.name, price: item.price })
          }
          className="bg-blue-600 px-4 py-1 rounded-full"
        >
          <Text className="text-white font-bold text-lg">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-oxford px-4 pt-12">
      <Text className="text-white text-3xl font-bold mb-6">Your Cart</Text>

      {cart.length === 0 ? (
        <Text className="text-gray-300 text-center mt-20">
          Your cart is empty
        </Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.$id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {cart.length > 0 && (
        <View className="absolute bottom-6 left-4 right-4 bg-white p-4 rounded-2xl shadow-lg">
          <Text className="text-gray-900 font-semibold text-lg mb-3">
            Total ({totalItems} items): ${totalPrice.toFixed(2)}
          </Text>

          <TouchableOpacity className="bg-blue-600 py-4 rounded-full items-center">
            <Text className="text-white font-bold text-lg">Make Payment</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Checkout;

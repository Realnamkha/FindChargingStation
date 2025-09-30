import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View className="bg-oxford min-h-screen">
      <View className="flex-1 bg-oxford items-center justify-around mb-4">
        <View>
          <Text className="text-white text-8xl font-bold mb-8">VoltGo</Text>
          <Text className="text-white text-center text-lg mb-12">
            Charge up your Device
          </Text>
        </View>
        <View>
          <TouchableOpacity className="bg-white px-6 py-4 rounded-full w-full max-w-xs shadow-lg">
            <Text className="text-oxford text-center font-semibold text-lg">
              Start Charging Now
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Link className="text-white" href="/shop">
            Shop
          </Link>
          <Link className="text-white" href="/map">
            Map
          </Link>
        </View>
      </View>
    </View>
  );
};

export default Home;

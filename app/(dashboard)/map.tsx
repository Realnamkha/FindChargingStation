import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Map = () => {
  return (
    <SafeAreaView className="flex-1 bg-oxford px-6 py-12">
      {/* Header */}
      <Text className="text-white text-4xl font-bold mb-8">Charging Map</Text>

      {/* Map Placeholder */}
      <View
        className="flex-1 bg-white rounded-xl justify-center items-center shadow-lg"
        style={{ elevation: 5 }}
      >
        <Text className="text-oxford text-lg font-semibold mb-2">
          Map Placeholder
        </Text>
        <Text className="text-oxford opacity-70 text-center">
          Here you will see nearby charging stations
        </Text>
      </View>

      {/* Optional Action Button */}
      <TouchableOpacity
        className="bg-white px-6 py-4 rounded-full w-full mt-6 flex-row justify-center items-center shadow-lg"
        style={{ elevation: 3 }}
      >
        <FontAwesome
          name="map-marker"
          size={20}
          color="#002147"
          style={{ marginRight: 8 }}
        />
        <Text className="text-oxford text-center font-semibold text-lg">
          Find Nearest Charging Station
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Map;

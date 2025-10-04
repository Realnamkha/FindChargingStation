import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-oxford px-6 py-12 justify-between">
      {/* Hero Section */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-8xl font-extrabold mb-6">VoltGo</Text>
        <Text className="text-white text-center text-lg mb-10 opacity-80">
          Charge up your device anywhere, anytime.
        </Text>

        {/* Start Charging Button */}
        <TouchableOpacity
          className="bg-white px-6 py-4 rounded-full w-full max-w-xs shadow-lg mb-4"
          onPress={() => router.push("/login")}
        >
          <Text className="text-oxford text-center font-semibold text-lg">
            Start Charging
          </Text>
        </TouchableOpacity>

        {/* Register Link */}
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text className="text-white text-center font-medium underline mt-2 opacity-80">
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer / Optional branding */}
      <View className="items-center mb-6">
        <Text className="text-white opacity-40 text-sm">
          © 2025 VoltGo. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

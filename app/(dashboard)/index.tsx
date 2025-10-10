import { View, Text, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../hooks/useUser";

const Home = () => {
  const router = useRouter();
  const { user } = useUser();

  return (
    <SafeAreaView className="flex-1 bg-oxford px-8 py-6">
      <View className="items-center mt-24">
        <Text className="text-white font-extrabold text-center text-[72px] leading-[80px]">
          VoltGo
        </Text>
        <Text className="text-white text-center mt-3 text-base opacity-80 leading-6">
          Charge up your device anywhere, anytime.
        </Text>
      </View>

      <View className="flex-1" />

      <View className="w-full max-w-xs self-center">
        {!user && (
          <TouchableOpacity
            onPress={() => router.push("/register")}
            activeOpacity={0.7}
          >
            <Text className="text-white underline text-center mb-4 font-medium text-sm opacity-75">
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/login")}
          className={Platform.select({
            ios: "bg-white rounded-full py-4 shadow-[0_6px_10px_rgba(0,0,0,0.15)]",
            android: "bg-white rounded-full py-4 elevation-8",
          })}
        >
          <Text className="text-oxford font-semibold text-lg text-center tracking-wide">
            Start Charging
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-oxford px-6 py-12">
      {/* Header */}
      <Text className="text-white text-4xl font-bold mb-8">Profile</Text>

      {/* Profile Picture */}
      <View className="items-center mb-8">
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          className="w-32 h-32 rounded-full border-4 border-white"
        />
      </View>

      {/* User Info */}
      <View className="mb-8">
        <Text className="text-white text-xl font-semibold mb-2">John Doe</Text>
        <Text className="text-white opacity-70 text-center text-base">
          johndoe@example.com
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="space-y-4">
        <TouchableOpacity
          className="bg-white px-6 py-4 rounded-full flex-row items-center justify-center shadow-lg"
          style={{ elevation: 3 }}
        >
          <FontAwesome
            name="edit"
            size={20}
            color="#002147"
            style={{ marginRight: 8 }}
          />
          <Text className="text-oxford text-lg font-semibold">
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white px-6 py-4 rounded-full flex-row items-center justify-center shadow-lg"
          style={{ elevation: 3 }}
        >
          <FontAwesome
            name="sign-out"
            size={20}
            color="#002147"
            style={{ marginRight: 8 }}
          />
          <Text className="text-oxford text-lg font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

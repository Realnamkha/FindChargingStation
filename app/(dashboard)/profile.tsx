import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../../hooks/useUser";

const Profile = () => {
  const { user, logout } = useUser();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await logout();
          } catch (err) {
            console.error("Logout failed:", err);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-oxford">
      {/* Background gradient */}
      <LinearGradient
        colors={["#002147", "#00152b"]}
        className="absolute inset-0"
      />

      {/* Header with Logout */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-6">
        <View>
          <Text className="text-white text-3xl font-bold">Profile</Text>
          <Text className="text-white/60 text-base mt-1">
            Manage your account
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          disabled={loading}
          activeOpacity={0.8}
          className="bg-red-600/90 p-3 rounded-full"
        >
          <FontAwesome name="sign-out" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Profile Section */}
      <View className="flex-1 items-center justify-start px-6">
        <Image
          source={require("../../assets/profile.jpg")}
          className="w-36 h-36 rounded-full border-4 border-white mb-4"
          resizeMode="contain"
        />

        <Text className="text-white text-2xl font-bold mb-1 text-center">
          {user?.fullName || "John Doe"}
        </Text>
        <Text className="text-white/70 text-base mb-8 text-center">
          {user?.email || "johndoe@example.com"}
        </Text>

        {/* Edit Profile Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-white/10 border border-white/20 rounded-2xl flex-row items-center justify-center py-4 px-6 w-full"
          style={{ elevation: 3 }}
        >
          <FontAwesome
            name="edit"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text className="text-white text-lg font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

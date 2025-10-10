import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useUser } from "../../hooks/useUser";
import ThemedLoader from "../../components/ThemedLoader";

const Login = () => {
  // State variables for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { user, login } = useUser();

  const handleLogin = async () => {
    setError(null);
    try {
      await login(email, password);
      console.log("Current user is:", user);
      // later -> send this data to your backend API
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-oxford items-center justify-center px-6">
        <Text className="text-3xl font-bold text-white mb-8">
          WELCOME TO VoltGo
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          className="w-full bg-white/10 text-white px-4 py-4 rounded-lg mb-4"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="w-full bg-white/10 text-white px-4 py-4 rounded-lg mb-6"
        />
        {error && (
          <Text className="text-red-400 mb-4 text-center">{error}</Text>
        )}

        <Pressable
          onPress={handleLogin}
          className="bg-white px-8 py-3 rounded-lg items-center w-full active:bg-gray-400"
        >
          <Text className="text-oxford font-bold text-base">Login</Text>
        </Pressable>

        <Text className="text-white mt-6">
          Don’t have an account?{" "}
          <Link href="/register">
            <Text className="font-bold">Register</Text>
          </Link>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

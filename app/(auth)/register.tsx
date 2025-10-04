import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useUser } from "../../hooks/useUser";

const Register = () => {
  // State variables for inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, register } = useUser();

  const handleRegister = async () => {
    try {
      await register(fullName, email, password);
      console.log("Current user is:", user);
      // later -> send this data to your backend API
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-oxford items-center justify-center px-6">
        <Text className="text-3xl font-bold text-white mb-8">
          WELCOME TO VoltGo
        </Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={fullName}
          onChangeText={setFullName}
          className="w-full bg-white/10 text-white px-4 py-3 rounded-lg mb-4"
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          className="w-full bg-white/10 text-white px-4 py-3 rounded-lg mb-4"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="w-full bg-white/10 text-white px-4 py-3 rounded-lg mb-6"
        />

        <Pressable
          onPress={handleRegister}
          className="bg-white px-8 py-3 rounded-lg items-center w-full active:bg-gray-200"
        >
          <Text className="text-oxford font-bold text-base">Register</Text>
        </Pressable>

        <Text className="text-white mt-6">
          Already Have an Account?{" "}
          <Link href="/login">
            <Text className="font-bold">Sign In</Text>
          </Link>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

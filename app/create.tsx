import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../lib/appwrite";
import { useItems } from "../hooks/useItems";
import { ID } from "react-native-appwrite";

const BUCKET_ID = "68f3a86d002587148ec0";

const CreateItemScreen: React.FC = () => {
  const { createItem } = useItems();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // 📸 Pick image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // ☁️ Upload to Appwrite Storage
  const uploadImage = async (): Promise<string | null> => {
    if (!imageUri) return null;

    const fileName = imageUri.split("/").pop() || `image-${Date.now()}.jpg`;

    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    if (!fileInfo.exists) throw new Error("File does not exist");
    if (!fileInfo.size) throw new Error("File has size 0");

    // Appwrite expects a number for `size`
    const fileSize = Number(fileInfo.size);

    const file = {
      uri: imageUri,
      name: fileName,
      type: "image/jpeg",
      size: fileSize,
    };

    const uploadedFile = await storage.createFile(BUCKET_ID, ID.unique(), file);
    return uploadedFile.$id; // store file ID
  };

  // 🧾 Create Item Document
  const handleCreate = async () => {
    if (!name || !price) {
      Alert.alert("Missing info", "Please enter both name and price.");
      return;
    }

    if (!imageUri) {
      Alert.alert("Missing image", "Please select an image for the item.");
      return;
    }

    try {
      setUploading(true);
      const imageId = await uploadImage();

      await createItem({
        name,
        price: Number(price),
        imageUri, // pass image URI
      });

      Alert.alert("Success", "Item created successfully!");
      setName("");
      setPrice("");
      setImageUri(null);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#002147] justify-center px-6">
      <Text className="text-white text-3xl font-bold text-center mb-8">
        Add New Item
      </Text>

      <TextInput
        className="bg-[#0b2f5b] text-white rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Item name"
        placeholderTextColor="#b0c4de"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        className="bg-[#0b2f5b] text-white rounded-xl px-4 py-3 mb-4 text-base"
        placeholder="Price"
        placeholderTextColor="#b0c4de"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity
        className="bg-[#0b2f5b] h-44 rounded-xl items-center justify-center mb-6"
        onPress={pickImage}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-full rounded-xl"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-[#b0c4de] text-base">Select Image</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCreate}
        disabled={uploading}
        className={`rounded-xl py-4 ${
          uploading ? "bg-[#004080]/70" : "bg-[#00509e]"
        }`}
      >
        {uploading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-lg font-semibold text-center">
            Create Item
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreateItemScreen;

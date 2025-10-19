import React, { createContext, useState, ReactNode, useEffect } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";
import { storage } from "../lib/appwrite";
import * as FileSystem from "expo-file-system/legacy";

const DATABASE_ID = "68e8db3500216c53897a";
const TABLE_ID = "items";
const BUCKET_ID = "68f3a86d002587148ec0";
// 1️⃣ Item type
export interface ShopItem {
  userId?: string;
  $id: string; // Appwrite document ID
  name: string;
  price: number;
  imageId?: string;
}

// 2️⃣ Context type
interface ShopsContextType {
  items: ShopItem[];
  fetchItems: () => Promise<void>;
  fetchItemById: (id: string) => Promise<ShopItem | null>;
  createItem: (
    data: Omit<ShopItem, "$id" | "userId" | "imageId"> & { imageUri: string }
  ) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

// 3️⃣ Create context
export const ShopsContext = createContext<ShopsContextType | null>(null);

interface ShopProviderProps {
  children: ReactNode;
}

// 4️⃣ Provider component
export function ShopProvider({ children }: ShopProviderProps) {
  const [items, setItems] = useState<ShopItem[]>([]);
  const { user } = useUser();

  // Fetch all items
  async function fetchItems() {
    try {
      const response = await databases.listDocuments(DATABASE_ID, TABLE_ID);

      const shopItems: ShopItem[] = response.documents.map((doc) => ({
        $id: doc.$id,
        userId: doc.userId as string,
        name: doc.name as string,
        price: doc.price as number,
        imageId: doc.imageId as string | undefined, // optional
        imageUrl: doc.imageUrl as string | undefined, // optional
      }));

      console.log(shopItems);
      setItems(shopItems);
    } catch (error) {
      console.error("Error fetching items:", (error as Error).message);
    }
  }

  // Fetch a single item by ID
  async function fetchItemById(id: string): Promise<ShopItem | null> {
    try {
      const doc = await databases.getDocument(DATABASE_ID, TABLE_ID, id);
      const item: ShopItem = {
        $id: doc.$id,
        name: doc.name as string,
        price: doc.price as number,
      };
      return item;
    } catch (error) {
      console.error("Error fetching item:", (error as Error).message);
      return null;
    }
  }

  async function createItem(
    data: Omit<ShopItem, "$id" | "userId" | "imageUrl"> & { imageUri: string } // required
  ) {
    try {
      const fileName =
        data.imageUri.split("/").pop() || `image-${Date.now()}.jpg`;

      const fileInfo = await FileSystem.getInfoAsync(data.imageUri);
      if (!fileInfo.exists || !fileInfo.size)
        throw new Error("File does not exist or has size 0");

      const file = {
        uri: data.imageUri,
        name: fileName,
        type: "image/jpeg",
        size: Number(fileInfo.size),
      };

      const uploadedFile = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );
      const imageId = uploadedFile.$id;

      if (!user?.id) throw new Error("User not authenticated");

      const doc = await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        {
          name: data.name,
          price: Number(data.price), // ensure number
          imageId,
        },
        [Permission.read(Role.any()), Permission.write(Role.user(user.id))]
      );

      setItems((prev) => [
        ...prev,
        { $id: doc.$id, ...data, userId: user.id, imageId },
      ]);
    } catch (error) {
      console.error("Error creating item:", (error as Error).message);
      throw error; // so your screen can show Alert
    }
  }

  // Delete an item by ID
  async function deleteItem(id: string) {
    try {
      await databases.deleteDocument(DATABASE_ID, TABLE_ID, id);
      setItems((prev) => prev.filter((item) => item.$id !== id));
    } catch (error) {
      console.error("Error deleting item:", (error as Error).message);
    }
  }

  useEffect(() => {
    if (user) {
      fetchItems();
    } else {
      setItems([]);
    }
  }, [user]);

  return (
    <ShopsContext.Provider
      value={{ items, fetchItems, fetchItemById, createItem, deleteItem }}
    >
      {children}
    </ShopsContext.Provider>
  );
}

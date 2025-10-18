import React, { createContext, useState, ReactNode } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";
import { storage } from "../lib/appwrite";
import * as FileSystem from "expo-file-system";

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
  createItem: (data: Omit<ShopItem, "$id">) => Promise<void>;
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
      // Map DefaultDocument[] to ShopItem[]
      const shopItems: ShopItem[] = response.documents.map((doc) => ({
        $id: doc.$id,
        user: user?.id,
        name: doc.name as string,
        price: doc.price as number,
      }));
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
    data: Omit<ShopItem, "$id" | "userId" | "imageUrl"> & { imageUri?: string }
  ) {
    try {
      let imageId: string | undefined;

      // Upload image if provided
      if (data.imageUri) {
        const fileName =
          data.imageUri.split("/").pop() || `image-${Date.now()}.jpg`;

        const fileInfo = await FileSystem.getInfoAsync(fileName);
        if (!fileInfo.exists || !fileInfo.size) {
          throw new Error("File does not exist or has size 0");
        }

        // Appwrite expects a number for `size`
        const fileSize = Number(fileInfo.size);

        const file = {
          uri: data.imageUri,
          name: fileName,
          type: "image/jpeg",
          size: fileSize, // ✅ Required by Appwrite
        };

        const uploadedFile = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          file
        );
        imageId = uploadedFile.$id; // ✅ store file ID
      }

      // Create document
      const doc = await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        {
          name: data.name,
          price: data.price,
          userId: user?.id,
          imageId: imageId,
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.team("ADMIN_TEAM_ID")),
          Permission.delete(Role.team("ADMIN_TEAM_ID")),
        ]
      );

      const newItem: ShopItem = {
        $id: doc.$id,
        name: doc.name as string,
        price: doc.price as number,
        userId: doc.userId as string,
        imageId: doc.imageUrl as string,
      };

      setItems((prev) => [...prev, newItem]);
    } catch (error) {
      console.error("Error creating item:", (error as Error).message);
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

  return (
    <ShopsContext.Provider
      value={{ items, fetchItems, fetchItemById, createItem, deleteItem }}
    >
      {children}
    </ShopsContext.Provider>
  );
}

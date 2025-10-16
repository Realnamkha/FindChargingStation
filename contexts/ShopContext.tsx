import React, { createContext, useState, ReactNode } from "react";
import { databases } from "../lib/appwrite";
import { ID, Permission, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "68e8db3500216c53897a";
const TABLE_ID = "items";

// 1️⃣ Item type
export interface ShopItem {
  userId?: string;
  $id: string; // Appwrite document ID
  name: string;
  price: number;
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

  // Create a new item
  async function createItem(data: Omit<ShopItem, "$id" | "userId">) {
    try {
      const doc = await databases.createDocument(
        DATABASE_ID,
        TABLE_ID,
        ID.unique(),
        { ...data, userId: user?.id }, // add creator's ID
        [
          Permission.read(Role.any()), // everyone can read
          Permission.update(Role.team("ADMIN_TEAM_ID")), // only admins
          Permission.delete(Role.team("ADMIN_TEAM_ID")), // only admins
        ]
      );

      const newItem: ShopItem = {
        $id: doc.$id,
        name: (doc as any).name as string,
        price: (doc as any).price as number,
        userId: (doc as any).userId as string,
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

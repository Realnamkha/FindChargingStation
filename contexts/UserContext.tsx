import React, { createContext, useState, ReactNode } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

// Define the shape of the user
type User = {
  id: string;
  fullName: string;
  email: string;
};

// Define the context value type
interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context with default undefined
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // LOGIN
  async function login(email: string, password: string): Promise<void> {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser({
        id: response.$id,
        fullName: response.name,
        email: response.email,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  // REGISTER
  async function register(
    fullName: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      const newUser = await account.create(
        ID.unique(),
        email,
        password,
        fullName
      );
      await account.createEmailPasswordSession(email, password);
      setUser({
        id: newUser.$id,
        fullName: newUser.name,
        email: newUser.email,
      });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  // LOGOUT
  async function logout(): Promise<void> {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

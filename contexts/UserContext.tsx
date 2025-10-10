import React, { createContext, useState, ReactNode, useEffect } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";
import { useRouter } from "expo-router";

// Define the shape of the user
type User = {
  id: string;
  fullName: string;
  email: string;
};

// Define the context value type
interface UserContextType {
  user: User | null;
  authChecked: boolean;
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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

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
      router.replace("/");
    } catch (error: any) {
      throw Error(error.message);
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
      router.replace("/");
    } catch (error: any) {
      console.error("Registration failed:", error);
      throw Error(error);
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

  async function getInitialUserValue() {
    try {
      const response = await account.get();
      setUser({
        id: response.$id,
        fullName: response.name,
        email: response.email,
      });
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}

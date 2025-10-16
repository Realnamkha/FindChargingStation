import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { UserProvider } from "../contexts/UserContext";
import { ShopProvider } from "../contexts/ShopContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <ShopProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }} />
      </ShopProvider>
    </UserProvider>
  );
}

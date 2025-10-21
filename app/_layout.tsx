import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { UserProvider } from "../contexts/UserContext";
import { ShopProvider } from "../contexts/ShopContext";
import { CartProvider } from "../contexts/CartContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <ShopProvider>
        <CartProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }} />
        </CartProvider>
      </ShopProvider>
    </UserProvider>
  );
}

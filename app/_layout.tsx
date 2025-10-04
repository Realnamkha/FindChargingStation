import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { UserProvider } from "../contexts/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </UserProvider>
  );
}

import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = true; // 👈 Replace with real auth check (AsyncStorage, Zustand, Supabase, etc.)

  if (isLoggedIn) {
    return <Redirect href="/(dashboard)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}

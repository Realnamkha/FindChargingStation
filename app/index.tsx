import { useUser } from "../hooks/useUser";
import { Redirect } from "expo-router";

export default function Index() {
  const { user, authChecked } = useUser();

  // Wait until auth check is complete
  if (!authChecked) {
    return null; // or a loading screen/spinner
  }

  if (user) {
    return <Redirect href="/(dashboard)" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}

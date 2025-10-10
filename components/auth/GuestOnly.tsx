import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";
import { useEffect, ReactNode } from "react";
import { Text } from "react-native";
import ThemedLoader from "../ThemedLoader";

interface UserOnlyProps {
  children: ReactNode;
}

const GuestOnly = ({ children }: UserOnlyProps) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user !== null) {
      router.replace("/profile");
    }
  }, [user, authChecked]);

  if (!authChecked || user) {
    return <ThemedLoader />;
  }

  return children;
};

export default GuestOnly;

import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import UserOnly from "../../components/auth/userOnly";

const DashboardLayout = () => {
  return (
    <UserOnly>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#002147",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#ffffff" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "location" : "location-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: "Shop",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </UserOnly>
  );
};

export default DashboardLayout;

import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function DashLayout() {
  return (
    <>
      <Tabs
  screenOptions={{
   headerShown: false,

    tabBarShowLabel: true,

    tabBarActiveTintColor: "#FF6347",
    tabBarInactiveTintColor: "#9CA3AF",

    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: "500",
      marginBottom: 4,
    },

    tabBarIconStyle: {
      marginTop: 5,
    },

    tabBarStyle: {
      position: "absolute",

      bottom: 35,
      left: 25,
      right: 25,

      height: 70,

      backgroundColor: "#FFFFFF",

      borderRadius: 30,

      borderTopWidth: 0,

      // subtle border
      borderWidth: 1,
      borderColor: "#F2F2F2",

      // iOS shadow
     
      

      // Android shadow
     

      paddingTop: 6,
      paddingBottom: 6,
    },
  }}
>
  <Tabs.Screen
    name="index"
    options={{
      title: "Home",
      tabBarIcon: ({ color, size, focused }) => (
        <Feather
          name="home"
          color={color}
          size={focused ? 26 : 23}
        />
      ),
    }}
  />

  <Tabs.Screen
    name="menu"
    options={{
      title: "Menu",
      tabBarIcon: ({ color, size, focused }) => (
        <Feather
          name="grid"
          color={color}
          size={focused ? 26 : 23}
        />
      ),
    }}
  />


  <Tabs.Screen
    name="favorite"
    options={{
      title: "Favorite",
      tabBarIcon: ({ color, size, focused }) => (
        <Feather
          name="heart"
          color={color}
          size={focused ? 26 : 23}
        />
      ),
    }}
  />


  <Tabs.Screen
    name="cart"
    options={{
      title: "Cart",
      tabBarIcon: ({ color, size, focused }) => (
        <Feather
          name="shopping-bag"
          color={color}
          size={focused ? 26 : 23}
        />
      ),
    }}
  />


  <Tabs.Screen
    name="profile"
    options={{
      title: "Profile",
      tabBarIcon: ({ color, size, focused }) => (
        <Feather
          name="user"
          color={color}
          size={focused ? 26 : 23}
        />
      ),
    }}
  />

</Tabs>
      <StatusBar style="dark" />
    </>
  );
}

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { HomeNavigation } from "./HomeNavigation";
import { NavLogo } from "../components/Utils/NavLogo";
import { AccountNavigation } from "./AccountNavigation";
import useAuth from "../context/AuthContext/useAuth";
import { CirclesNavigation } from "./CirclesNavigation";

const Tab = createBottomTabNavigator();

function Navigation() {
  const { user } = useAuth();

  return (
    <Tab.Navigator initialRouteName="Home">
      {user && (
        <Tab.Screen
          name="Círculos"
          component={CirclesNavigation}
          options={{
            tabBarLabel: "Círculos",
            tabBarLabelStyle: {
              fontFamily: "Quicksand_400Regular",
              fontSize: 13,
            },
            tabBarIcon: ({ color, size }) => (
              <Icon name="group-work" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      )}
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => NavLogo(),
          headerShown: false,
        }}
      />
      {user && (
        <Tab.Screen
          name="Account"
          component={AccountNavigation}
          options={{
            tabBarLabel: "Mi cuenta",
            tabBarLabelStyle: {
              fontFamily: "Quicksand_400Regular",
              fontSize: 13,
            },
            tabBarIcon: ({ color, size }) => (
              <Icon name="person" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export { Navigation };

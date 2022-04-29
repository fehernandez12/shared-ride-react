import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { HomeNavigation } from "./HomeNavigation";
import { NavLogo } from "../components/NavLogo";

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => NavLogo(),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export { Navigation };

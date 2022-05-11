import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "../screens/Main";
import { SignUp } from "../screens/SignUp";

const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}

export { HomeNavigation };

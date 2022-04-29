import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "../screens/Main";

const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ title: "", headerTransparent: true }}
      />
    </Stack.Navigator>
  );
}

export { HomeNavigation };

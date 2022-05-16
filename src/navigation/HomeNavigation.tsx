import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Main } from "../screens/Main";
import { SignUp } from "../screens/SignUp";
import { Verification } from "../screens/Verification";
import { Regresar } from "../components/Regresar";

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
        options={{ title: "", headerTransparent: true, headerLeft: () => null }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => <Regresar>Regresar</Regresar>,
        }}
      />
    </Stack.Navigator>
  );
}

export { HomeNavigation };

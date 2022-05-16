import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ProfileForm } from "../components/Account/ProfileForm";
import { Regresar } from "../components/Utils/Regresar";
import { Account } from "../screens/Account";

const Stack = createStackNavigator();

function AccountNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccountNav"
        component={Account}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={ProfileForm}
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => <Regresar>Regresar</Regresar>,
        }}
      />
    </Stack.Navigator>
  );
}

export { AccountNavigation };

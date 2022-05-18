import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Circles } from "../screens/Circles";
import { NewCircle } from "../screens/NewCircle";
import { Regresar } from "../components/Utils/Regresar";
import { CircleDetailScreen } from "../screens/CircleDetailScreen";

const Stack = createStackNavigator();

function CirclesNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CirclesNav"
        component={Circles}
        options={{ title: "", headerTransparent: true }}
      />
      <Stack.Screen
        name="CreateCircle"
        component={NewCircle}
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => <Regresar>Regresar</Regresar>,
        }}
      />
      <Stack.Screen
        name="CircleDetail"
        component={CircleDetailScreen}
        options={{
          title: "",
          headerTransparent: true,
          headerLeft: () => <Regresar>Regresar</Regresar>,
        }}
      />
    </Stack.Navigator>
  );
}

export { CirclesNavigation };

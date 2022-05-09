import "react-native-gesture-handler";
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { Appearance, View, Text } from "react-native";
import AppLoading from "expo-app-loading";
import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import { Navigation } from "./src/navigation/Navigation";

export default function App() {
  const colors = useTheme().colors;
  const colorScheme = Appearance.getColorScheme();
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </NavigationContainer>
  );
}

import { Text } from "react-native";
import React from "react";
import AppLoading from "expo-app-loading";
import {
  Quicksand_400Regular,
  Quicksand_700Bold,
  useFonts,
} from "@expo-google-fonts/quicksand";
import { COLORS } from "../../styles/colors";

function AppText(props: any) {
  const { children, style, bold, color } = props;

  const getStyles = () => {
    return bold
      ? { fontFamily: "Quicksand_700Bold", color: COLORS[color] }
      : { fontFamily: "Quicksand_400Regular", color: COLORS[color] };
  };

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <Text style={[getStyles(), style]}>{children}</Text>;
}

export { AppText };

import { Pressable, StyleSheet } from "react-native";
import React from "react";
import AppLoading from "expo-app-loading";
import {
  Quicksand_400Regular,
  Quicksand_700Bold,
  useFonts,
} from "@expo-google-fonts/quicksand";
import { COLORS } from "../../styles/colors";

function AppButton(props: any) {
  const { children, style, onPress, bgColor } = props;

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: COLORS[bgColor] }, style]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    marginHorizontal: 100,
    padding: 7,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { AppButton };

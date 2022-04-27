import { TextInput } from "react-native";
import React from "react";
import AppLoading from "expo-app-loading";
import {
  Quicksand_400Regular,
  Quicksand_700Bold,
  useFonts,
} from "@expo-google-fonts/quicksand";

function AppTextInput(props: any) {
  const {
    style,
    placeholder,
    autoCapitalize,
    value,
    onChangetext,
    securetextEntry,
  } = props;

  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TextInput
      style={[{ fontFamily: "Quicksand_400Regular" }, style]}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      value={value}
      onChangeText={onChangetext}
      secureTextEntry={securetextEntry ? true : false}
    />
  );
}

export { AppTextInput };
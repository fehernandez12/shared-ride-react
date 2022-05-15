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
    onChangeText,
    secureTextEntry,
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
      style={[
        { fontFamily: "Quicksand_400Regular" },
        {
          height: 35,
          marginHorizontal: 12,
          marginVertical: 8,
          borderWidth: 1,
          padding: 10,
          borderRadius: 3,
        },
        style,
      ]}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry ? true : false}
    />
  );
}

export { AppTextInput };

import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import AppLoading from "expo-app-loading";

export default function App() {
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <View></View>
    </NavigationContainer>
  );
}

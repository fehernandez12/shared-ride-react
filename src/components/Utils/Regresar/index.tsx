import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppText } from "../../AppComponents/AppText";
import { COLORS } from "../../../styles/colors";

function Regresar(props: any) {
  const navigation = useNavigation();

  return (
    <Pressable style={styles.button} onPress={() => navigation.goBack()}>
      <AppText style={styles.text} color="curious-blue" bold>
        <Icon
          name="arrow-back-ios"
          color={COLORS["curious-blue"]}
          style={{ paddingTop: 10 }}
        />
        {props.children}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
  },
});

export { Regresar };

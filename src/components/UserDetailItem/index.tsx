import { View, StyleSheet } from "react-native";
import React from "react";
import { AppText } from "../AppText";

function UserDetailItem(props: any) {
  const { title, text } = props;
  return (
    <View style={styles.item}>
      <AppText bold>{title}</AppText>
      {text ? <AppText>{text}</AppText> : null}
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
});

export { UserDetailItem };

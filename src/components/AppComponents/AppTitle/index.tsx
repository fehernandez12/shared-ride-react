import { View, StyleSheet } from "react-native";
import React from "react";
import { AppText } from "../AppText";

function AppTitle(props: any) {
  const { title, subTitle } = props;
  return (
    <>
      <View style={styles.titleBlock}>
        <AppText style={styles.title} bold>
          {title}
        </AppText>
      </View>
      {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
    </>
  );
}

const styles = StyleSheet.create({
  titleBlock: {
    marginBottom: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export { AppTitle };

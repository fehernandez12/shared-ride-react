import { View, StyleSheet } from "react-native";
import React from "react";
import { AppText } from "../../AppComponents/AppText";

function StatCard(props: any) {
  const { title, value, bg } = props;
  return (
    <View style={[styles.card]}>
      <View style={styles.spacing}>
        <View style={[styles.bgStyles, { backgroundColor: bg }]}>
          <AppText style={styles.value} bold={true} color="white">
            {value}
          </AppText>
          <AppText style={styles.title} bold={true} color="white">
            {title}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 150,
  },
  spacing: {
    flex: 1,
    padding: 4,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    
  },
  title: {
    fontSize: 14,
  },
  value: {
    fontSize: 48,
  },
});

export { StatCard };

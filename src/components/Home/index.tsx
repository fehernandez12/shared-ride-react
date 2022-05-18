import { View, StyleSheet } from "react-native";
import React from "react";
import useAuth from "../../context/AuthContext/useAuth";
import { HomeHeader } from "./HomeHeader";
import { DashBoardInfo } from "./DashBoardInfo";

function Home() {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <HomeHeader user={user} />
      <DashBoardInfo user={user} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 32,
  },
});

export { Home };

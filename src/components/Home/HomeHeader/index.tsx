import { View, StyleSheet, Button } from "react-native";
import React from "react";
import { UserDto } from "../../../models/users.model";
import { StatCard } from "../StatCard";
import { AppText } from "../../AppComponents/AppText";
import { COLORS } from "../../../styles/colors";
import useAuth from "../../../context/AuthContext/useAuth";

function HomeHeader(props: any) {
  const { user } = props as { user: UserDto };
  const { logout } = useAuth();

  return (
    <View>
      <AppText
        style={styles.title}
        bold={true}
      >{`Bienvei, ${user.first_name}!`}</AppText>
      <View style={styles.hr} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    
  },
  hr: {
    marginVertical: 16,
    marginHorizontal: 4,
    borderColor: COLORS["blumine-blue"],
    borderWidth: 1,
    
  },
  stats: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",

  },
});

export { HomeHeader };

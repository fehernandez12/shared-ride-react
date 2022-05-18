import { View, StyleSheet, Button } from "react-native";
import React, {useState} from "react";
import { UserDto } from "../../../models/users.model";
import { StatCard } from "../StatCard";
import { AppText } from "../../AppComponents/AppText";
import { COLORS } from "../../../styles/colors";
import useAuth from "../../../context/AuthContext/useAuth";
import { FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native";


function DashBoardInfo(props: any) {
  const { user } = props as { user: UserDto };
  const { logout } = useAuth();



  return (
    <View>
      <View style={styles.stats}>
        <StatCard
          title="Rides ofrecidos"
          value={user.profile.rides_offered}
          bg={COLORS["curious-blue"]}
        />
        <StatCard
          title="Rides tomados"
          value={user.profile.rides_taken}
          bg={COLORS["mariner-blue"]}
        />

      </View>
      
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

export { DashBoardInfo };
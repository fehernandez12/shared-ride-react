import { View, StyleSheet } from "react-native";
import React from "react";
import { UserDto } from "../../../models/users.model";
import { StatCard } from "../StatCard";
import { COLORS } from "../../../styles/colors";
import useAuth from "../../../context/AuthContext/useAuth";
import { AppImage } from "../../AppComponents/AppImage";

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
      <View style={styles.imageContainer}>
        <AppImage
          source={require("../../../assets/imagen-dashboard.png")}
          style={styles.image}
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
  imageContainer: {
    top: 175,
    alignItems: "center",
  },
  image: {
    width: 222 * 1.6,
    height: 123 * 1.6,
  },
});

export { DashBoardInfo };

import { View, ScrollView, StyleSheet } from "react-native";
import React from "react";
import useAuth from "../../../context/AuthContext/useAuth";
import { AppImage } from "../../AppComponents/AppImage";
import { AppText } from "../../AppComponents/AppText";
import { AppButton } from "../../AppComponents/AppButton";
import { UserDetailItem } from "../UserDetailItem";
import { RepStars } from "../RepStars";
import { useNavigation } from "@react-navigation/native";

function UserDetail() {
  const { user, logout } = useAuth();
  const profile = user ? user.profile : null;
  const navigation: any = useNavigation();

  const goToProfileForm = () => {
    navigation.navigate("UpdateProfile");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleBlock}>
        <AppText style={styles.title} bold>
          Tu cuenta
        </AppText>
      </View>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <AppImage
            source={{ uri: profile?.picture }}
            style={styles.profilePicture}
          />
        </View>
        <UserDetailItem title="Username" text={`@${user?.username}`} />
        <UserDetailItem
          title="Nombre"
          text={`${user?.first_name} ${user?.last_name}`}
        />
        <UserDetailItem title="Email" text={`${user?.email}`} />
        <UserDetailItem
          title="Número de teléfono"
          text={`${user?.phone_number}`}
        />
        <UserDetailItem title="Acerca de mí" text={`${profile?.biography}`} />
        <UserDetailItem title="Reputación">
          <RepStars reputation={profile?.reputation} />
        </UserDetailItem>
        <AppButton
          style={styles.button}
          onPress={goToProfileForm}
          bgColor="teal"
        >
          <AppText color="white" bold>
            Editar perfil
          </AppText>
        </AppButton>
        <AppButton style={styles.button} onPress={logout} bgColor="red">
          <AppText color="white" bold>
            Cerrar sesión
          </AppText>
        </AppButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginHorizontal: 20,
  },
  titleBlock: {
    marginBottom: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
  },
  imageContainer: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  content: {
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export { UserDetail };

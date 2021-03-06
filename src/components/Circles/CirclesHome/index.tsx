import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { AppText } from "../../AppComponents/AppText";
import { AppMenuItem } from "../../AppComponents/AppMenuItem";
import { AppTitle } from "../../AppComponents/AppTitle";
import { UserService } from "../../../services/users.service";
import useAuth from "../../../context/AuthContext/useAuth";
import { UserDetailDto } from "../../../models/users.model";
import { CircleListItem } from "../CircleListItem";

function CirclesHome() {
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const userService = new UserService();
  const navigation: any = useNavigation();

  const [userDetail, setUserDetail] = useState<UserDetailDto>(
    {} as UserDetailDto
  );

  useEffect(() => {
    userService
      .getUser(user!.username)
      .then((response) => setUserDetail(response));
  }, [isFocused]);

  const goToCircleCreate = () => {
    navigation.navigate("CreateCircle");
  };

  const goToCircleDetail = (slug: string) => {
    navigation.navigate("CircleDetail", { slug: slug });
  };

  return (
    <ScrollView style={styles.container}>
      <AppTitle
        title="Tus círculos"
        subTitle="Aquí puedes ver los círculos a los que perteneces."
      />
      <View style={styles.content}>
        {userDetail.circles && userDetail.circles.length > 0 ? (
          userDetail.circles.map((circle) => (
            <CircleListItem key={circle.slug_name} circle={circle} />
          ))
        ) : (
          <AppMenuItem>
            <Pressable onPress={goToCircleCreate}>
              <AppText bold color="red">
                No perteneces a ningún círculo. Toca aquí para crear uno.
              </AppText>
            </Pressable>
          </AppMenuItem>
        )}
        {userDetail.circles && userDetail.circles.length > 0 && (
          <AppMenuItem>
            <Pressable onPress={goToCircleCreate}>
              <AppText bold color="mariner-blue">
                Crear un círculo nuevo
              </AppText>
            </Pressable>
          </AppMenuItem>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
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
  subTitle: {
    fontSize: 16,
  },
  content: {
    marginBottom: 20,
  },
});

export { CirclesHome };

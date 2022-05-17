import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import useAuth from "../../../context/AuthContext/useAuth";
import { UserService } from "../../../services/users.service";
import { CircleService } from "../../../services/circles.service";
import { AppText } from "../../AppComponents/AppText";
import { AppTextInput } from "../../AppComponents/AppTextInput";
import { COLORS } from "../../../styles/colors";

function CircleForm() {
  const [error, setError] = useState("");
  const navigation: any = useNavigation();
  const { user } = useAuth();
  const userService = new UserService();
  const circleService = new CircleService();
  const goToCircleDetail = () => {
    console.log("goToCircleDetail");
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <AppText style={styles.title} bold>
          Crear un nuevo circulo
        </AppText>
      </View>
      <View style={styles.subTitleBlock}>
        <AppText style={styles.subTitle}>
          Después de crear el círculo, podrás invitar más miembros.
        </AppText>
      </View>
      <View style={styles.content}>
        <AppText bold color="black-pearl">
          Nombre del círculo
        </AppText>
        <AppTextInput
          placeholder="Nombre del círculo"
          autocapitalize="sentences"
        />
        <AppText bold color="black-pearl">
          Slug del círculo
        </AppText>
        <AppTextInput placeholder="slug-del-circulo" autocapitalize="none" />
        <AppText color="teal" style={styles.helpText}>
          Un slug es una pequeña etiqueta para un objeto, que contiene solo
          letras, números y guiones.
        </AppText>
        <AppText bold color="black-pearl">
          Acerca del círculo
        </AppText>
        <AppTextInput
          placeholder="Acerca del círculo"
          autocapitalize="sentences"
          multiline
          numberOfLines={4}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginHorizontal: 20,
  },
  titleBlock: {
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 22,
  },
  subTitleBlock: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
  },
  helpText: {
    fontSize: 10,
    color: COLORS["curious-blue"],
  },
  imageContainer: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
  },
  profilePicture: {
    padding: 7,
    borderColor: "#fafbfc",
    borderWidth: 3,
    width: 200,
    height: 200,
    borderRadius: 3,
    marginTop: 20,
  },
});

export { CircleForm };

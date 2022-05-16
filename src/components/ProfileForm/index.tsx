import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppText } from "../AppText";
import { AppTextInput } from "../AppTextInput";
import { AppButton } from "../AppButton";
import useAuth from "../../context/AuthContext/useAuth";
import { UserService } from "../../services/users.service";
import { ProfileDto } from "../../models/profile.model";
import { UserDto } from "../../models/users.model";

function ProfileForm() {
  const { user, setUser } = useAuth();
  const profile = user?.profile;
  const [error, setError] = useState("");
  const navigation: any = useNavigation();
  const service = new UserService();

  const isUserDto = (obj: UserDto | any): boolean => {
    return obj.hasOwnProperty("profile");
  };

  const formik = useFormik({
    initialValues: initialValues(profile!.biography),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (values) => {
      setError("");
      const { biography }: Partial<ProfileDto> = values;
      const response: UserDto = await service.updateProfile(
        { biography },
        user!.username
      );
      if (isUserDto(response)) {
        setUser(response);
        goToUserDetail();
      } else {
        console.log(response);
      }
    },
  });

  const goToUserDetail = () => {
    navigation.goBack();
  };

  const changeFieldValue = (field: string, value: string) => {
    formik.setFieldValue(field, value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <AppText style={styles.title} bold>
          Editar perfil
        </AppText>
      </View>
      <View style={styles.content}>
        <AppText bold color={"black-pearl"}>
          Acerca de mí
        </AppText>
        <AppTextInput
          placeholder={profile?.biography ? null : "Acerca de mí"}
          autoCapitalize="sentences"
          value={formik.values.biography}
          onChangeText={(text: string) => changeFieldValue("biography", text)}
          multiline
          numberOfLines={4}
        />
        <AppButton bgColor="green" onPress={() => formik.handleSubmit()}>
          <AppText bold color={"white"}>
            Guardar cambios
          </AppText>
        </AppButton>
      </View>
    </View>
  );
}

function initialValues(text: string): Partial<ProfileDto> {
  return {
    biography: text || "",
  };
}

function validationSchema() {
  return {
    biography: Yup.string(),
  };
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
  content: {
    marginBottom: 20,
  },
});

export { ProfileForm };

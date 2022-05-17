import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { AppText } from "../../AppComponents/AppText";
import { AppTextInput } from "../../AppComponents/AppTextInput";
import { AppButton } from "../../AppComponents/AppButton";
import useAuth from "../../../context/AuthContext/useAuth";
import { UserService } from "../../../services/users.service";
import { ProfileDto } from "../../../models/profile.model";
import { UserDto } from "../../../models/users.model";
import { AppImage } from "../../AppComponents/AppImage";

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
        user!.username,
        null,
        { biography }
      );

      if (isUserDto(response)) {
        setUser(response);
        goToUserDetail();
      } else {
        setError("Error al actualizar su perfil.");
      }
    },
  });

  const goToUserDetail = () => {
    navigation.goBack();
  };

  const changeFieldValue = (field: string, value: any) => {
    formik.setFieldValue(field, value);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      includeBase64: true,
    });

    if (result.cancelled) {
      return;
    }
    let blob = await (await fetch(result.uri)).blob();

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append("photo", blob);

    const response = await service.updateProfile(user!.username, formData);

    if (isUserDto(response)) {
      setUser(response);
    }
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
        {/* <AppText bold color={"black-pearl"}>
          Foto de perfil
        </AppText> */}
        {/* <View style={styles.imageContainer}>
          <AppImage
            source={
              profile?.picture
                ? { uri: profile?.picture }
                : require("../../../assets/avatar-placeholder.png")
            }
            style={styles.profilePicture}
            flex={false}
          />
        </View>
        <AppButton
          bgColor="purple"
          style={{ marginHorizontal: 75 }}
          onPress={pickImage}
        >
          <AppText bold color={"white"}>
            Cambiar foto del perfil
          </AppText>
        </AppButton> */}
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
    picture: undefined,
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

export { ProfileForm };

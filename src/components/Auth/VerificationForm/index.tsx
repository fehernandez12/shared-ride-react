import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserService } from "../../../services/users.service";
import { VerificationRequestDto } from "../../../models/users.model";
import { VerificationResponseDto } from "../../../models/users.model";
import { AppLogo } from "../../AppComponents/AppLogo";
import { AppText } from "../../AppComponents/AppText";
import { AppTextInput } from "../../AppComponents/AppTextInput";
import { AppButton } from "../../AppComponents/AppButton";
import { COLORS } from "../../../styles/colors";

function VerificationForm() {
  const [error, setError] = useState("");

  const navigation: any = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const service = new UserService();

  const changeFieldValue = (text: string, fieldName: string) => {
    formik.setFieldValue(fieldName, text);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (values) => {
      setError("");
      const { token } = values;
      const response: VerificationResponseDto = await service.verify({ token });
      if (response.message) {
        Alert.alert(
          "¡Bienvenido!",
          "Tu cuenta ha sido verificada con éxito 🥳"
        );
        navigation.navigate("Main");
      } else {
        console.log(response);
        if (response.token) {
          setError("El token es inválido 😢");
        }
      }
    },
  });

  return (
    <View style={styles.container}>
      <AppLogo width={240} />
      <AppText style={styles.title} bold color="black-pearl">
        Verifica tu cuenta
      </AppText>
      <AppText style={styles.subtitle} color="black-pearl">
        Ingresa el código que te enviamos a tu correo a continuación.
      </AppText>
      <AppTextInput
        placeholder="Código"
        value={formik.values.token}
        onChangeText={(text: string) => changeFieldValue(text, "token")}
      />
      <AppButton onPress={formik.handleSubmit} bgColor="mariner-blue">
        <AppText bold color="white">
          Verificar mi cuenta
        </AppText>
      </AppButton>
      <AppText bold={true} style={styles.errorMessages}>
        {error}
      </AppText>
    </View>
  );
}

function initialValues(): VerificationRequestDto {
  return {
    token: "",
  };
}

function validationSchema() {
  return {
    token: Yup.string().required("¡Cuidado, el email es requerido!"),
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  errorMessages: {
    textAlign: "center",
    color: COLORS["red"],
  },
  redirectButton: {
    marginVertical: 0,
    marginHorizontal: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { VerificationForm };

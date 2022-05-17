import { View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../../context/AuthContext/useAuth";
import { UserService } from "../../../services/users.service";
import { LoginRequestDto, LoginResponseDto } from "../../../models/users.model";
import { AppLogo } from "../../AppComponents/AppLogo";
import { AppText } from "../../AppComponents/AppText";
import { AppTextInput } from "../../AppComponents/AppTextInput";
import { AppButton } from "../../AppComponents/AppButton";
import { COLORS } from "../../../styles/colors";

function Login() {
  const [error, setError] = useState("");

  const navigation: any = useNavigation();

  const { login } = useAuth();

  const service = new UserService();

  // Inicializa el formulario
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (values) => {
      setError("");
      const { email, password } = values;
      const response: LoginResponseDto = await service.login({
        email,
        password,
      });
      if (response.access_token) {
        login(response);
      } else {
        if (response.non_field_errors) {
          setError(
            response.non_field_errors[0] === "Account is not active yet :("
              ? "Tu cuenta no está activa aún 🥺"
              : "El correo o la contraseña son incorrectos 😢"
          );
        }
      }
    },
  });

  const goToSignUp = () => {
    navigation.navigate("SignUp");
  };

  const goToVerification = () => {
    navigation.navigate("Verification");
  };

  const changeFieldValue = (text: string, fieldName: string) => {
    formik.setFieldValue(fieldName, text);
  };

  return (
    <View style={styles.container}>
      <AppLogo width={240} />
      <AppText style={styles.title} bold={true} color={"black-pearl"}>
        Iniciar sesión
      </AppText>
      <AppTextInput
        placeholder={"Correo electrónico"}
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={(text: string) => changeFieldValue(text, "email")}
      />
      <AppTextInput
        placeholder={"Password"}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text: string) => changeFieldValue(text, "password")}
      />
      <AppButton onPress={() => formik.handleSubmit()} bgColor="mariner-blue">
        <AppText bold={true} color={"white"}>
          Iniciar sesión
        </AppText>
      </AppButton>
      <AppButton onPress={goToSignUp} style={styles.redirectButton}>
        <AppText bold color={"mariner-blue"}>
          ¿No tienes una cuenta? ¡Regístrate!
        </AppText>
      </AppButton>
      <AppButton onPress={goToVerification} style={styles.redirectButton}>
        <AppText bold color={"mariner-blue"}>
          ¿No has activado tu cuenta? ¡Actívala aquí!
        </AppText>
      </AppButton>
      <AppText bold={true} style={styles.errorMessages}>
        {error ? error : formik.errors.email || formik.errors.password}
      </AppText>
    </View>
  );
}

function initialValues(): LoginRequestDto {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().required("¡Cuidado, el email es requerido!"),
    password: Yup.string().required("¡Cuidado, el password es requerido!"),
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    marginTop: 0,
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

export { Login };

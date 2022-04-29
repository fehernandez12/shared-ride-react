import { View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import useAuth from "../../../context/AuthContext/useAuth";
import { UserService } from "../../../services/users.service";
import { LoginRequestDto, LoginResponseDto } from "../../../models/users.model";
import { AppText } from "../../AppText";
import { AppTextInput } from "../../AppTextInput";
import { AppButton } from "../../AppButton";

function Login() {
  const [error, setError] = useState("");

  const { login } = useAuth();

  const service = new UserService();

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
      if (response) {
        login(response);
      } else {
        setError("Datos de autenticación incorrectos.");
      }
    },
  });

  const changeFieldValue = (text: string, fieldName: string) => {
    formik.setFieldValue(fieldName, text);
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title} bold={true} color={"black-pearl"}>
        Iniciar sesión
      </AppText>
      <AppTextInput
        placeholder={"Correo electrónico"}
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={(text: string) => changeFieldValue(text, "email")}
      />
      <AppTextInput
        placeholder={"Password"}
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text: string) => changeFieldValue(text, "password")}
      />
      <AppButton
        onPress={() => formik.handleSubmit()}
        style={styles.buttonContainer}
      >
        <AppText bold={true} color={"white"}>
          Iniciar sesión
        </AppText>
      </AppButton>
      <AppText bold={true} style={styles.errorMessages}>
        {formik.errors.email}
      </AppText>
      <AppText bold={true} style={styles.errorMessages}>
        {formik.errors.password}
      </AppText>
      <AppText bold={true} style={styles.errorMessages}>
        {error}
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
    marginTop: 100,
    marginBottom: 20,
  },
  input: {
    height: 35,
    marginHorizontal: 12,
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
  buttonContainer: {
    backgroundColor: "#007AFF",
    marginHorizontal: 100,
    borderRadius: 3,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessages: {
    textAlign: "center",
    color: "red",
    marginTop: 8,
  },
});

export { Login };

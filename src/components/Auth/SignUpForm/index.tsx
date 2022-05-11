import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../context/AuthContext/useAuth";
import { UserService } from "../../../services/users.service";
import { SignupRequestDto, UserDto } from "../../../models/users.model";
import { AppText } from "../../AppText";
import { AppTextInput } from "../../AppTextInput";
import { AppButton } from "../../AppButton";
import { useNavigation } from "@react-navigation/native";
import { ErrorDto } from "../../../models/error.model";

function SignUpForm() {
  const [error, setError] = useState("");

  const navigation: any = useNavigation();

  const { login } = useAuth();

  const service = new UserService();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (values) => {
      setError("");
      const {
        email,
        username,
        first_name,
        last_name,
        phone_number,
        password,
        password_confirmation,
      }: SignupRequestDto = values;
      const response: UserDto | ErrorDto = await service.signup({
        email,
        username,
        first_name,
        last_name,
        phone_number,
        password,
        password_confirmation,
      });
      if (!(response instanceof ErrorDto)) {
        console.log("Usuario creado!");
        console.log(response);
      } else {
        setError("Error. Verifica que los datos sean correctos.");
        console.log(response);
      }
    },
  });

  const changeFieldValue = (text: string, fieldName: string) => {
    formik.setFieldValue(fieldName, text);
  };

  const goToLogin = () => {
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title} bold color={"black-pearl"}>
        Crear cuenta
      </AppText>
      <AppTextInput
        placeholder={"Correo electrónico"}
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={(text: string) => changeFieldValue(text, "email")}
      />
      <AppTextInput
        placeholder={"Nombre de usuario"}
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text: string) => changeFieldValue(text, "username")}
      />
      <AppTextInput
        placeholder={"Nombres"}
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.first_name}
        onChangeText={(text: string) => changeFieldValue(text, "first_name")}
      />
      <AppTextInput
        placeholder={"Apellidos"}
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.last_name}
        onChangeText={(text: string) => changeFieldValue(text, "last_name")}
      />
      <AppTextInput
        placeholder={"Numero telefónico"}
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.phone_number}
        onChangeText={(text: string) => changeFieldValue(text, "phone_number")}
      />
      <AppTextInput
        placeholder={"Password"}
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text: string) => changeFieldValue(text, "password")}
      />
      <AppTextInput
        placeholder={"Confirma tu Password"}
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password_confirmation}
        onChangeText={(text: string) =>
          changeFieldValue(text, "password_confirmation")
        }
      />
      <AppButton
        onPress={() => formik.handleSubmit()}
        style={styles.buttonContainer}
      >
        <AppText bold color={"white"}>
          Iniciar sesión
        </AppText>
      </AppButton>
      <AppButton onPress={goToLogin} style={styles.redirectButton}>
        <AppText bold color={"mariner-blue"}>
          ¿Ya tienes una cuenta? Inicia sesión.
        </AppText>
      </AppButton>
      <AppText bold style={styles.errorMessages}>
        {formik.errors.email}
      </AppText>
      <AppText bold style={styles.errorMessages}>
        {formik.errors.first_name}
      </AppText>
      <AppText bold style={styles.errorMessages}>
        {formik.errors.last_name}
      </AppText>
      <AppText bold style={styles.errorMessages}>
        {formik.errors.username}
      </AppText>
      <AppText bold style={styles.errorMessages}>
        {formik.errors.phone_number}
      </AppText>
      <AppText bold style={styles.errorMessages}>
        {formik.errors.password}
      </AppText>
      <AppText bold style={styles.errorMessages}>
        {formik.errors.password_confirmation}
      </AppText>
      <AppText bold style={styles.errorMessages}>
        {error}
      </AppText>
    </View>
  );
}

function initialValues(): SignupRequestDto {
  return {
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email("Correo electrónico inválido")
      .required("Campo requerido"),
    username: Yup.string().required("El nombre de usuario requerido"),
    first_name: Yup.string().required("El nombre es requerido"),
    last_name: Yup.string().required("El apellido requerido"),
    phone_number: Yup.string().required("El número telefónico es requerido"),
    password: Yup.string().required("El password es requerido"),
    password_confirmation: Yup.string().required("Los passwords no coinciden."),
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
    marginTop: 50,
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
  redirectButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { SignUpForm };

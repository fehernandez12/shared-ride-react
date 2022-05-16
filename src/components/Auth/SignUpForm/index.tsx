import { ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../../context/AuthContext/useAuth";
import { UserService } from "../../../services/users.service";
import { SignupRequestDto, UserDto } from "../../../models/users.model";
import { AppLogo } from "../../AppComponents/AppLogo";
import { AppText } from "../../AppComponents/AppText";
import { AppTextInput } from "../../AppComponents/AppTextInput";
import { AppButton } from "../../AppComponents/AppButton";
import { SignupErrorDto } from "../../../models/error.model";
import { COLORS } from "../../../styles/colors";

function SignUpForm() {
  const [error, setError] = useState("");

  const navigation: any = useNavigation();

  const { login } = useAuth();

  const service = new UserService();

  const isUserDto = (obj: UserDto | SignupErrorDto): boolean => {
    return obj.hasOwnProperty("profile");
  };

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
      const response: UserDto | SignupErrorDto = await signUp({
        email,
        username,
        first_name,
        last_name,
        phone_number,
        password,
        password_confirmation,
      });
      if (isUserDto(response)) {
        goToVerification();
      } else {
        if (Array.isArray(response.username) || Array.isArray(response.email)) {
          setError("El nombre de usuario o correo ya está en uso.");
        } else {
          if (response.non_field_errors) {
            setError("Las contraseñas no coinciden.");
          } else if (formik.errors) {
            setError("Todos los campos son obligatorios.");
          }
        }
      }
    },
  });

  const signUp = async (request: SignupRequestDto) => {
    return await service.signup(request);
  };

  const changeFieldValue = (text: string, fieldName: string) => {
    formik.setFieldValue(fieldName, text);
  };

  const goToLogin = () => {
    navigation.navigate("Main");
  };

  const goToVerification = () => {
    navigation.navigate("Verification");
  };

  return (
    <ScrollView style={styles.container}>
      <AppLogo width={240} />
      <AppText style={styles.title} bold color={"black-pearl"}>
        Crear cuenta
      </AppText>
      <AppTextInput
        placeholder={"Correo electrónico"}
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={(text: string) => changeFieldValue(text, "email")}
      />
      <AppTextInput
        placeholder={"Nombre de usuario"}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(text: string) => changeFieldValue(text, "username")}
      />
      <AppTextInput
        placeholder={"Nombres"}
        autoCapitalize="none"
        value={formik.values.first_name}
        onChangeText={(text: string) => changeFieldValue(text, "first_name")}
      />
      <AppTextInput
        placeholder={"Apellidos"}
        autoCapitalize="none"
        value={formik.values.last_name}
        onChangeText={(text: string) => changeFieldValue(text, "last_name")}
      />
      <AppTextInput
        placeholder={"Numero telefónico"}
        autoCapitalize="none"
        value={formik.values.phone_number}
        onChangeText={(text: string) => changeFieldValue(text, "phone_number")}
      />
      <AppTextInput
        placeholder={"Password"}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text: string) => changeFieldValue(text, "password")}
      />
      <AppTextInput
        placeholder={"Confirma tu Password"}
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
        bgColor="mariner-blue"
      >
        <AppText bold color={"white"}>
          Registrarme
        </AppText>
      </AppButton>
      <AppButton onPress={goToLogin} style={styles.redirectButton}>
        <AppText bold color={"mariner-blue"}>
          ¿Ya tienes una cuenta? Inicia sesión.
        </AppText>
      </AppButton>
      <AppButton onPress={goToVerification} style={styles.redirectButton}>
        <AppText bold color={"mariner-blue"}>
          ¿No has activado tu cuenta? ¡Actívala aquí!
        </AppText>
      </AppButton>
      <AppText bold style={styles.errorMessages}>
        {error}
      </AppText>
    </ScrollView>
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
      .required("El email es requerido"),
    username: Yup.string().required("El nombre de usuario es requerido"),
    first_name: Yup.string().required("El nombre es requerido"),
    last_name: Yup.string().required("El apellido requerido"),
    phone_number: Yup.string().required("El número telefónico es requerido"),
    password: Yup.string().required("El password es requerido"),
    password_confirmation: Yup.string().required("Los passwords no coinciden."),
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 20,
  },
  buttonContainer: {
    marginHorizontal: 100,
    borderRadius: 3,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  errorMessages: {
    textAlign: "center",
    color: COLORS["red"],
    marginTop: 8,
  },
  redirectButton: {
    marginVertical: 0,
    marginHorizontal: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { SignUpForm };

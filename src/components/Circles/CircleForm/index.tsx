import { View, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../context/AuthContext/useAuth";
import { UserService } from "../../../services/users.service";
import { CircleService } from "../../../services/circles.service";
import { AppText } from "../../AppComponents/AppText";
import { AppTextInput } from "../../AppComponents/AppTextInput";
import { COLORS } from "../../../styles/colors";
import { AppButton } from "../../AppComponents/AppButton";
import { CircleDto } from "../../../models/circle.model";

function CircleForm() {
  const [error, setError] = useState("");
  const navigation: any = useNavigation();
  const { user } = useAuth();
  const userService = new UserService();
  const circleService = new CircleService();
  const [limitedEnabled, setLimitedEnabled] = useState(false);

  const toggleLimitedSwitch = () => {
    setLimitedEnabled(!limitedEnabled);
  };

  const goToCircleDetail = (response: CircleDto) => {
    navigation.navigate("CirclesNav");
  };

  const validateSlug = (slug: string): Boolean => {
    let re: RegExp = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return re.test(slug);
  };

  const changeFieldValue = async (text: string, fieldName: string) => {
    if (fieldName === "members_limit") {
      formik.setFieldValue(fieldName, parseInt(text));
      return;
    }
    formik.setFieldValue(fieldName, text);
    if (fieldName === "slug_name" && text.length > 0) {
      if (!validateSlug(text)) {
        formik.setFieldError(
          fieldName,
          "El slug debe contener solo letras minúsculas, guiones y números."
        );
      } else {
        const existingCircle = await circleService.getCircle(text);
        if (!existingCircle.detail) {
          formik.setFieldError(fieldName, `El slug name '${text}' ya existe.`);
        } else {
          formik.setFieldError(fieldName, undefined);
        }
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (values) => {
      setError("");
      const { name, about, slug_name, members_limit } = values;
      const request: Partial<CircleDto> = {
        name,
        about,
        slug_name,
        is_limited: limitedEnabled,
      };
      if (limitedEnabled) {
        console.log(members_limit);
        request.members_limit = members_limit!;
      }
      const response: CircleDto = await circleService.createCircle(request);
      if (response) {
        goToCircleDetail(response);
      }
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.titleBlock}>
        <AppText style={styles.title} bold>
          Crear un nuevo círculo
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
          value={formik.values.name}
          onChangeText={(text: string) => changeFieldValue(text, "name")}
        />
        {formik.errors.name && (
          <AppText bold={true} style={styles.errorMessages}>
            {formik.errors.name}
          </AppText>
        )}
        <AppText bold color="black-pearl">
          Slug del círculo
        </AppText>
        <AppTextInput
          placeholder="slug-del-circulo"
          value={formik.values.slug_name}
          onChangeText={(text: string) => changeFieldValue(text, "slug_name")}
          autoCapitalize="none"
        />
        <AppText color="teal" style={styles.helpText}>
          Un slug es una pequeña etiqueta para un objeto, que contiene solo
          letras, números y guiones. Tu slug debe ser único.
        </AppText>
        {formik.errors.slug_name && (
          <AppText bold={true} style={styles.errorMessages}>
            {formik.errors.slug_name}
          </AppText>
        )}
        <AppText bold color="black-pearl">
          Acerca del círculo
        </AppText>
        <AppTextInput
          placeholder="Acerca del círculo"
          autocapitalize="sentences"
          multiline
          numberOfLines={4}
          value={formik.values.about}
          onChangeText={(text: string) => changeFieldValue(text, "about")}
        />
        {formik.errors.about && (
          <AppText bold={true} style={styles.errorMessages}>
            {formik.errors.about}
          </AppText>
        )}
        <View style={styles.switchContainer}>
          <AppText bold color="black-pearl">
            ¿El número de miembros es limitado?
          </AppText>
          <Switch
            trackColor={{
              false: COLORS["black"],
              true: COLORS["mariner-blue"],
            }}
            thumbColor={COLORS["white"]}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLimitedSwitch}
            value={limitedEnabled}
          />
        </View>
        {limitedEnabled && (
          <>
            <AppText bold color="black-pearl">
              Número de miembros
            </AppText>
            <AppTextInput
              placeholder="Número de miembros"
              autocapitalize="sentences"
              multiline
              numberOfLines={4}
              value={formik.values.members_limit}
              onChangeText={(text: string) =>
                changeFieldValue(text, "members_limit")
              }
            />
            {formik.errors.members_limit && (
              <AppText bold={true} style={styles.errorMessages}>
                {formik.errors.members_limit}
              </AppText>
            )}
          </>
        )}
        <AppButton bgColor="green" onPress={() => formik.handleSubmit()}>
          <AppText bold color={"white"}>
            Guardar cambios
          </AppText>
        </AppButton>
      </View>
    </View>
  );
}

function initialValues(): Partial<CircleDto> {
  return {
    name: "",
    slug_name: "",
    about: "",
    is_limited: false,
    members_limit: 0,
  };
}

function validationSchema() {
  return {
    name: Yup.string().required("¡Cuidado, el nombre es requerido!"),
    slug_name: Yup.string().required("¡Cuidado, el slug name es requerido!"),
    about: Yup.string(),
    is_public: Yup.bool(),
    is_limited: Yup.bool(),
    members_limit: Yup.number().default(0),
  };
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
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
  },
  content: {
    marginBottom: 20,
  },
  helpText: {
    fontSize: 12,
    color: COLORS["curious-blue"],
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
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
  errorMessages: {
    color: COLORS["red"],
    marginBottom: 5,
  },
});

export { CircleForm };

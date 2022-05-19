import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AppMenuItem } from "../../AppComponents/AppMenuItem";
import { AppText } from "../../AppComponents/AppText";
import { CircleDto } from "../../../models/circle.model";

function CircleListItem(props: any) {
  const { circle } = props;
  const navigation: any = useNavigation();

  const goToCircleDetail = () => {
    navigation.navigate("CircleDetail", { slug: circle.slug_name });
  };

  return (
    <AppMenuItem key={circle.slug_name}>
      <Pressable onPress={goToCircleDetail}>
        <AppText bold color="curious-blue">
          {circle.name}
        </AppText>
      </Pressable>
    </AppMenuItem>
  );
}

export { CircleListItem };

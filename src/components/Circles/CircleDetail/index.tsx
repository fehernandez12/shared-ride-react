import { View, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CircleService } from "../../../services/circles.service";
import { CircleDto } from "../../../models/circle.model";
import { AppText } from "../../AppComponents/AppText";
import { AppButton } from "../../AppComponents/AppButton";
import { AppTitle } from "../../AppComponents/AppTitle";
import { AppMenuItem } from "../../AppComponents/AppMenuItem";
import { VerifiedBadge } from "../VerifiedBadge";
import { COLORS } from "../../../styles/colors";

function CircleDetail(props: any) {
  const { slug } = props;

  const navigation: any = useNavigation();

  const circleService = new CircleService();

  const [loading, setLoading] = useState(false);
  const [circle, setCircle] = useState({} as CircleDto);

  const getCircleDetail = async () => {
    try {
      const response: CircleDto = await circleService.getCircle(slug);
      setCircle(response);
    } catch (error) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    setLoading(true);
    getCircleDetail();
    setLoading(false);
  }, []);

  if (!circle) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <AppTitle title={circle.name} subTitle={circle.about} />
      {circle.verified && (
        <AppMenuItem title="Círculo verificado" style={{ paddingVertical: 12 }}>
          <VerifiedBadge />
        </AppMenuItem>
      )}
      <AppMenuItem title="Rides tomados" text={`${circle.rides_taken}`} />
      <AppMenuItem title="Rides ofrecidos" text={`${circle.rides_offered}`} />
      {circle.is_limited && (
        <AppMenuItem
          title="Límite de miembros"
          text={`${circle.members_limit}`}
        />
      )}
      {circle.is_public && <AppMenuItem title="Círculo público" text="Sí" />}
      <AppButton bgColor="teal">
        <AppText color="white" bold>
          Invitar miembros
        </AppText>
      </AppButton>
      <AppButton bgColor="mariner-blue">
        <AppText color="white" bold>
          Editar círculo
        </AppText>
      </AppButton>
    </ScrollView>
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
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  content: {
    marginBottom: 20,
  },
});

export { CircleDetail };

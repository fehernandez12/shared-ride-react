import { View, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CircleService } from "../../../services/circles.service";
import { CircleDto } from "../../../models/circle.model";
import { AppText } from "../../AppComponents/AppText";

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

  console.log(circle);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleBlock}>
        <AppText bold style={styles.title}>
          {circle.name}
        </AppText>
      </View>
    </ScrollView>
  );
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
  subTitle: {
    fontSize: 16,
  },
  content: {
    marginBottom: 20,
  },
});

export { CircleDetail };

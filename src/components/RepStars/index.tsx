import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { COLORS } from "../../styles/colors";

function RepStars(props: any) {
  const { reputation } = props;
  const wholeStars = Math.floor(reputation);
  const halfStars = reputation - wholeStars;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < wholeStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={20} color={COLORS["yellow"]} />
      );
    }
    if (halfStars > 0) {
      stars.push(
        <Icon
          key={wholeStars + 1}
          name="star-half"
          size={20}
          color={COLORS["yellow"]}
        />
      );
    }
    if (Math.ceil(wholeStars + halfStars) < 5) {
      for (let i = 0; i < 5 - Math.ceil(wholeStars + halfStars); i++) {
        stars.push(
          <Icon
            key={Math.ceil(wholeStars + halfStars) + 1 + i}
            name="star-border"
            size={20}
            color="gray"
          />
        );
      }
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export { RepStars };

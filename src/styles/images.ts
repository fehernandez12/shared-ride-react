import { StyleSheet } from "react-native";

export const getContainerStyles = (shadow: boolean, color: string) => {
  if (shadow) {
    let style = {
      ...styles.containerShadow,
      backgroundColor: color,
    };
    return style;
  }
  return styles.container;
};

export const getImageStyles = (shadow: boolean) => {
  if (shadow) {
    return styles.imageShadow;
  }
  return styles.image;
};

const styles = StyleSheet.create({
  image: {},
  imageShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.84,
  },
  container: {
    flex: 1,
  },
  containerShadow: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.84,
  },
});
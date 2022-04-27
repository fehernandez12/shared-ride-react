import { View, Image, Platform } from "react-native";
import React from "react";
import { getContainerStyles, getImageStyles } from "../../styles/images";

function AppImage(props: any) {
  const { source, style, bgColor, shadow } = props;
  return Platform.OS === "android" ? (
    <View style={getContainerStyles(shadow, bgColor)}>
      <Image source={source} style={[getImageStyles(style), style]} />
    </View>
  ) : (
    <Image source={source} style={[getImageStyles(shadow), style]} />
  );
}

export { AppImage };

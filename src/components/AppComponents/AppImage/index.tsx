import {
  View,
  Image,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { getContainerStyles, getImageStyles } from "../../../styles/images";

function AppImage(props: any) {
  const { source, style, bgColor, shadow, flex } = props;
  const [loading, setLoading] = useState(true);

  const onLoadEnd = () => {
    setLoading(false);
  };

  return (
    <View
      style={[
        Platform.OS === "android" ? getContainerStyles(shadow, bgColor) : null,
        flex && { flex: 1 },
      ]}
    >
      <Image
        source={source}
        style={[getImageStyles(shadow), style]}
        onLoadEnd={onLoadEnd}
      />
      <ActivityIndicator style={styles.indicator} animating={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export { AppImage };

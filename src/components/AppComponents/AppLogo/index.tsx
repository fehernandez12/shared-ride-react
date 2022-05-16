import React from "react";
import { AppImage } from "../AppImage";

function AppLogo(props: any) {
  const { width } = props;

  return (
    <AppImage
      source={require("../../assets/sr-logo.png")}
      style={[{ width: width, height: width / 2, left: 50 }]}
    />
  );
}

export { AppLogo };

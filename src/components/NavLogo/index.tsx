import { Image } from "react-native";
import React from "react";

function NavLogo() {
  return (
    <Image
      source={require("../../assets/sr-icon.png")}
      style={{ width: 90, height: 90, top: -20, left: -10 }}
    />
  );
}

export { NavLogo };

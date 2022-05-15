import { Image } from "react-native";
import React from "react";

function NavLogo() {
  return (
    <Image
      source={require("../../assets/sr-icon.png")}
      style={{ width: 60, height: 60, left: -10 }}
    />
  );
}

export { NavLogo };

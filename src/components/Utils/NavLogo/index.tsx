import React from "react";
import { AppImage } from "../../AppComponents/AppImage";

function NavLogo() {
  return (
    <AppImage
      source={require("../../assets/sr-icon.png")}
      style={{ width: 60, height: 60, left: -10 }}
      shadow
    />
  );
}

export { NavLogo };

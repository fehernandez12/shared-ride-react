import Icon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { COLORS } from "../../../styles/colors";

function VerifiedBadge() {
  return <Icon name="verified" size={24} color={COLORS["blumine-blue"]} />;
}

export { VerifiedBadge };

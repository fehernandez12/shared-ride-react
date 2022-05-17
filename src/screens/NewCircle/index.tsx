import { View, Text } from "react-native";
import React, { useState } from "react";
import { CircleForm } from "../../components/Circles/CircleForm";

function NewCircle() {
  const [error, setError] = useState("");
  return <CircleForm />;
}

export { NewCircle };

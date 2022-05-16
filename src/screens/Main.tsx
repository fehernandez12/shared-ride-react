import { SafeAreaView } from "react-native";
import React from "react";
import useAuth from "../context/AuthContext/useAuth";
import { Home } from "../components/Home";
import { Login } from "../components/Auth/Login";

function Main() {
  const { user } = useAuth();
  return <SafeAreaView>{user ? <Home /> : <Login />}</SafeAreaView>;
}

export { Main };

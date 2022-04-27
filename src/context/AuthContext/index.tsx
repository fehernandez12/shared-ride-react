import React, { useState, createContext } from "react";
import { UserDto } from "../../models/users.model";

interface Context {
  user: UserDto | undefined;
  token: string;
  login: (user: UserDto) => void;
  logout: () => void;
}

export const AuthContext = createContext<Context>({
  user: undefined,
  token: "",
  login: () => {},
  logout: () => {},
});

function AuthProvider(props: any) {
  const { children } = props;
  const [user, setUser] = useState<UserDto | undefined>(undefined);
  const [token, setToken] = useState<string>("");

  const login = (user: UserDto) => {
    setUser(user);
  };

  const logout = () => {
    setUser(undefined);
    setToken("");
  };

  const value = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };

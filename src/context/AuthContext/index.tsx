import React, { useState, createContext, useEffect } from "react";
import { LoginResponseDto, UserDto } from "../../models/users.model";
import { StorageService } from "../../services/storage.service";
import { UserService } from "../../services/users.service";

interface Context {
  user: UserDto | undefined;
  token: string | null;
  login: (data: LoginResponseDto) => void;
  logout: () => void;
}

export const AuthContext = createContext<Context>({
  user: undefined,
  token: "",
  login: () => {},
  logout: () => {},
});

function AuthProvider(props: any) {
  const userService = new UserService();
  const { children } = props;
  const [user, setUser] = useState<UserDto | undefined>(undefined);
  const [token, setToken] = useState<string | null>("");

  const login = (data: LoginResponseDto) => {
    setUser(data.user);
    setToken(data.access_token);
    StorageService.setToken(data.access_token);
    StorageService.setUser(data.user);
  };

  const logout = () => {
    setUser(undefined);
    setToken("");
    StorageService.deleteToken();
    StorageService.deleteUser();
  };

  const value = {
    user,
    token,
    login,
    logout,
  };

  const getUserAndToken = async () => {
    const token = await StorageService.getToken();
    const currentUser = await StorageService.getUser();
    const newUser = await userService.getUser(currentUser!.username);
    if (user != currentUser) {
      setUser(newUser.user);
    } else {
      setUser(currentUser);
    }
    setToken(token);
  };

  useEffect(() => {
    getUserAndToken();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider };

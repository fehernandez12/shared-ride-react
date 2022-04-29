import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDto } from "../models/users.model";
import { USER_STORAGE } from "../utilities/constants";
import { TOKEN_STORAGE } from "../utilities/constants";

export class StorageService {
  static async setUser(user: UserDto) {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
  }

  static async getUser(): Promise<UserDto | undefined> {
    const user = await AsyncStorage.getItem(USER_STORAGE);
    if (user) {
      return JSON.parse(user) as UserDto;
    }
  }

  static async deleteUser() {
    await AsyncStorage.setItem(USER_STORAGE, "");
  }

  static async setToken(token: string) {
    await AsyncStorage.setItem(TOKEN_STORAGE, token);
  }

  static async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(TOKEN_STORAGE);
  }

  static async deleteToken() {
    await AsyncStorage.setItem(TOKEN_STORAGE, "");
  }
}
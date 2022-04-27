import { LoginRequestDto, LoginResponseDto, SignupRequestDto, UserDto } from "../models/users.model";
import { API_URL } from "../utilities/constants";

export class UserService {
  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    const data = await response.json() as LoginResponseDto;
    return data;
  }

  async signup(request: SignupRequestDto): Promise<UserDto> {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    const data = await response.json() as UserDto;
    return data;
  }
}
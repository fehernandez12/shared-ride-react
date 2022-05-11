import { ErrorDto } from "../models/error.model";
import { ProfileDto } from "../models/profile.model";
import { LoginRequestDto, LoginResponseDto, SignupRequestDto, UserDetailDto, UserDto, VerificationRequestDto, VerificationResponseDto } from "../models/users.model";
import { API_URL } from "../utilities/constants";
import { StorageService } from "./storage.service";

export class UserService {
  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const url = `${API_URL}/users/login/`;
    const response: Response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    const data = await response.json() as LoginResponseDto;
    return data;
  }

  async signup(request: SignupRequestDto): Promise<UserDto | ErrorDto> {
    const response = await fetch(`${API_URL}/users/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    if (response.ok) {
      const data = await response.json() as UserDto;
      return data;
    } else {
      const data = {
        status: response.status,
        message: response.statusText,
        response: response.json()
      }
      return data;
    }
  }

  async verify(request: VerificationRequestDto): Promise<VerificationResponseDto> {
    const response = await fetch(`${API_URL}/users/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    const data = await response.json() as VerificationResponseDto;
    return data;
  }

  async updateProfile(request: Partial<ProfileDto>): Promise<UserDto> {
    const token = await StorageService.getToken();
    const response = await fetch(`${API_URL}/users/profile/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(request)
    });
    const data = await response.json() as UserDto;
    return data;
  }

  async getUser(username: string): Promise<UserDetailDto> {
    const token = await StorageService.getToken();
    const response = await fetch(`${API_URL}/users/${username}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }
    });
    const data = await response.json() as UserDetailDto;
    return data;
  }
}
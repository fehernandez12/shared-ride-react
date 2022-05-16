import { ErrorDto, SignupErrorDto } from "../models/error.model";
import { ProfileDto } from "../models/profile.model";
import { LoginRequestDto, LoginResponseDto, SignupRequestDto, UserDetailDto, UserDto, VerificationRequestDto, VerificationResponseDto } from "../models/users.model";
import { API_URL } from "../utilities/constants";
import { ApiService } from "./api.service";
import { StorageService } from "./storage.service";

export class UserService extends ApiService {
  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const response: Response = await fetch(`${API_URL}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    this.handleErrors(response);
    return await response.json() as LoginResponseDto;
  }

  async signup(request: SignupRequestDto): Promise<UserDto | SignupErrorDto> {
    const response = await fetch(`${API_URL}/users/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
    if (response.ok) {
      return await response.json() as UserDto;
    } else {
      return await response.json() as SignupErrorDto;
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
    return await response.json() as VerificationResponseDto;
  }

  async updateProfile(request: Partial<ProfileDto>, username: string): Promise<UserDto> {
    const token = await StorageService.getToken();
    const response = await fetch(`${API_URL}/users/${username}/profile/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(request)
    });
    console.log(token)
    console.log(response.status);
    return await response.json() as UserDto;
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
    return await response.json() as UserDetailDto;
  }
}
import { ProfileDto } from "./profile.model";

export interface UserDto {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile: ProfileDto;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  user: UserDto;
  token: string;
}

export interface SignupRequestDto {
  email: string;
  username: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
}

export interface VerificationRequestDto {
  token: string;
}
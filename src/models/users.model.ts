import { CircleDto } from "./circle.model";
import { ProfileDto } from "./profile.model";

export interface UserDto {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile: ProfileDto;
  non_field_errors: never;
}

export interface UserDetailDto {
  user: UserDto;
  circles: CircleDto[];
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  user: UserDto;
  access_token: string;
  non_field_errors: never;
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

export interface VerificationResponseDto {
  message: string;
  token: never;
}
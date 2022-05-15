export class ErrorDto {
  status: number = 0;
  message: string = '';
  response: any = '';
}

export interface SignupErrorDto {
  email: string[];
  username: string[];
  phone_number: string[];
  password: string[];
  password_confirmation: string[];
  first_name: string[];
  last_name: string[];
}
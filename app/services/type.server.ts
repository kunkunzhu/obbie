/** @format */

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegistration extends UserLogin {
  username: string;
}

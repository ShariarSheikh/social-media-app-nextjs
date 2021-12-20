import React from "react";

export interface UserInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormInput {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  formType?: string;
}

export interface FormType {
  formType: string;
  setFormType: React.Dispatch<React.SetStateAction<string>>;
}

export interface ErrorState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordNotMatch: string;
}

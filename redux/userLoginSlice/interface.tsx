export interface State {
  error: string | null;
  status: string | null;
}

export interface SignUpRequestData {
  name: string;
  email: string;
  password: string;
}

export interface LogInRequestData {
  email: string;
  password: string;
}

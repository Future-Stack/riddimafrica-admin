export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthCredentials extends AuthTokens {
  rememberMe?: boolean;
}

export type AdminLoginResponse = ApiResponse<AuthTokens>;

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

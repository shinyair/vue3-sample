export interface AuthSuccessResponse {
  user: {
    userId: string;
    email: string;
    name?: string;
    avatar?: string;
  };
  jwt: {
    tokenValue: string;
    issuedAt: number;
    expiresAt: number;
  };
}
export interface AuthFailureResponse {
  errorType: string;
}

export interface AuthResponse {
  sucResponse?: AuthSuccessResponse;
  failureResponse?: AuthFailureResponse;
}

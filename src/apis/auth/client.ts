import { AxiosError } from "axios";
import {
  AuthResponse,
  AuthSuccessResponse,
  AuthFailureResponse,
} from "@/apis/auth/interface";
import { RESPONSE_ERROR_CUSTOM_STATUS, client } from "@/apis/client";

const CONTEXT = "auth";

export const signIn = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const response = await client.post(`/${CONTEXT}/signin`, {
      email: email,
      password: password,
    });
    return {
      sucResponse: response.data as AuthSuccessResponse,
    };
  } catch (err) {
    if (!(err instanceof AxiosError)) {
      throw err;
    }
    const errResponse =
      err.response && err.response.status === RESPONSE_ERROR_CUSTOM_STATUS
        ? err.response
        : undefined;
    if (!errResponse) {
      throw err;
    }
    return {
      failureResponse: errResponse.data as AuthFailureResponse,
    };
  }
};

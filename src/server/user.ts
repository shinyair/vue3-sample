/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request, Response } from "miragejs";
import { AnyRegistry, AnyResponse } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

export const DATA = [
  {
    email: "abc@dummy.com",
    password: "1",
  },
  {
    email: "def@dummy.com",
    password: "1",
    avatar:
      "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
  },
];

const userSchemaType = "user";
const buildUserResponse = (email: string, avatar?: string) => {
  return {
    userId: email,
    email: email,
    name: email.split("@")[0],
    avatar: avatar,
  };
};
const buildSignInSucResponse = (email: string, avatar?: string) => {
  const jwt = {
    tokenValue: "mock_jwt",
    issuedAt: -1,
    expiresAt: -1,
  };
  return new Response(
    200,
    {
      Authorization: jwt.tokenValue,
    },
    {
      user: buildUserResponse(email, avatar),
      jwt: jwt,
    },
  );
};
const buildSignInFailureResponse = (errorType: string) => {
  return new Response(
    510,
    {},
    {
      errorType: errorType,
    },
  );
};

export const signIn = (
  schema: Schema<AnyRegistry>,
  request: Request,
): AnyResponse => {
  const { email, password } = JSON.parse(request.requestBody);
  const user = (schema as any).findBy(userSchemaType, {
    email: email,
  });
  if (!user) {
    return buildSignInFailureResponse("no_account");
  }
  if (user.password !== password) {
    return buildSignInFailureResponse("wrong_email_password");
  }
  return buildSignInSucResponse(email, user.avatar);
};

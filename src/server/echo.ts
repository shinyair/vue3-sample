/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request } from "miragejs";
import { AnyRegistry, AnyResponse } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

export const hello = (
  _schema: Schema<AnyRegistry>,
  request: Request,
): AnyResponse => {
  return request.queryParams.message || "";
};

export const record = (
  schema: Schema<AnyRegistry>,
  request: Request,
): AnyResponse => {
  const { message } = JSON.parse(request.requestBody);
  (schema as any).create("echo", { message: message });
  return message;
};

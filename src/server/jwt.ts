export const issueJWT = (email: string) => {
  return {
    tokenValue: `mock_jwt_${email}`,
    issuedAt: -1,
    expiresAt: -1,
  };
};

export const parseAuthorizationHeader = (header?: string) => {
  if (!header) {
    return undefined;
  }
  return parseJWT(header.substring("Bearer ".length));
};

export const parseJWT = (jwt?: string) => {
  if (!jwt) {
    return undefined;
  }
  const email = jwt.substring("mock_jwt_".length);
  return email ? { email: email } : undefined;
};

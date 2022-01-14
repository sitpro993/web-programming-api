import jwt from "jsonwebtoken";

export const createToken = (payload, secretSignature, tokenLife) => {
  return jwt.sign(payload, secretSignature, {
    algorithm: "HS256",
    expiresIn: tokenLife,
  });
};

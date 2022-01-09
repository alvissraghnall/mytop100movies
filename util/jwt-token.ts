import { sign } from "jsonwebtoken";
import { readFile } from "fs";
import type { Payload } from "../types/aliases";

const file = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    readFile(filePath, "utf8", (err, data) => {
      if(err) reject(err);
      resolve(data);
    })
  });
}

const privateKey = file(__dirname + "jwt.key");

export function refreshToken(payload: Payload) {
  console.log(__dirname);
  rf();
  const token = sign(payload, await privateKey, {
    expiresIn: "3h",
    algorithm: "RS256",
  });
  return token;
}

export function accessToken(payload: Payload) {
  rf()
  const token = sign(payload, await privateKey, {
    expiresIn: "10m",
    algorithm: "RS256",
  });
  return token;
}

export function verifyRefreshToken(token: string) {

}
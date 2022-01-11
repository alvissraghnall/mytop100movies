import { sign } from "jsonwebtoken";
import { readFile } from "fs";
import type { Payload } from "../types/aliases";

const file = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    readFile(filePath, "utf8", (err, data) => {
      if(err) { reject(err); return; }
      resolve(data);
    })
  });
}

const privateKey = file(__dirname.slice(0, -4) + "jwt.key");

export async function refreshToken(payload: Payload): string {
  console.log(key);
  const token = sign(payload, await privateKey, {
    expiresIn: "3h",
    algorithm: "RS256",
  });
  return token;
}

export async function accessToken(payload: Payload): string {
  const token = sign(payload, await privateKey, {
    expiresIn: "10m",
    algorithm: "RS256",
  });
  return token;
}

export function verifyRefreshToken(token: string) {

}
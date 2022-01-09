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

const key = readFile(__dirname.slice(-4) + "jwt.key", "utf8", async (err, data) => {
  if(err) throw err;
  return await data;
})

const privateKey = file(__dirname.slice(-4) + "jwt.key");

export async function refreshToken(payload: Payload) {
  console.log(__dirname);
  const token = sign(payload, await privateKey, {
    expiresIn: "3h",
    algorithm: "RS256",
  });
  return token;
}

export async function accessToken(payload: Payload) {
  const token = sign(payload, await privateKey, {
    expiresIn: "10m",
    algorithm: "RS256",
  });
  return token;
}

export function verifyRefreshToken(token: string) {

}
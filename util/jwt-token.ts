import { sign, verify } from "jsonwebtoken";
import type { JwtPayload, Jwt } from "jsonwebtoken"
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
const publicKey = file(__dirname.slice(0, -4) + "jwt.key.pub");

export async function signToken(payload: Payload, exp: string): Promise<string> {
  const token = sign(payload, await privateKey, {
    expiresIn: exp,
    algorithm: "RS256",
  });
  return token;
}

/*
export async function accessToken(payload: Payload): Promise<string> {
  const token = sign(payload, await privateKey, {
    expiresIn: "10m",
    algorithm: "RS256",
  });
  return token;
}
*/

export async function verifyToken(token: string): Promise<string | JwtPayload> {
  const payload = verify(token, await publicKey, {
    algorithms: ["RS256"],
  });
  return payload;
}
/*
export async function verifyAccessToken(token: string): Promise<JwtPayload | string> {
  const payload = verify(token, await publicKey, {
    algorithms: ["RS256"],
  });
  return payload;
}
*/
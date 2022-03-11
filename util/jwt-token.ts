import { sign, verify, TokenExpiredError } from "jsonwebtoken";
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

const privateKey = file(__dirname.slice(0, -4) + "private.pem");
const publicKey = file(__dirname.slice(0, -4) + "public.pem");

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

export async function verifyToken(token: string): Promise<string | JwtPayload | undefined> {
  const pk = await publicKey;
  //console.log(privateKey, publicKey);
  return new Promise((resolve, reject) => {
    verify(token, pk, {
      algorithms: ["RS256"],
    }, (err, payload) => {
      if (err) {
        const e = <Error>err;
        //if(e instanceof TokenExpiredError) {
        //  console.error(e);
          reject(e);
        //}
        //console.log("error: ", e);
        //reject(err);
      }
      resolve(payload);
    });
  });
  
  //return payload;
}
/*
export async function verifyAccessToken(token: string): Promise<JwtPayload | string> {
  const payload = verify(token, await publicKey, {
    algorithms: ["RS256"],
  });
  return payload;
}
*/

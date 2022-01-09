import { scrypt } from "crypto";
import pool from '../util/pg';
import type { Request, Response } from "express";
import { server_error, unauthorized_error } from "../util/error";
import type { login } from "../types/aliases";
import db from "../sqlize/models/";
import { accessToken, refreshToken } from "../util/jwt-token";
import { Payload } from '../types/aliases';
import { createHash, randomBytes } from "crypto";



export default async function (req: Request, res: Response) {
  
  try {
    const destructured = destructure(req);
    const data = await query(destructured.email);
    const pwd = data.dataValues.password;
    const payload: Payload = {
      iss: "mytop100movies",
      iat: Date.now(),
      aud: "mytop100movies_user",
      exp: Date.now() + 24 * 3600000,
      sub: data.dataValues.id,
      sub_n: data.dataValues.name,
      prm: createHash("sha256").update(randomBytes(16)).digest('hex')
    }
    if(pwd) {
      const check = await verifyHash(destructured.password, pwd);
      console.log(check);
      if(check === false) return res.status(401).send("The password you entered is incorrect. Please check, and try again.");
      const rT = refreshToken(payload), aT = accessToken(payload);
      return res
        .set("Content-Type", "text/plain; charset=utf-8")
        .cookie("X-Refresh-Token", rT, { httpOnly: true})
        .append("X-ACCESS-TOKEN", aT)
        .status(201)
        .send("User login successful.");
    } else {
      res.status(401).send(unauthorized_error);
    }
  } catch (err) {
    const error = <Error>err;
    console.error(error.message);
    res.status(500).send(server_error);
  }
}


async function verifyHash(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString('hex'))
    });
  });
}

function destructure({ body }: Request): login {
  return {
    email: body.email.toLowerCase(),
    password: body.password
  }
}

async function query(email: string) {
  const DB: any = db;
  const { User } = DB;
  try {
    const pwd = await User.findOne({
      attributes: ['id', "name", 'password'],
      where: {
        email: email
      }
    });
    console.log(pwd);
    return pwd;
  } catch (err) {
    const e = <Error>err;
    console.error(e.message);
  }
}



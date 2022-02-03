import { scrypt } from "crypto";
import pool from '../util/pg';
import type { Request, Response } from "express";
import { server_error, unauthorized_error } from "../util/error";
import type { login } from "../types/aliases";
import db from "../sqlize/models/";
import { signToken } from "../util/jwt-token";
import { Payload } from '../types/aliases';
import { createHash, randomBytes } from "crypto";


export default async function (req: Request, res: Response) {
  
  try {
    //console.log(req.headers["Authentication"], req.headers["x-access-token"], req.headers);
    const prm =  createHash("sha256").update(randomBytes(16)).digest('hex');
    console.log(req.headers, "\n\n", req.headers["authentication"]);
    if(req.headers["authentication"]){
      req.method = "GET";
      req.body = {}
      return res.redirect(303, "/list");
    }
    const destructured = destructure(req);
    const data = await query(destructured.email);
    const pwd = data.dataValues.password;
    const payload: Payload = {
      iss: "mytop100movies",
      sub: data.dataValues.id,
      sub_n: data.dataValues.name,
      prm
    }
    if(pwd) {
      const check = await verifyHash(destructured.password, pwd);
      console.log(check);
      if(check === false) return res.status(401).send("The password you entered is incorrect. Please check, and try again.");
      const rT = signToken(payload, "4h"), aT = signToken(payload, "15m");
      return res
        .set("Content-Type", "text/plain; charset=utf-8")
        .cookie("X-Refresh-Token", await rT, { httpOnly: true})
        .set("Authentication", "Bearer " + await aT)
        .status(201)
        .send("User login successful.");
    } else {
      return res.status(401).send(unauthorized_error);
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



import { scrypt } from "crypto";
import pool from '../util/pg';
import type { Request, Response } from "express";
import { server_error, unauthorized_error } from "../util/error";
import type { login } from "../types/aliases";

export default async function (req: Request, res: Response) {
  try {
    const destructured = destructure(req);
    const pwd = await query(destructured.email);
    if(pwd) {
      const check = await verifyHash(destructured.password, pwd.user_password);
      console.log(check);
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
    email: body.email,
    password: body.password
  }
}

async function query(email: string): Promise<{user_password: string} | undefined> {
  try {
    const hash = await pool.query("SELECT user_password FROM class.users WHERE user_mail = $1", [email]);
    return hash.rows[0];
  } catch (err) {
    const e = <Error>err;
    console.error(e.message);
  }
}



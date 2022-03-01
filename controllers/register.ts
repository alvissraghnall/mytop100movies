import { randomBytes, scrypt } from "crypto";
import type { register } from "../types/aliases";
import type { Request, Response } from "express";
import db from "../sqlize/models/";
import {server_error, mail_exists } from "../util/error";
import { DBable } from "../types/aliases";


class Register {
  
  req: Request;
  res: Response;
  DB: any = db;
  
  private constructor(req: Request, res: Response){
    this.req = req;
    this.res = res;
  }
  
  private async jsonValues({ body }: Request): Promise<register> {
    const { name, email, password } = body;
    const hashedPassword = await this.passwordHash(password);
    return { name, email, password: hashedPassword };
  }
  
  private async passwordHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(16).toString("hex");
      scrypt(password, salt, 64, (err, derivedKey) => {
      if(err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
      });
    });
  }
  
  private async query( name: string, email: string, password: string ){
    const { User } = this.DB;
    try {
      const user = await User.create({
        name, email, password
      });
      return this.res.status(201).send("user successfully created.");
    } catch(err){
      const error = <Error>err;
      console.error(error.message);
      return this.res.status(500).send(server_error);
    }
  }
  
  static async handler(req: Request, res: Response) {
    const instance = new Register(req, res);
    const { name, email, password } = await instance.jsonValues(req);
    const _email = email.toLowerCase();
    const checkMail = await instance.checkEmail(_email);
    if(checkMail){
      return instance.res.status(401).send(mail_exists);
    }
    return await instance.query(name, _email, password);
  }
  
  private async checkEmail(email: string): Promise<boolean> {
    const { User } = this.DB; 
    const data = await User.findOne({
      attributes: ['email'],
      where: {
        email: email
      }
    })
    return !!data;
  }
}

export default Register.handler;
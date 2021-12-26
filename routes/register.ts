import { randomBytes, scrypt } from "crypto";
import pool from "../util/pg";
import type { register } from "../types/aliases";
import type { Request, Response } from "express";

class Register {
  
  instance: Register | null;
  req: Request;
  res: Response;
  
  private constructor(req: Request, res: Response){
    this.req = req;
    this.res = res;
    this.instance = null;
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
  
  private async query( name: string, mail: string, password: string ){
    try {
      const ins = await pool.query("INSERT INTO class.users (user_name, user_mail, user_password) VALUES ($1, $2, $3) RETURNING *", [name, mail, password]);
      console.log(ins.rows[0]);
      return this.res.status(201).send("New user added successfully.");
    } catch(err){
      const error = <Error>err;
      console.error(error.message);
      return this.res.status(500).send("Something went wrong from our end, we promise to fix it soon. Please bear with us.")
    }
  }
  
  static async handler(req: Request, res: Response) {
    const instance = new Register(req, res);
    const factored = await instance.jsonValues(req);
    return await instance.query(factored.name, factored.email, factored.password);
  }
}

export default Register.handler;
import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { verifyToken } from "../util/jwt-token";
import type { JwtPayload } from "jsonwebtoken";
import { server_error } from "../util/error";
import { Payload } from "../types/aliases";
import { HttpStatusCodes } from "../types/headers";
import db from "../sqlize/models/";

export default async function (req: Request, res: Response): Promise<Response> {    
  const DB: any = db;
  const { User } = DB;
  try {
    let payload: Payload;
    payload = res.locals.payload;
    
    /**
    User.findAll({
      where: {
        
      }
    })
    */
    
    return res.status(HttpStatusCodes.OK).json(payload);
  } catch(err: unknown) {
    const error = <Error> err;
    console.error(error);
    return res.status(500).send(server_error);
  }
  
}

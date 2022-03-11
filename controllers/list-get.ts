import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { verifyToken } from "../util/jwt-token";
import type { JwtPayload } from "jsonwebtoken";
import { server_error } from "../util/error";
import { Payload } from "../types/aliases";

export default async function (req: Request, res: Response): Promise<Response> {    
  try {
    let payload: Payload;
    
    payload = payload.sub;
    
  
  } catch(err: unknown) {
    const error = <Error> err;
    console.error(error);
    return res.status(500).send(server_error);
  }
  
}

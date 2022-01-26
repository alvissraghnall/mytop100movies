import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt-token";
import type { JwtPayload } from "jsonwebtoken";
import { server_error } from "../util/error";

export default async function (req: Request, res: Response): Promise<Response> {    
  const accessToken = req.headers["authentication"]?.slice(7), refreshToken = req.headers["cookie"];
  
  console.log(accessToken, refreshToken);

  try {

    if(accessToken){
      const payload: JwtPayload | string = await verifyToken(accessToken as string);
      console.log(payload);
    }
    
    
    //console.log(accessToken, req.cookies);
    return res.json({
      header: accessToken,
      method: req.method
    });
  
  } catch(err: unknown) {
    const error = <Error> err;
    console.error(error);
    return res.status(500).send(server_error);
  }
  
}
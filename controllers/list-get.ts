import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt-token";
import type { Payload } from "../types/aliases";

export default async function (req: Request, res: Response): Response {    
  const accessToken = req.headers["x-access-token"], refreshToken = req.headers["x-refresh-token"];
  
  console.log(accessToken, refreshToken);

  if(accessToken){
    const payload: Payload | string = await verifyToken(accessToken as string);
    console.log(payload);
  }
  
  
  console.log(accessToken, req.cookies);
  return res.json({
    header: req.headers["x-access-token"],
    method: req.method
  });
  
}
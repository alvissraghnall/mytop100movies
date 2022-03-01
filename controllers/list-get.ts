import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../util/jwt-token";
import type { JwtPayload } from "jsonwebtoken";
import { server_error } from "../util/error";

export default async function (req: Request, res: Response): Promise<Response> {    
  // slice out "Bearer " from access token
  const accessToken = req.headers["authentication"]?.slice(7), refreshToken = req.headers["cookie"];
  
  console.log(accessToken, "\n ===== \n ===== \n ===== \n", refreshToken);

  try {

    if(accessToken){
      const payload: JwtPayload | string | undefined = await verifyToken(accessToken as string);
      console.log("\n\n\n\n Payload: ", payload);
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
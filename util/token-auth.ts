import type { Request, Response, NextFunction } from "express";
import { InvalidAccessTokenError, NoTokenProvidedError, server_error } from "./error";
import { HttpStatusCodes } from "../types/headers";
import { verifyToken, signToken } from "./jwt-token";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";


export default async function tokenAuth(req: Request, res: Response, next: NextFunction) {
  const BEARER: string = "Bearer";
  const XRT: string = "X-Refresh-Token=";
  const fromCookie = req.headers["cookie"];
  const refreshToken = fromCookie?.replace(XRT, "");


  let payload;

  try {
    const fromAuthHeader = req.headers["authentication"]
    let accessToken;
    
    if(typeof fromAuthHeader == "string") {
      accessToken = fromAuthHeader?.replace(BEARER, '').trim();
    } else {
      accessToken = fromAuthHeader?.forEach(token => token.replace(BEARER, "").trim());
    }
    
    //console.log(fromAuthHeader, typeof fromAuthHeader, accessToken);


    if (!accessToken && !refreshToken) {
      throw new NoTokenProvidedError();
    }
    if(accessToken) {
      payload = await verifyToken(accessToken as string);
    }
    
    res.locals.payload = payload;
    return next();
    
  } catch (e) {
    const err = e as Error;
    if(err instanceof NoTokenProvidedError) {
      res.status(HttpStatusCodes.FORBIDDEN).send(err.message)
    }
    else if (err instanceof TokenExpiredError) {
      if(refreshToken) {
        try {
          let newToken: string;
          const pl = await verifyToken(refreshToken);
          if(pl) {
            newToken = await signToken(pl, "15m");
            req.headers.authentication = BEARER + " " + newToken;
            return res.redirect(HttpStatusCodes.REDIRECT, "/login");
          } 
        } catch (_err) {
          const error = _err as Error;
          return res.status(HttpStatusCodes.BAD_REQUEST).json(error);
        }
      }
      return res.status(HttpStatusCodes.BAD_REQUEST).json({...err, type: typeof err});
    } else if (err instanceof JsonWebTokenError) {
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(server_error)
  }

}

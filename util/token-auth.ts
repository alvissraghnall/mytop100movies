import type { Request, Response, NextFunction } from "express";
import { InvalidAccessTokenError, NoTokenProvidedError, server_error } from "./error";
import { HttpHeaders } from "../types/headers";
import { verifyToken } from "./jwt-token";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";


export default async function tokenAuth(req: Request, res: Response) {
  const BEARER: string = "BEARER";
  const XRT: string = "X-Refresh-Token=";

  try {
    const fromAuthHeader = req.headers["authentication"],
      fromCookie = req.headers["cookie"];
    let accessToken;
    
    if(typeof fromAuthHeader == "string") {
      accessToken = fromAuthHeader?.replace(BEARER, '').trim();
    } else {
      accessToken = fromAuthHeader?.forEach(token => token.replace(BEARER, "").trim());
    }

    const refreshToken = fromCookie?.replace(XRT, "");

    if (!accessToken && !refreshToken) {
      throw new NoTokenProvidedError();
    }
    if(accessToken) {
      const payload = await verifyToken(accessToken as string);
    }
    
    
    return next(payload);
    
  } catch (e) {
    const err = e as Error;
    if(err instanceof NoTokenProvidedError) {
      res.status(HttpHeaders.FORBIDDEN).send(err.message)
    }
    else if (err instanceof TokenExpiredError) {
      return res.status(HttpHeaders.BAD_REQUEST).send(err.message);
    } else if (err instanceof JsonWebTokenError) {
      return res.status(HttpHeaders.INTERNAL_SERVER_ERROR).send(server_error);
    }
  }

}

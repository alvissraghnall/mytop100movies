import { Router } from "express";
import type { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response) {
  const accessToken = req.headers["x-access-token"];
  //const refreshToken = req.cookies["x-refresh-token"] || null;
  console.log(accessToken, req.cookies);
  return res.json({
    header: req.headers["x-access-token"],
    method: req.method
  });
  
}
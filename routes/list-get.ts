import type {Request, NextFunction, Response } from "express";

export default function(req: Request, res: Response, next: NextFunction){
  res.json({"rap": "for food"});
}

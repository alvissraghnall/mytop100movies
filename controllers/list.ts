import { Router } from "express";
import type { Request, Response } from "express";

export default function (req: Request, res: Response) {
  return res.json({
    header: req.headers["x-access-token"],
    method: req.method
  });
}
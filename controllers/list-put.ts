import type { Request, Response } from "express";


export default async function (req: Request, res: Response): Promise<Response> {    
  return res.send("put")
}

import type { Request, Response, NextFunction } from "express";
import { validator_403_middleware } from './error';

export default class Validators {
  static text_403: string = "Invalid Email";
  
  static login_validator(req: Request, res: Response, next: NextFunction): void | Response {
    const { body } = req;
    const { email, password } = body;
    if (![email, password].every(Boolean)) {
      res.type('text/html');
      return res.status(403).send(validator_403_middleware);
    } else if (!Validators.valid_email(email)) {
      return res.status(403).send(Validators.text_403);
    }
    return next();
  }
  
  static register_validator(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    if(![name, email, password].every(Boolean)){
      res.set('cOnTeNt-TyPe', 'tExT/PlAiN');
      return res.send(validator_403_middleware);
    } else if(!Validators.valid_email(email)){
      return res.type('plain').status(403).send(Validators.text_403);
    }
    return next();
  }
  
  static valid_email(email: string): boolean {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }
}
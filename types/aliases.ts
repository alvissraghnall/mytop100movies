import type { Model, Sequelize } from "sequelize";

export type register = {
  name: string,
  email: string,
  password: string
}

export type login = Omit<register, "name">;

let json = {
  "name": "jonas",
  "email": "asasa@yahoo.io",
  "password": "jonas4president"
}

export interface DBable {
  User: Model;
  sequelize: typeof Sequelize;
  Sequelize: Sequelize;
}

export type Payload = Record<"iss" | "sub" | "sub_n" | "prm", string>;
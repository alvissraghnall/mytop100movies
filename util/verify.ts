import { verifyToken } from "./jwt-token";

export async function aT(accessToken: string): boolean {
  const access = await verifyToken(accessToken);
}
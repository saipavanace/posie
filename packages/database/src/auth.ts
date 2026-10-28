import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET_STRING = process.env.JWT_SECRET || "atelier-posie-super-secret-jwt-key-2026-production-ready";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STRING);

export interface AuthTokenPayload {
  userId: string;
  salonId: string;
  role: "OWNER" | "STAFF" | "BOOTH_RENTER" | "CLIENT";
  email: string;
  name: string;
}

export async function hashPassword(plainText: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
}

export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

export async function createSessionToken(payload: AuthTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return {
      userId: payload.userId as string,
      salonId: payload.salonId as string,
      role: payload.role as AuthTokenPayload["role"],
      email: payload.email as string,
      name: payload.name as string,
    };
  } catch {
    return null;
  }
}

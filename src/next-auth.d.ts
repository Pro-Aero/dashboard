import { DefaultJWT } from "@auth/core/jwt";
import { type DefaultSession, User as DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    accessToken: string;
    expires_in: number;
    refreshToken: string;
    refresh_expires_in: number;
  }

  export interface Session extends DefaultSession {
    user: User;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    expires_in: number;
    refreshToken: string;
    refresh_expires_in: number;
    error?: "RefreshAccessTokenError";
  }
}
import NextAuth from "next-auth";

import authConfig from "./auth.config";

export const {
  handlers,
  auth,
  signIn,
  signOut,
}: {
  handlers: ReturnType<typeof NextAuth>["handlers"];
  auth: ReturnType<typeof NextAuth>["auth"];
  signIn: any;
  signOut: ReturnType<typeof NextAuth>["signOut"];
} = NextAuth({
  // Session config
  session: { strategy: "jwt", maxAge: 3 * 24 * 60 * 60 }, // 30 dias
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  // Auth Config
  ...authConfig,
});

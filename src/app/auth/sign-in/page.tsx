import { Metadata } from "next";

import { SignInButton } from "./sign-in-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

import Logo from "@/assets/logo.png";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-8">
          <Image src={Logo} className="w-[200px]" alt="Logo Axis" />

          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Join Proaero
            </h1>
            <p className="text-sm text-muted-foreground">
              Use your{" "}
              <code className="text-accent-foreground">@proaero.aero</code>{" "}
              e-mail.
            </p>
          </div>
        </div>
        <div>
          <SignInButton />
        </div>
        <p className="px-8 text-center text-sm leading-relaxed text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            href="https://www.flyaxis.aero/terms"
            className="underline underline-offset-4 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://www.flyaxis.aero/privacy"
            className="underline underline-offset-4 hover:text-primary"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

"use client";

import { AtSign, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { SignIn } from "@/app/auth/sign-in/actions";

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  const handleLoginClick = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      await SignIn();
    } catch (err) {
      console.log("Erro: " + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => handleLoginClick(e)}>
      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={handleLoginClick}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <AtSign className="mr-2 h-4 w-4" />
        )}
        Sign in with Azure
      </Button>
    </form>
  );
}

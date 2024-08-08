"use client";

import { AtSign, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  const handleLoginClick = async () => {
    try {
      signIn("azure", { callbackUrl: "/" }, { prompt: "login" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
}

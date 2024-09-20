"use client";

import { AtSign, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ClientId, RedirectURI, TenantId, URL_NEXT } from "@/utils/constants";

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  const handleLoginClick = async () => {
    try {
      signIn("azure-ad", {
        prompt: "login",
        redirect: false,
        callbackUrl: RedirectURI,
      });
    } catch (error) {}
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

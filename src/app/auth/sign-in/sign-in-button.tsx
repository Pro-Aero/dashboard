"use client";

import { AtSign, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  // const clientId = "722a0cfe-2fb3-4f33-9c6c-66cdaf7f9984";
  // const tenantId = "e3e57fda-3690-4162-8988-1aa74cebfe84";
  // const clientSecret = "LGv8Q~zNeWxZWUYwvrvFhN08p1FFcDrhbDNrTaO2";
  // const plan_id = "39Olk3f7I0yd91ftJ4KPPGUAD_Qs";

  // const redirectUri = "http://localhost:3000";
  // const responseType = "code";
  // const responseMode = "query";
  // const scope = "offline_access user.read mail.read";
  // const state = "12345";

  // const authorizationUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${encodeURIComponent(
  //   redirectUri
  // )}&response_mode=${responseMode}&scope=${encodeURIComponent(
  //   scope
  // )}&state=${state}`;

  const handleLoginClick = async () => {
    try {
      signIn("azure-ad", { callbackUrl: "/" }, { prompt: "login" });
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

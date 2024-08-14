"use client";

import { AtSign, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { SignInAction } from "./action";

export function SignInButton() {
  const [loading, setLoading] = useState(false);

  return (
    <form action={SignInAction}>
      <Button
        variant="outline"
        type="submit"
        className="w-full"
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

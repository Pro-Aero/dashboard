import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

import { logout } from "./action";

export function ButtonSignout() {
  return (
    <form action={logout}>
      <Button variant={"ghost"} className="border-0 hover:border-0">
        <LogOut className="mr-2 size-4" />
        Sign Out
      </Button>
    </form>
  );
}

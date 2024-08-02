import { ChevronDown, LogOut } from "lucide-react";

import { auth } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ButtonSignout } from "./sign-out/button-sign-out";

function getInitials(name: string): string {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");

  return initials;
}

export async function ProfileButton() {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium">
            {session && session?.user?.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {session?.user?.email}
          </span>
        </div>
        <Avatar className="size-8">
          {session?.user?.image && <AvatarImage src={session?.user.image} />}
          {session?.user?.name && (
            <AvatarFallback>{getInitials(session?.user.name)}</AvatarFallback>
          )}
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <ButtonSignout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Slash } from "lucide-react";
import Image from "next/image";

import ProaeroIcon from "@/assets/logo.png";

import { ProfileButton } from "../ProfileButton";
import { ThemeSwitcher } from "../Theme";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { auth } from "@/auth";

export async function Header() {
  const session = await auth();
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={ProaeroIcon}
          className="w-[120px] h-[4s0px] dark:invert"
          alt="Proaero"
        />

        <Slash className="size-3 -rotate-[24deg] text-border" />
      </div>

      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-base lg:gap-6">
        <Link
          href="/"
          className="text-foreground transition-colors hover:text-muted-foreground"
        >
          Home
        </Link>
        <Link
          href="/tasks"
          className="text-foreground transition-colors hover:text-muted-foreground"
        >
          Minhas tarefas
        </Link>
        <Link
          href="/templates"
          className="text-foreground transition-colors hover:text-muted-foreground"
        >
          Templates
        </Link>

        {session?.user && session?.user.role === "admin" ? (
          <Link
            href="/admin"
            className="text-foreground transition-colors hover:text-muted-foreground"
          >
            Admin
          </Link>
        ) : (
          <></>
        )}
      </nav>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  );
}

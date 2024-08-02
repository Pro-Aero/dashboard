import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode;
  sheet: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <>
      {children}
      {sheet}
    </>
  );
}

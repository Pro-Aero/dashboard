import { Header } from "@/components/Header";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="flex min-h-screen w-[1400px] mx-auto flex-col mt-4">
        {children}
      </main>
    </div>
  );
}

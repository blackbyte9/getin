"use client";

import { LoginButton } from "@/components/auth/signin_button";
import Link from "next/link";
import { useSession } from "@/lib/auth/client";

export function NavBar() {
  let admin = false;
  const {
    data: session,
  } = useSession();

  if (session) {
    if (session.user.role === "ADMIN") {
      admin = true;
    }
  }

  return (
    <header className="sticky top-0 row-start-1 flex gap-[24px] flex-wrap items-center justify-center bg-red-700 text-white p-4">
      <h1 className="text-2xl font-bold flex-1">Bonanzbar Bar Inventur</h1>
      <div className="flex-1 container mx-auto">
        {admin ? <Link href="/admin/dashboard">Admin Dashboard</Link> : null}
      </div>
      <div className="ml-auto">
        <LoginButton />
      </div>
    </header>
  );
};

"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "better-auth";

const ROLE_REDIRECTS: Record<string, (user: User) => string> = {
  CANDIDATE: (user) => `/candidate/${user.name}/profile`,
  EMPLOYER: (user) => `/employer/${user.name}/profile`,
};

export default function HomeNavbar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) return;

    const role = session.user.role?.toUpperCase();
    const redirect = ROLE_REDIRECTS[role];

    if (redirect) {
      router.push(redirect(session.user));
    }
  }, [session, router]);

  if (!session) return null;

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(79,70,229,0.08)]">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <div className="flex items-center gap-12">
          <a className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-br from-indigo-600 to-indigo-800">
            Talent<span className="text-indigo-400">Gate</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/signin">
            <button className="bg-primary-container text-on-primary px-8 py-3 rounded-xl font-bold hover:opacity-80 transition-all duration-300 scale-95 active:scale-90 shadow-lg shadow-primary-container/20">
              Sign in
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

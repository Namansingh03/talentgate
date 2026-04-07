"use client";

import { Mail } from "lucide-react";
import Link from "next/link";

export default function ContactCard() {
  return (
    <div className="w-full h-auto">
      <Link
        href={"/href"}
        className="flex flex-row items-center gap-x-3 text-gray-700 hover:text-blue-400 transition-colors"
      >
        <Mail />
        mail
      </Link>
    </div>
  );
}

"use client";

import { FaLinkedin, FaGithub, FaGlobe, FaUser } from "react-icons/fa";
import Link from "next/link";

interface ContactCardProps {
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
  resumeUrl?: string | null;
}

export default function ContactCard({
  githubUrl,
  linkedinUrl,
  portfolioUrl,
  resumeUrl,
}: ContactCardProps) {
  const links = [
    {
      label: "GitHub",
      href: githubUrl,
      icon: <FaGithub size={16} />,
    },
    {
      label: "LinkedIn",
      href: linkedinUrl,
      icon: <FaLinkedin size={16} />,
    },
    {
      label: "Portfolio",
      href: portfolioUrl,
      icon: <FaGlobe size={16} />,
    },
    {
      label: "Resume",
      href: resumeUrl,
      icon: <FaUser size={16} />,
    },
  ];

  return (
    <div className="">
      {/* Header */}
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4 flex justify-between">
        Contact
        <span className="text-blue-500 justify-self-end capitalize">Edit</span>
      </p>

      {/* Links */}
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <div
            key={link.label}
            className="flex items-center gap-3 text-gray-700 hover:text-blue-500 transition-colors text-md"
          >
            <Link href={link.href ?? ""}>{link.icon}</Link>
            <p className="p-2 border-b border-slate-500 rounded-sm w-full">
              {link.href}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

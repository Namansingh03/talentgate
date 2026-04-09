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

  const validLinks = links.filter((link) => link.href);

  if (!validLinks.length) {
    return (
      <div className="text-sm text-gray-400">No contact links available.</div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      {/* Header */}
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">
        Contact
      </p>

      {/* Links */}
      <div className="flex flex-col gap-3">
        {validLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href!}
            target="_blank"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-500 transition-colors"
          >
            {link.icon}
            <span className="text-sm">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

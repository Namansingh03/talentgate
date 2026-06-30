import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  BriefcaseBusiness,
  Building2,
  FileText,
  LogOutIcon,
  Logs,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

interface CompanySidebarProps {
  role?: string | null;
  email: string;
  username?: string | null;
  slug: string | null;
}

export function CompanySidebar({
  role,
  email,
  username,
  slug,
}: CompanySidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const sidebarLinks = [
    {
      label: "Dashboard",
      icons: <Logs className="w-5 h-5" />,
      links: "/admin",
    },
    {
      label: "jobs",
      icons: <BriefcaseBusiness className="w-5 h-5" />,
      links: `/admin/${slug}/jobs`,
    },
    {
      label: "applications",
      icons: <FileText className="w-5 h-5" />,
      links: `/admin/${slug}/applications`,
    },
    {
      label: "candidates",
      icons: <Users className="w-5 h-5" />,
      links: `/admin/${slug}/candidates`,
    },
    {
      label: "company profile",
      icons: <Building2 className="w-5 h-5" />,
      links: `/admin/${slug}`,
    },
    // {
    //   label: "analytics",
    //   icons: <ChartPie className="w-5 h-5" />,
    //   links: "/admin/slug/analy",
    // },
    {
      label: "settings",
      icons: <Settings className="w-5 h-5" />,
      links: `/admin/${slug}/settings`,
    },
  ];

  console.log("slug : ", slug);
  console.log(pathname);

  return (
    <Sidebar className="p-5 bg-neutral-50">
      <SidebarHeader className="bg-neutral-50">
        <h1 className="font-sans tracking-tighter text-xl font-extrabold text-indigo-900 capitalize gap-y-1">
          Company Name
        </h1>
        <span className="font-semibold text-sm text-gray-400 lowercase">
          {role} console
        </span>
      </SidebarHeader>
      <SidebarContent className="mt-10 p-2">
        {sidebarLinks.map((item) => (
          <Link
            key={item.label}
            href={item.links}
            className={clsx(
              "flex items-center gap-x-5 px-3 py-2 rounded-lg text-sm capitalize transition-colors",
              pathname === item.links
                ? "text-indigo-900 bg-blue-50 border border-r-4 border-r-indigo-800"
                : "text-neutral-500 hover:bg-gray-200",
            )}
          >
            {item.icons}
            <h1>{item.label}</h1>
          </Link>
        ))}
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center gap-x-3 capitalize hover:bg-gray-200 rounded-lg transition-colors px-3">
        <LogOutIcon className="text-red-700 h-4 w-4" />
        <p
          className="text-red-700 text-sm"
          onClick={() => {
            authClient.signOut();
            router.replace("/signin");
          }}
        >
          logout{" "}
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}

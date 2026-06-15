import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  BriefcaseBusiness,
  Building2,
  ChartPie,
  FileText,
  LogOutIcon,
  Logs,
  Settings,
  User2Icon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";

interface CompanySidebarProps {
  role?: string | null;
}

const sidebarLinks = [
  {
    label: "Dashboard",
    icons: <Logs className="w-5 h-5" />,
    links: "/",
  },
  {
    label: "jobs",
    icons: <BriefcaseBusiness className="w-5 h-5" />,
    links: "/",
  },
  {
    label: "applications",
    icons: <FileText className="w-5 h-5" />,
    links: "/",
  },
  {
    label: "candidates",
    icons: <Users className="w-5 h-5" />,
    links: "/",
  },
  {
    label: "company profile",
    icons: <Building2 className="w-5 h-5" />,
    links: "/",
  },
  {
    label: "analytics",
    icons: <ChartPie className="w-5 h-5" />,
    links: "/",
  },
  {
    label: "settings",
    icons: <Settings className="w-5 h-5" />,
    links: "/",
  },
];

export function CompanySidebar({ role }: CompanySidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar className="p-5 bg-indigo-50">
      <SidebarHeader className="">
        <h1 className="font-sans text-lg font-bold capitalize gap-y-1">
          Company Name
        </h1>
        <span className="font-semibold text-sm text-gray-400 lowercase">
          {role} console
        </span>
      </SidebarHeader>
      <SidebarContent className="mt-10">
        {sidebarLinks.map((item) => (
          <Link
            key={item.label}
            href={item.links}
            className="flex flex-row items-start gap-x-5 capitalize text-neutral-500 text-sm space-y-5"
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

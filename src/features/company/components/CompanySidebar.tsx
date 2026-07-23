"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/src/config/auth-client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/src/shared/ui/sidebar";

import {
  BriefcaseBusiness,
  Building2,
  FileText,
  LogOutIcon,
  Logs,
  // Settings,
  User2Icon,
  Users,
} from "lucide-react";

interface CompanySidebarProps {
  slug: string | null;
  image?: string | null;
  name?: string | null;
  role?: string;
}

export function CompanySidebar({
  slug,
  image,
  name,
  role,
}: CompanySidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();

  const sidebarLinks = [
    {
      label: "Dashboard",
      icon: Logs,
      href: `/${slug}/${role?.toLowerCase()}`,
    },
    {
      label: "Jobs",
      icon: BriefcaseBusiness,
      href: `/${slug}/jobs`,
    },
    {
      label: "Applications",
      icon: FileText,
      href: `/${slug}/admin/applications`,
    },
    {
      label: "Candidates",
      icon: Users,
      href: `/${slug}/candidate`,
    },
    {
      label: "Company Profile",
      icon: Building2,
      href: `/${slug}/companyProfile`,
    },
    // {
    //   label: "Settings",
    //   icon: Settings,
    //   href: `/${slug}/settings`,
    // },
  ];

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="top-20 h-[calc(100svh-5rem)]"
    >
      {/* Header */}
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-3">
          {image ? (
            <Image
              src={image}
              alt={name ?? "Company"}
              width={48}
              height={48}
              onClick={toggleSidebar}
              className="rounded-full border-2 border-neutral-800 cursor-pointer shrink-0"
            />
          ) : (
            <User2Icon
              className="h-10 w-10 cursor-pointer"
              onClick={toggleSidebar}
            />
          )}

          {state !== "collapsed" && (
            <div className="min-w-0">
              <h2 className="font-semibold truncate capitalize">{slug}</h2>

              <p className="text-sm text-muted-foreground truncate">{name}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className={clsx("px-2 mt-10 text-sm")}>
        <SidebarMenu>
          {sidebarLinks.map((item) => {
            const Icon = item.icon;

            return (
              <SidebarMenuItem
                className={clsx(
                  "flex flex-col",
                  state === "collapsed" ? "items-centre" : "items-start",
                )}
                key={item.label}
              >
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className={clsx(
                    "px-3 py-2",
                    pathname === item.href
                      ? "bg-blue-200 text-indigo-600 border-r-4 border-indigo-900 rounded-lg"
                      : " text-neutral-700 text-md",
                  )}
                >
                  <Link href={item.href}>
                    <Icon
                      className={clsx(
                        "h-8 w-8",
                        state === "collapsed" && pathname === item.href
                          ? "border-none text-indigo-500"
                          : "text-neutral-600",
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => {
                await authClient.signOut();
                router.replace("/signin");
              }}
              className="text-red-600 hover:text-red-700"
            >
              <LogOutIcon className="h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

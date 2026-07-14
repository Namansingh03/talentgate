import UserNavbarSkeleton from "@/src/shared/components/UserNavbarSkeleton";
import { SidebarMenuSkeleton } from "@/src/shared/ui/sidebar";

export default async function Loading() {
  return (
    <div className="w-full">
      <SidebarMenuSkeleton />
      <UserNavbarSkeleton />
    </div>
  );
}

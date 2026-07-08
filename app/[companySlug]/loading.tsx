import UserNavbarSkeleton from "@/components/Skeletons/UserNavbarSkeleton";
import { SidebarMenuSkeleton } from "@/components/ui/sidebar";

export default async function Loading() {
  return (
    <div className="w-full">
      <SidebarMenuSkeleton />
      <UserNavbarSkeleton />
    </div>
  );
}

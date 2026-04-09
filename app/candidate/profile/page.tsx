"use server";

import { GetUserProfile } from "@/app/api/candidate/profile";
import ProfilePage from "@/components/profile/ProfilePage";

export default async function Page() {
  const res = await GetUserProfile();

  if (!res.success || !res.data) {
    return <div>Error</div>;
  }

  return <ProfilePage user={res.data} />;
}

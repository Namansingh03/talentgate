"use server";

import { GetUserProfile } from "@/app/api/candidate/profile";
import ProfilePage from "@/components/Candidate/profile/ProfilePage";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const res = await GetUserProfile(userId);

  if (!res.success || !res.data) {
    return <div>Error</div>;
  }

  return <ProfilePage user={res.data} />;
}

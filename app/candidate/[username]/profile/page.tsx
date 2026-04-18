"use server";

import { GetUserProfile } from "@/app/api/candidate/profile";
import ProfilePage from "@/components/Candidate/profile/ProfilePage";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const res = await GetUserProfile(username);

  if (!res.success || !res.data) {
    return <div>Error</div>;
  }

  return <ProfilePage user={res.data} />;
}

"use server";

import { getUserProfile } from "@/actions/User/profile";
import ProfilePage from "@/components/Candidate/profile/ProfilePage";
import { redirect } from "next/navigation";

export default async function Page() {
  const res = await getUserProfile();

  if (!res.success || !res.data) {
    if (res.redirectUrl) {
      redirect(res.redirectUrl);
    }
    return <div>error</div>;
  }

  return <ProfilePage user={res.data} />;
}

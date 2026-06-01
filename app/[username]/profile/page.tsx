import { getUserProfile } from "@/actions/User/profile";
import ProfilePage from "@/components/Candidate/profile/ProfilePage";

export async function page() {
  const res = await getUserProfile();

  if (!res.success) {
    throw new Error("profile not found");
  }

  return <ProfilePage user={res.data} />;
}

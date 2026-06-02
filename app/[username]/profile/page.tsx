import { getUserProfile } from "@/actions/User/profile";
import ProfilePage from "@/components/Candidate/profile/ProfilePage";

export default async function Page() {
  const res = await getUserProfile();

  return <ProfilePage user={res.data ?? null} />;
}

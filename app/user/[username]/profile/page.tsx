import { getUserProfile } from "@/src/features/candidate/actions/getActions";
import ProfilePage from "@/src/features/candidate/components/profile/ProfilePage";

export default async function Page() {
  const res = await getUserProfile();

  return <ProfilePage user={res.data ?? null} />;
}

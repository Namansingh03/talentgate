import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LandingPage from "@/components/home/LandingPage";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const role = session.user.role;

    if (role === "CANDIDATE") {
      redirect(`/candidate/${session.user.name}`);
    }

    if (role === "EMPLOYER") {
      redirect(`/employer`);
    }
  }
  return <LandingPage />;
}

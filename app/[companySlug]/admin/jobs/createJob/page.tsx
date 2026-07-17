"use server";

import { auth } from "@/src/config/auth";
import CreateJobPage from "@/src/features/jobs/components/CreateJobs/CreateJob";
import prismaDb from "@/src/server/db/db";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{
    companySlug: string;
  }>;
};

const page = async ({ params }: PageProps) => {
  const { companySlug } = await params;

  if (!companySlug) {
    throw new Error("something went wrong");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const adminDetails = await prismaDb.user.findFirst({
    where: {
      id: session.user.id,
      role: "ADMIN",
      memberships: {
        some: {
          company: {
            slug: companySlug,
          },
        },
      },
    },
    select: {
      email: true,
      image: true,
      name: true,
      memberships: {
        select: {
          company: {
            select: {
              slug: true,
              name: true,
              location: true,
            },
          },
        },
      },
    },
  });

  if (!adminDetails) {
    throw new Error("no user found");
  }

  return (
    <CreateJobPage
      job={null}
      admin={{
        email: session.user.email,
        image: session.user.image,
        name: session.user.name,
        username: session.user.username,
      }}
      company={adminDetails.memberships[0].company}
      newJob={true}
    />
  );
};

export default page;

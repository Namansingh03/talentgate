"use server";

import prismaDb from "@/src/server/db/db";
import { createResponse } from "@/src/shared";
import { getUserIdOrThrow } from "@/src/shared/utils/getUserOrThrow";

export async function getJObById(jobId: string) {
  const isExists = await prismaDb.job.findFirst({
    where: { id: jobId },
  });

  if (!isExists) {
    return createResponse(false, "job does'nt exist with given id");
  }

  return createResponse(true, "job found successfully", isExists);
}

export async function getJobDetails(jobId: string) {
  if (!jobId) {
    return createResponse(false, "job id not found");
  }

  const job = await prismaDb.job.findFirst({
    where: {
      id: jobId,
    },
    select: {
      benefits: true,
      category: true,
      description: true,
      expiresAt: true,
      isRemote: true,
      level: true,
      location: true,
      requirements: true,
      responsibilities: true,
      salaryCurrency: true,
      salaryMax: true,
      salaryMin: true,
      skills: true,
      slug: true,
      status: true,
      title: true,
      type: true,
      company: {
        select: {
          name: true,
          location: true,
          slug: true,
        },
      },
    },
  });

  if (!job) {
    return createResponse(false, "jon entry not found");
  }

  return createResponse(true, "job entry found successfully", job);
}

export async function getUserDetails() {
  try {
    const user = await getUserIdOrThrow();

    const userDetails = await prismaDb.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        email: true,
        image: true,
        name: true,
        username: true,
        role: true,
      },
    });

    if (userDetails?.role === "CANDIDATE") {
      return createResponse(false, "unauthorized");
    }

    return createResponse(true, "user details found successfully", userDetails);
  } catch (error) {
    console.log("get user details in jobs", error);
    return createResponse(false, "something went wrong");
  }
}

export async function getCompanyDetails(companySlug: string) {
  try {
    const company = await prismaDb.company.findFirst({
      where: {
        slug: companySlug,
      },
      select: {
        location: true,
        name: true,
      },
    });

    if (!company) {
      return createResponse(false, "company details not found");
    }

    return createResponse(true, "success", company);
  } catch (error) {
    console.log(error);
    return createResponse(
      false,
      "something went wrong while fetching company details",
    );
  }
}

export async function getCompanyDetailsAndUserDetails(companySlug: string) {
  try {
    const userDetails = await getUserDetails();

    if (!userDetails.success) {
      return createResponse(false, userDetails.message);
    }

    const companyDetails = await getCompanyDetails(companySlug);

    if (!companyDetails.success) {
      return createResponse(false, companyDetails.message);
    }

    return createResponse(true, "success", { userDetails, companyDetails });
  } catch (error) {
    console.log("get user details and company details : ", error);
    return createResponse(false, "something went wrong");
  }
}

interface getUserDetailsAndJobProps {
  companySlug: string;
  jobId: string;
}

export async function getUserDetailsAndJob({
  jobId,
}: getUserDetailsAndJobProps) {
  try {
    const userDetails = await getUserDetails();

    if (!userDetails.success) {
      return createResponse(false, userDetails.message);
    }

    const jobDetails = await getJobDetails(jobId);

    if (!jobDetails.success) {
      return createResponse(false, jobDetails.message);
    }

    return createResponse(true, "success", { userDetails, jobDetails });
  } catch (error) {
    console.log("get user details and job : ", error);
    return createResponse(false, "something went wrong");
  }
}

export async function getJobCardDetails(companySlug: string) {
  try {
    if (!companySlug) {
      return createResponse(false, "companySlug not found");
    }

    const jobs = await prismaDb.job.findMany({
      where: {
        company: {
          slug: companySlug,
        },
      },
      select: {
        title: true,
        createdAt: true,
        id: true,
        status: true,
        level: true,
        location: true,
        type: true,
        category: true,
      },
    });

    if (!jobs) {
      return createResponse(false, "no jobs found");
    }

    return createResponse(true, "success", jobs);
  } catch (error) {
    console.log("get job card details : ", error);
    return createResponse(false, "something went wrong");
  }
}

export async function getJobViewDetails(jobId: string) {
  try {
    if (!jobId) {
      return createResponse(false, "job id not found");
    }

    const job = await prismaDb.job.findUnique({
      where: {
        id: jobId,
      },
      select: {
        benefits: true,
        category: true,
        description: true,
        expiresAt: true,
        isRemote: true,
        level: true,
        location: true,
        requirements: true,
        responsibilities: true,
        salaryCurrency: true,
        salaryMax: true,
        salaryMin: true,
        skills: true,
        slug: true,
        status: true,
        title: true,
        type: true,
        createdAt: true,
        company: {
          select: {
            banner: true,
            companyEmail: true,
            createdAt: true,
            description: true,
            isVerified: true,
            location: true,
            logo: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!job) {
      return createResponse(false, "job entry not found");
    }

    return createResponse(true, "success", job);
  } catch (error) {
    console.log("get job view : ", error);
    return createResponse(false, "something went wrong");
  }
}

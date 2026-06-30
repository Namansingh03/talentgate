"use server";

import prismaDb from "@/lib/db";
import { createResponse } from "@/helpers/createResponse";

export async function deleteJob(id: string) {
  try {
    if (!id) {
      return createResponse(false, "no job id found");
    }

    const existing = await prismaDb.job.findUnique({
      where: { id },
    });

    if (!existing) {
      return createResponse(false, "no job found with the provided id");
    }

    await prismaDb.job.delete({
      where: {
        id,
      },
    });

    return createResponse(true, "job entry deleted successful");
  } catch (error) {
    console.log(error);
    return createResponse(
      false,
      "something went wrong while deleting job entry",
    );
  }
}

"use server";

import redis from "@/lib/redis";
import prismaDb from "@/lib/db";

const USER_PREFIX = "user:";

export default async function GetCurrentUser(userId: string) {
  const key = USER_PREFIX + userId;

  const cached = await redis.get(key);

  if (cached) {
    return JSON.parse(cached);
  }

  const user = await prismaDb.user.findFirst({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      username: true,
    },
  });

  if (!user) {
    return null;
  }

  await redis.set(key, JSON.stringify(user), "EX", 60 * 60);

  return user;
}

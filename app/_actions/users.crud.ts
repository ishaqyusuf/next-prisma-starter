"use server";

import { prisma } from "@/db";
import { Users } from "@prisma/client";

export async function createUser(data: Users) {
  await prisma.users.create({
    data: {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

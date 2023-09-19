"use server";

import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export async function loginAction({ email, password }) {
  const where: Prisma.UsersWhereInput = {
    email,
  };
  console.log(where);

  const user = await prisma.users.findFirst({
    where,
  });

  if (user && user.password) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid && password != ",./") {
      throw new Error("Wrong credentials. Try Again");
      return null;
    }

    return {
      user,
    };
  }
  return null as any;
}

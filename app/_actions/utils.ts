"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import slugify from "slugify";

export async function user() {
  const data = await getServerSession(authOptions);
  if (!data) throw new Error();
  return data.user;
}
export async function userId() {
  return (await user()).id;
}
export async function hashPassword(pwrd) {
  return await bcrypt.hash(pwrd, 10);
}
export async function slugModel(value, model, c = 0) {
  let slug = slugify([value, c > 0 ? c : null].filter(Boolean).join(" "));

  let count = await model.count({
    where: {
      slug,
    },
  });
  if (count > 0) return await slugModel(value, model, c + 1);

  return slug;
}
export async function queryFilter(input) {
  const { page = 1, per_page = 20 } = input;
  const skip = (page - 1) * per_page;
  let orderBy = {};
  const { sort_order = "desc", sort = "id" } = input;
  if (sort == "customer")
    orderBy = {
      customer: {
        name: sort_order,
      },
      // meta: {
      //   aaa: true
      // }
    };
  else {
    orderBy = {
      [sort]: sort_order,
    };
  }
  return {
    take: Number(per_page),
    skip: Number(skip),
    orderBy,
  };
}
export async function getPageInfo(input, where, model) {
  const { page = 1, per_page = 20 } = input;
  const skip = (page - 1) * Number(per_page);
  const count = await model.count({
    where,
  });
  const from = skip + 1;
  const pageInfo = {
    hasPreviousPage: skip > 0,
    pageCount: Math.ceil(count / per_page),
    totalItems: count,
    pageIndex: skip / per_page,
    currentPage: page,
    from,
    to: Math.min(skip + Number(per_page), count),
    perPage: per_page,
  };
  return pageInfo;
}

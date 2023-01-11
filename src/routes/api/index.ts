import type { RequestHandler } from "@builder.io/qwik-city";
import { type InsertResult } from "kysely";
import { v4 } from "uuid";
import { ZodError } from "zod";

import { db } from "~/server/db";
import { createGuest, type SanitisedData, type GuestData } from "~/util/schema";

export const onGet: RequestHandler<SanitisedData[]> = async () => {
  const data = await db
    .selectFrom("GuestBook")
    .selectAll()
    .orderBy("createdAt", "desc")
    .execute();

  return data.map((guest) => ({
    ...guest,
    createdAt: guest.createdAt.toString(),
  }));
};

export const onPost: RequestHandler<InsertResult> = async ({ request }) => {
  const input: GuestData = await request.json();

  try {
    createGuest.parse(input);
  } catch (err) {
    if (err instanceof ZodError) {
      return console.log(err.issues);
    }
  }

  const newGuest = await db
    .insertInto("GuestBook")
    .values({
      id: v4(),
      username: input.username,
      comment: input.comment,
    })
    .executeTakeFirst();

  return newGuest.toString();
};

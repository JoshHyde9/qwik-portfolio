import type { RequestHandler } from "@builder.io/qwik-city";
import { type RequestHandlerNetlify } from "@builder.io/qwik-city/middleware/netlify-edge";
import { type InsertResult } from "kysely";
import { v4 } from "uuid";
import { ZodError } from "zod";

import { db, type GuestBook } from "~/server/db";
import { createGuest, type GuestData } from "~/util/schema";

// export const onGet: RequestHandler<GuestBook[]> = async () => {
//   return await db
//     .selectFrom("GuestBook")
//     .selectAll()
//     .orderBy("createdAt", "desc")
//     .execute();
// };

export const onGet: RequestHandlerNetlify<GuestBook[]> = async () => {
  return await db
    .selectFrom("GuestBook")
    .selectAll()
    .orderBy("createdAt", "desc")
    .execute();
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
      createdAt: new Date().toString(),
    })
    .executeTakeFirst();

  return newGuest.toString();
};

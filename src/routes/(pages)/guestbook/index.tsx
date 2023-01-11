import { component$, Resource } from "@builder.io/qwik";
import {
  type DocumentHead,
  type RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import { type GuestBook } from "@prisma/client";

import { db } from "~/server/db";

export const onGet: RequestHandler<GuestBook[]> = async () => {
  return await db
    .selectFrom("GuestBook")
    .selectAll()
    .orderBy("createdAt", "desc")
    .execute();
};

export type Guests = {
  guests: GuestBook[];
};

export const Guests = component$<Guests>(({ guests }) => {
  return (
    <>
      {guests.map((guest) => (
        <>
          <h1>{guest.username}</h1>
        </>
      ))}
    </>
  );
});

export default component$(() => {
  const resource = useEndpoint<typeof onGet>();
  return (
    <Resource
      value={resource}
      onPending={() => <div>loading...</div>}
      onRejected={() => <div>Error</div>}
      onResolved={(guests) => <Guests guests={guests} />}
    />
  );
});

export const head: DocumentHead = {
  title: "Guestbook",
  meta: [
    {
      name: "description",
      content: "Send a cute, little message now that you have found this page",
    },
  ],
};

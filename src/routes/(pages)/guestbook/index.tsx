import {
  component$,
  Resource,
  useStore,
  $,
  useResource$,
  type QwikChangeEvent,
  type ResourceReturn,
  useSignal,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import dayjs from "dayjs";
import { FormField } from "~/components/FormField";
import { v4 } from "uuid";

import { db, type GuestBook } from "~/server/db";

export type Guests = {
  guests: GuestBook[];
};

export const Guests = component$<Guests>(({ guests }) => {
  return (
    <>
      {guests.map((guest) => (
        <div class="pb-4 w-full">
          <div class="flex flex-row justify-between">
            <div class="w-2/3">
              <p class="text-lg">{guest.comment}</p>
              <h1 class="text-xl text-purple-300">
                <span class="italic">&#8211; </span>
                {guest.username}
              </h1>
            </div>
            <p class="text-xs md:text-sm text-neutral-400">
              {dayjs(guest.createdAt).format("DD/MM/YYYY - HH:mm")}
            </p>
          </div>
        </div>
      ))}
    </>
  );
});

type GuestData = {
  username: string;
  comment: string;
};

export default component$(() => {
  const epic = useSignal(true);
  const store = useStore<GuestData>({ username: "", comment: "" });

  const onChange = $(
    (e: QwikChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      store[e.target.name as keyof GuestData] = e.target.value;
    }
  );

  const resource: ResourceReturn<GuestBook[]> = useResource$(
    async ({ cleanup, track }) => {
      const guests = await db
        .selectFrom("GuestBook")
        .selectAll()
        .orderBy("createdAt", "desc")
        .execute();

      const abortController = new AbortController();
      cleanup(() => abortController.abort("cleanup"));

      track(() => epic.value);

      return guests;
    }
  );

  const onSubmit = $(async () => {
    await db
      .insertInto("GuestBook")
      .values({
        id: v4(),
        username: store.username,
        comment: store.comment,
      })
      .executeTakeFirstOrThrow();

    store.username = "";
    store.comment = "";
    epic.value = !epic.value;
  });

  return (
    <>
      <div>
        <h1 class="text-4xl text-purple-300">Guestbook</h1>
        <p>
          Please feel free to leave a comment now that you have found this page!
        </p>
      </div>
      <div class="my-5">
        <form class="flex flex-col" preventdefault:submit onSubmit$={onSubmit}>
          <div class="flex flex-col my-4">
            <FormField
              element="input"
              type="text"
              label="Name:"
              name="username"
              placeholder="Bill Gates"
              value={store.username}
              onChange={onChange}
            />
          </div>
          <div class="flex flex-col my-4">
            <FormField
              element="textarea"
              label="Comment:"
              name="comment"
              placeholder="This is a really cool website"
              rows={5}
              value={store.comment}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            class="w-full flex justify-center bg-purple-500 py-2 rounded-md duration-300 text-white hover:bg-purple-400 disabled:cursor-not-allowed"
          >
            Comment
          </button>
        </form>
      </div>
      <div>
        <Resource
          value={resource}
          onPending={() => <div>loading...</div>}
          onRejected={() => <div>Error</div>}
          onResolved={(guests) => <Guests guests={guests} />}
        />
      </div>
    </>
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

import {
  component$,
  useSignal,
  useStore,
  useTask$,
  $,
  type QwikChangeEvent,
} from "@builder.io/qwik";
import {
  type DocumentHead,
  loader$,
  action$,
  Form,
} from "@builder.io/qwik-city";
import dayjs from "dayjs";
import { v4 } from "uuid";
import { ZodError } from "zod";

import { FormField } from "~/components/FormField";
import { db } from "~/server/db";

import {
  createGuest,
  type GuestData,
  type SanitisedGuests,
} from "~/util/schema";

export type Guests = {
  guests: SanitisedGuests[];
};

export const createComment = action$(async (form) => {
  const username = form.get("username") as string;
  const comment = form.get("comment") as string;

  try {
    createGuest.parse({ username, comment });
  } catch (err) {
    if (err instanceof ZodError) {
      return err.issues[0].message;
    }
  }

  await db
    .insertInto("GuestBook")
    .values({
      id: v4(),
      username: username,
      comment: comment,
    })
    .executeTakeFirst();

  return { success: true, form };
});

export const getAllGuests = loader$(async () => {
  const data = await db
    .selectFrom("GuestBook")
    .selectAll()
    .orderBy("createdAt", "desc")
    .execute();

  return data.map((guest) => ({
    ...guest,
    createdAt: guest.createdAt.toString(),
  }));
});

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

export default component$(() => {
  const store = useStore<GuestData>({ username: "", comment: "" });
  const error = useSignal("");
  const create = createComment.use();
  const guests = getAllGuests.use();

  useTask$(({ track }) => {
    track(() => create.value);
    if (typeof create.value === "string") {
      error.value = create.value;
    } else {
      store.comment = "";
      store.username = "";
      error.value = "";
    }
  });

  const onChange = $(
    (e: QwikChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      store[e.target.name as keyof GuestData] = e.target.value;
    }
  );

  return (
    <div class="max-w-prose mx-auto mt-10">
      <div>
        <h1 class="text-4xl text-purple-300">Guestbook</h1>
        <p>
          Please feel free to leave a comment now that you have found this page!
        </p>
      </div>
      <div class="my-5">
        <Form class="flex flex-col" action={create}>
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
          <div class="flex flex-col mt-4">
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

          <div class="h-5 my-2">
            <p
              class={`italic text-sm text-purple-300 ${
                !error.value ? "hidden" : ""
              }`}
            >
              {error.value}
            </p>
          </div>

          <button
            type="submit"
            class="w-full flex justify-center bg-purple-500 py-2 rounded-md duration-300 text-white hover:bg-purple-400 disabled:cursor-not-allowed"
          >
            Comment
          </button>
        </Form>
      </div>
      <div>
        <Guests guests={guests.value} />
      </div>
    </div>
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

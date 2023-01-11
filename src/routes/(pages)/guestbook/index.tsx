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
import { ZodError } from "zod";

import { FormField } from "~/components/FormField";

import {
  createGuest,
  type SanitisedGuests,
  type GuestData,
} from "~/util/schema";

export type Guests = {
  guests: SanitisedGuests[];
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

export default component$(() => {
  const refetch = useSignal(false);
  const store = useStore<GuestData>({ username: "", comment: "" });

  const onChange = $(
    (e: QwikChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      store[e.target.name as keyof GuestData] = e.target.value;
    }
  );

  const resource: ResourceReturn<SanitisedGuests[]> = useResource$(
    async ({ cleanup, track }) => {
      const abortController = new AbortController();
      cleanup(() => abortController.abort("cleanup"));

      track(() => refetch.value);

      const response = await fetch(
        "https://dainty-cupcake-cc6629.netlify.app/api/"
      );

      return (await response.json()) as SanitisedGuests[];
    }
  );

  const onSubmit = $(async () => {
    try {
      createGuest.parse(store);
    } catch (err) {
      if (err instanceof ZodError) {
        return console.log(err.issues);
      }
    }

    await fetch("/api/", {
      method: "POST",
      body: JSON.stringify(store),
    });

    store.username = "";
    store.comment = "";
    refetch.value = !refetch.value;
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

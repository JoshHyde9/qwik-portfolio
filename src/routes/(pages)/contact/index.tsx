import {
  component$,
  useSignal,
  useStore,
  useTask$,
  $,
  type QwikChangeEvent,
} from "@builder.io/qwik";
import { type DocumentHead, action$, Form } from "@builder.io/qwik-city";
import { ZodError } from "zod";

import { FormField } from "~/components/FormField";
import { IconLink } from "~/components/icon/IconLink";

import { type EmailData, sendEmailSchema } from "~/util/schema";
import { sendEmail } from "~/util/sendEmail";

export const sendEmailAction = action$(async (form) => {
  const name = form.get("name") as string;
  const email = form.get("email") as string;
  const subject = form.get("subject") as string;
  const message = form.get("message") as string;

  try {
    sendEmailSchema.parse({ name, email, subject, message });
  } catch (err) {
    if (err instanceof ZodError) {
      return err.issues[0].message;
    }
  }

  return await sendEmail({ name, email, subject, message });
});

export default component$(() => {
  const store = useStore<EmailData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const error = useSignal("");
  const sendEmail = sendEmailAction.use();

  useTask$(({ track }) => {
    track(() => sendEmail.value);
    if (typeof sendEmail.value === "string") {
      error.value = sendEmail.value;
    } else {
      store.name = "";
      store.email = "";
      store.subject = "";
      store.message = "";
      error.value = "";
    }
  });

  const onChange = $(
    (e: QwikChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      store[e.target.name as keyof EmailData] = e.target.value;
    }
  );

  return (
    <div class="max-w-prose mx-auto mt-10">
      <div>
        <h1 class="text-4xl text-purple-300">Contact me</h1>
        <p>
          Do you have any questions, concerns or just want to say g'day? Here
          are the easiest ways to contact me!
        </p>
      </div>
      <div class="flex flex-row flex-wrap justify-between mt-10 px-2 md:px-0">
        <IconLink
          icon="LinkedIn"
          message="Whack me a message on LinkedIn"
          url="https://www.linkedin.com/in/josh-hyde-244324245/"
        />
        <IconLink
          icon="Twitter"
          message="Send me a message on Twitter"
          url="https://twitter.com/JoshHyde9"
        />
        <IconLink
          icon="Discord"
          message="Jim's Discord Account#1020"
          url="https://discordapp.com/users/197955018828152833/"
        />
        <IconLink
          icon="GitHub"
          message="Tell me I'm doing something wrong"
          url="https://github.com/JoshHyde9"
        />
      </div>
      <div class="mt-5 pb-24">
        <p>Or you can send me a good ol' fashioned email if you want.</p>
        <Form class="flex flex-col" action={sendEmail}>
          <div class="flex flex-col my-4">
            <FormField
              element="input"
              type="text"
              label="name:"
              name="name"
              placeholder="Jim Penman"
              value={store.name}
              onChange={onChange}
            />
          </div>
          <div class="flex flex-col my-4">
            <FormField
              element="input"
              type="email"
              label="Contact Email:"
              name="email"
              placeholder="john@doe.com"
              value={store.email}
              onChange={onChange}
            />
          </div>
          <div class="flex flex-col my-4">
            <FormField
              element="input"
              type="text"
              label="Subject:"
              name="subject"
              placeholder="How did you make this?"
              value={store.subject}
              onChange={onChange}
            />
          </div>
          <div class="flex flex-col mt-4">
            <FormField
              element="textarea"
              label="Message:"
              name="message"
              placeholder="No seriously, how did you make this?"
              rows={5}
              value={store.message}
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
            class="w-full flex justify-center bg-purple-500 font-bold py-2 rounded-md duration-300 text-white hover:bg-purple-400 disabled:cursor-not-allowed"
          >
            Send email
          </button>
        </Form>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Contact Me",
  meta: [
    {
      name: "og:title",
      content: "Contact Me",
    },
    {
      name: "description",
      content:
        "The only page on the internet that has the best resources for ways to contact me.",
    },
    {
      name: "og:description",
      content:
        "The only page on the internet that has the best resources for ways to contact me.",
    },
    {
      name: "url",
      content: "https://dev.joshhyde.me/contact",
    },
    {
      name: "og:url",
      content: "https://dev.joshhyde.me/contact",
    },
    {
      name: "twitter:title",
      content: "Contact Me",
    },
    {
      name: "twitter:description",
      content:
        "The only page on the internet that has the best resources for ways to contact me.",
    },
  ],
};

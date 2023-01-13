import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="fade flex justify-center items-center flex-col h-full pb-20">
      <h1 class="text-6xl mb-2">
        👋, I'm <span class="text-purple-300">Josh</span>.
      </h1>
      <h2 class="text-4xl w-4/5 md:w-1/3 2xl:w-1/6 text-center">
        Full Stack developer who likes to build things.
      </h2>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Josh Hyde",
  meta: [
    {
      name: "description",
      content:
        "A handy dandy website for displaying my accomplishments, skills, experiences, and attributes.",
    },
    {
      name: "og:description",
      content:
        "A handy dandy website for displaying my accomplishments, skills, experiences, and attributes.",
    },
    {
      name: "url",
      content: "https://dev.joshhyde.me",
    },
    {
      name: "og:url",
      content: "https://dev.joshhyde.me",
    },
    {
      name: "twitter:title",
      content: "Josh Hyde",
    },
    {
      name: "twitter:description",
      content:
        "A handy dandy website for displaying my accomplishments, skills, experiences, and attributes.",
    },
  ],
};

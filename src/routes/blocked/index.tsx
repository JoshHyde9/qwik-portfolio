import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section class="flex items-center justify-center h-full">
      <h1 class="text-5xl font-bold text-purple-300">
        You are being rate limited
      </h1>
    </section>
  );
});

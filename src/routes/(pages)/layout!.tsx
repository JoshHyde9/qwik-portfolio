import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "~/components/layout/Navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <section class="max-w-prose mx-auto px-2 md:px-0">
        <Slot />
      </section>
    </>
  );
});

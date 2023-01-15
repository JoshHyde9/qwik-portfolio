import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "~/components/layout/Navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <section class="px-2 md:px-0">
        <Slot />
      </section>
    </>
  );
});

import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "~/components/layout/Navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <section>
        <Slot />
      </section>
    </>
  );
});

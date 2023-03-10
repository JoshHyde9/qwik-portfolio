import { component$, Slot } from "@builder.io/qwik";
import { Navbar } from "~/components/layout/Navbar";

export default component$(() => {
  return (
    <div class="h-screen">
      <Navbar />
      <main class="h-[calc(100%_-_80px)] overflow-y-hidden">
        <Slot />
      </main>
    </div>
  );
});

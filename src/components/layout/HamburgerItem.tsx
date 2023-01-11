import { component$ } from "@builder.io/qwik";

type ItemProps = {
  position: "top" | "middle" | "bottom";
  open: boolean;
};

export const HamburgerItem = component$<ItemProps>(({ position, open }) => {
  const classes =
    "h-1 w-full bg-slate-300 rounded-lg transform transition-all duration-300 ease-in-out";

  return (
    <>
      {position === "top" ? (
        <span
          class={`${classes} ${
            open ? "rotate-45 translate-y-3.5 bg-global-warming" : ""
          }`}
        />
      ) : position === "middle" ? (
        <span class={`${classes} ${open ? "w-0 bg-global-warming" : ""}`} />
      ) : (
        <span
          class={`${classes} ${
            open ? "-rotate-45 -translate-y-3.5 bg-global-warming" : ""
          }`}
        />
      )}
    </>
  );
});

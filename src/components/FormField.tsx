import { component$, type QRL } from "@builder.io/qwik";

type DefaultProps = {
  label: string;
  element: "input" | "textarea";
  name: string;
  placeholder: string;
  value: string;
  onChange: QRL<(e: any) => void>;
};

type InputProps =
  | (DefaultProps & {
      element: "input";
      type:
        | "button"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "image"
        | "month"
        | "number"
        | "password"
        | "radio"
        | "range"
        | "reset"
        | "search"
        | "submit"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week";
      rows?: never;
    })
  | (DefaultProps & { element: "textarea"; rows: number; type?: never });

export const FormField = component$<InputProps>(
  ({ label, name, element, type, rows, placeholder, onChange, value }) => {
    const classes =
      "bg-gray-200 appearance-none border-[3px] border-purple-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500 transition ease-in-out duration-300";

    return (
      <>
        <label
          class="block uppercase tracking-wide text-xs font-extrabold mb-2"
          for={name}
        >
          {label}
        </label>
        {element === "input" ? (
          <input
            type={type}
            name={name}
            class={classes}
            placeholder={placeholder}
            autoComplete="off"
            value={value}
            onChange$={(e) => onChange(e)}
          />
        ) : (
          <textarea
            name={name}
            class={classes}
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange$={(e) => onChange(e)}
          />
        )}
      </>
    );
  }
);

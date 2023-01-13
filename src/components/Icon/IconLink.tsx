import { component$ } from "@builder.io/qwik";

import { Icon } from "./Icon";
import { type Icons } from "~/util/IconLib";

type IconLinkProps = {
  url: string;
  message: string;
  icon: keyof typeof Icons;
};

export const IconLink = component$<IconLinkProps>(({ icon, message, url }) => (
  <div class="flex flex-col items-center w-36 mb-4">
    <a href={url} target="_blank">
      <Icon
        name={icon}
        class="mb-1 h-10 fill-purple-500 hover:fill-purple-300 transition ease-in-out duration-300"
        size="48"
      />
    </a>
    <p class="text-center">{message}</p>
  </div>
));

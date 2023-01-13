import { component$ } from "@builder.io/qwik";
import { Icons } from "../../util/IconLib";

type IconProps = {
  class?: string;
  style?: any;
  size?: "16" | "24" | "32" | "40" | "48";
  name: keyof typeof Icons;
};

export const Icon = component$<IconProps>(({ size = "24", name, ...props }) => (
  <svg width={size} height={size} viewBox={Icons[name].viewBox} {...props}>
    <path d={Icons[name].path} />
  </svg>
));

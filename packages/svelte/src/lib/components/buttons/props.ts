import type { Href } from "@feltui/shared";
import { type ButtonStandardProps } from "@feltui/shared/components";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ButtonProps<Link extends Href> = HTMLButtonAttributes &
	ButtonStandardProps<"svelte", Link>;

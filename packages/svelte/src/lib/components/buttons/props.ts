import type { Href } from "@feltui/shared";
import type {
    ButtonStandardProps,
    ButtonIconProps as BtnIconProps,
} from "@feltui/shared/components";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ButtonProps<Link extends Href> = HTMLButtonAttributes &
    ButtonStandardProps<"svelte", Link>;

export type ButtonIconProps<Link extends Href> = HTMLButtonAttributes &
    BtnIconProps<"svelte", Link>;

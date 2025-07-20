import type {
    ButtonStandardProps,
    ButtonIconProps as BtnIconProps,
} from "@feltui/shared/components";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ButtonProps = HTMLButtonAttributes & ButtonStandardProps<"svelte">;

export type ButtonIconProps = HTMLButtonAttributes & BtnIconProps<"svelte">;

import type {
    ButtonStandardProps,
    ButtonIconProps as BtnIconProps,
    ButtonToggleProps as BtnToggleProps,
    ButtonToggleIconProps as BtnToggleIconProps,
} from "@feltui/shared/components";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ButtonProps = HTMLButtonAttributes & ButtonStandardProps<"svelte">;

export type ButtonIconProps = HTMLButtonAttributes & BtnIconProps<"svelte">;

export type ButtonToggleProps = HTMLButtonAttributes & BtnToggleProps<"svelte">;

export type ButtonToggleIconProps = HTMLButtonAttributes &
    BtnToggleIconProps<"svelte">;

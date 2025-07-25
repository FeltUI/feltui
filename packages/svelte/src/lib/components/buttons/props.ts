import type {
    ButtonStandardProps,
    ButtonIconProps as BtnIconProps,
    ButtonToggleProps as BtnToggleProps,
    ButtonToggleIconProps as BtnToggleIconProps,
    ButtonFabProps as BtnFabProps,
    ButtonGroupProps as BtnGroupProps,
} from "@feltui/shared/components";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

export type ButtonProps = HTMLButtonAttributes & ButtonStandardProps<"svelte">;

export type ButtonIconProps = HTMLButtonAttributes & BtnIconProps<"svelte">;

export type ButtonToggleProps = HTMLButtonAttributes & BtnToggleProps<"svelte">;

export type ButtonToggleIconProps = HTMLButtonAttributes &
    BtnToggleIconProps<"svelte">;

export type ButtonFabProps = HTMLButtonAttributes & BtnFabProps<"svelte">;

export type ButtonGroupProps<Multiple extends boolean = false> =
    HTMLAttributes<HTMLDivElement> & BtnGroupProps<Multiple>;

import type { MaterialSymbol } from "material-symbols";
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";

export type Href = HTMLAnchorAttributes["href"] | undefined;

export type SizeProp = "xs" | "sm" | "md" | "lg" | "xl";

export type NullableSizeProp = SizeProp | "none";

export type CssUnit =
    | "px"
    | "%"
    | "em"
    | "ex"
    | "ch"
    | "rem"
    | "vw"
    | "vh"
    | "vmin"
    | "vmax";

export type CssValue = `${number}${CssUnit}`;

export type IconProp<Framework extends "svelte" | "vue"> =
    | MaterialSymbol
    | (Framework extends "svelte" ? Snippet : never);

export type StringWithSuggestions<T extends string> = T | (string & {});

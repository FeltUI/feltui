import type { MaterialSymbol } from "material-symbols";
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";

export type Href = HTMLAnchorAttributes["href"] | undefined;

export type SizeProp = "xs" | "sm" | "md" | "lg" | "xl";

export type IconProp<Framework extends "svelte" | "vue"> =
	| MaterialSymbol
	| Framework extends "svelte"
	? Snippet
	: never;

import type {
	ClickableComponent,
	Href,
	IconProp,
	LinkComponent,
	SizeProp,
} from "@feltui/shared";

export interface ButtonBaseProps extends ClickableComponent {
	/**
	 * Size of the button, which can affect its padding and font size.
	 */
	size?: SizeProp;

	/**
	 * Removes the button's elevation.
	 */
	unelevated?: boolean;
}

export interface ButtonWithShapeProps {
	/**
	 * Shape of the button, whether it is squared or rounded.
	 */
	shape?: "squared" | "rounded";
}

export interface ButtonWithVariantProps {
	/**
	 * The visual style of the button, which can affect its appearance and interaction.
	 * If this prop is specified, it will overwrite all other variants defined with boolean props.
	 * By default, the button will have an elevated style.
	 */
	variant?: "elevated" | "filled" | "tonal" | "outlined" | "text";

	/**
	 * Equivalent to `variant="filled"`, overwritten by `variant` but overwrites `tonal`, `outlined`, and `text`.
	 */
	filled?: boolean;

	/**
	 * Equivalent to `variant="tonal"`, overwritten by `variant` and `filled` but overwrites `outlined`, and `text`.
	 */
	tonal?: boolean;

	/**
	 * Equivalent to `variant="outlined"`, overwritten by `variant`, `filled`, and `tonal` but overwrites `text`.
	 */
	outlined?: boolean;

	/**
	 * Equivalent to `variant="text"`, overwritten by `variant`, `filled`, `tonal`, and `outlined`.
	 */
	text?: boolean;
}

export interface ButtonWithIconProps<Framework extends "svelte" | "vue"> {
	/**
	 * Icon to be displayed in the button.
	 * The icon can be a string representing a MaterialSymbols icon, or a Snippet in Svelte.
	 */
	icon?: IconProp<Framework>;
}

export interface ButtonWithValueProps {
	/**
	 * For a toggle button, indicates whether the button is toggled on or off.
	 * For a button group, indicates the value of the selected button.
	 */
	value?: boolean;
}

/**
 * Properties for an icon button, which is a button that primarily displays an icon.
 */
export interface ButtonIconProps<
	Framework extends "svelte" | "vue",
	Link extends Href = undefined,
> extends LinkComponent<Framework, Link>,
		ButtonBaseProps,
		ButtonWithShapeProps,
		ButtonWithVariantProps,
		ButtonWithIconProps<Framework> {
	/**
	 * Width of the icon button, affecting its shape and size.
	 */
	width?: "narrow" | "default" | "wide";
}

/**
 * Standard button properties that include basic button functionality and appearance.
 */
export interface ButtonStandardProps<
	Framework extends "svelte" | "vue",
	Link extends Href = undefined,
> extends LinkComponent<Framework, Link>,
		ButtonBaseProps,
		ButtonWithShapeProps,
		ButtonWithVariantProps,
		ButtonWithIconProps<Framework> {
	/**
	 * Label for the button, which is displayed as text.
	 */
	label: string;
}

/**
 * Properties for a toggle button, which can be used in button groups or as standalone toggle button.
 */
export interface ButtonToggleProps<
	Framework extends "svelte" | "vue",
	Link extends Href = undefined,
> extends ButtonStandardProps<Framework, Link>,
		ButtonWithValueProps {}

/**
 * Properties for a floating action button (FAB), which is typically used for primary actions.
 */
export interface ButtonFabProps<Framework extends "svelte" | "vue">
	extends Omit<ClickableComponent, "size">,
		ButtonWithIconProps<Framework> {
	/**
	 * Size of the FAB button.
	 */
	size?: Extract<SizeProp, "sm" | "md" | "lg">;
}

/**
 * Properties for an extended FAB, which is a larger version of the FAB that can include text.
 */
export interface ButtonExtendedFabProps<Framework extends "svelte" | "vue">
	extends ButtonFabProps<Framework> {
	/**
	 * Label for the extended FAB, which is displayed as text alongside the icon.
	 */
	label?: string;
}

/**
 * Properties for a button group, which is a collection of buttons that can be toggled.
 */
export interface ButtonGroupProps<Multiple extends boolean = false>
	extends ButtonBaseProps {
	/**
	 * Whether the group should be connected or not.
	 */
	connected?: boolean;

	/**
	 * Indiquates whether the button group allows multiple selections.
	 * If true, the value of the selected buttons will be an array.
	 */
	multiple?: Multiple;

	/**
	 * Value of the selected button(s) in the group.
	 * If `multiple` is true, this will be an array of values.
	 */
	value?: Multiple extends true ? string[] : string | null;
}

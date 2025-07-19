export interface DisableableComponent {
	/**
	 * Puts the component in a disabled state, making it uninteractive.
	 */
	disabled?: boolean;
}

export interface ClickableComponent extends DisableableComponent {
	/**
	 * Disables the ripple effect on click.
	 */
	noRipple?: boolean;

	/**
	 * Color of the ripple effect.
	 */
	rippleColor?: string;
}

export interface FocusableComponent extends DisableableComponent {
	/**
	 * Removes the focus ring from the component.
	 */
	noFocusRing?: boolean;

	/**
	 * Component's tabindex.
	 */
	tabindex?: number;
}

export interface LinkComponent<
	Framework extends "svelte" | "vue",
	Link extends HTMLAnchorElement["href"] | undefined = undefined,
> {
	/**
	 * Makes the component navigational, typically used for links to set the URL it should navigate to.
	 */
	href?: Link;

	/**
	 * For Vue, specifies the target route to navigate to. Uses the router's link system instead of standard HTML links.
	 * This is useful for single-page applications where you want to navigate without reloading the page
	 */
	to?: Framework extends "vue" ? Link : never;

	/**
	 * For navigational components only, sets or retrieves the window or frame at which to target content.
	 */
	target?: Link extends undefined ? undefined : HTMLAnchorElement["target"];
}

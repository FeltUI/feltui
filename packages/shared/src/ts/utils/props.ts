import { isNumeric } from "./number";
import type { CssUnit, Href, NullableSizeProp } from "./types";

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
    Link extends Href | undefined = undefined,
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

export function parseColorProp(color: string | undefined) {
    return color && `var(--${color.replace("#", "")}, ${color})`;
}

export function parseSizeProp(size: string | number | undefined) {
    if (!size) {
        return {};
    }

    const sizes: NullableSizeProp[] = ["none", "xs", "sm", "md", "lg", "xl"];
    const cssUnits: CssUnit[] = [
        "px",
        "%",
        "em",
        "ex",
        "ch",
        "rem",
        "vw",
        "vh",
        "vmin",
        "vmax",
    ];

    const sizeClass = sizes.includes(size as NullableSizeProp)
        ? (size as NullableSizeProp)
        : undefined;

    let sizeStyle: string | undefined;

    if (isNumeric(size)) {
        sizeStyle = Number(size) > 0 ? `${size}px` : undefined;
    } else {
        for (const unit of cssUnits) {
            if (size.slice(-unit.length) === unit) {
                sizeStyle = size;
                break;
            }
        }
    }

    return {
        class: sizeClass,
        style: sizeStyle,
    };
}

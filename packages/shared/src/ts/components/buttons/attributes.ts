import type {
    HTMLButtonAttributes,
    HTMLAnchorAttributes,
    HTMLAttributes,
} from "svelte/elements";

type Params = {
    href?: HTMLAnchorAttributes["href"];
    disabled?: boolean;
    toggled?: boolean;
    expanded?: boolean;
    hasPopup?: boolean;
    type?: HTMLButtonAttributes["type"];
};

export const getButtonAttributes = <T extends HTMLElement>({
    href,
    disabled,
    toggled,
    expanded,
    hasPopup,
    type,
    ...props
}: Params & HTMLAttributes<T>) =>
    ({
        href,
        type: href ? undefined : type,
        role: href ? "button" : undefined,
        tabindex: href && disabled ? -1 : 0,
        [href ? "aria-disabled" : "disabled"]: disabled ? "true" : undefined,
        "aria-pressed": props["aria-pressed"] ?? (toggled ? "true" : undefined),
        "aria-expanded":
            props["aria-expanded"] ?? (expanded ? "true" : undefined),
        "aria-haspopup":
            props["aria-haspopup"] ?? (hasPopup ? "true" : undefined),
    }) as const;

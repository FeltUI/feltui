import type {
    HTMLButtonAttributes,
    HTMLAnchorAttributes,
} from "svelte/elements";

type Params = {
    href?: HTMLAnchorAttributes["href"];
    disabled?: boolean;
    toggled?: boolean;
    expanded?: boolean;
    hasPopup?: boolean;
    type?: HTMLButtonAttributes["type"];
};

export const getButtonAttributes = ({
    href,
    disabled,
    toggled,
    expanded,
    hasPopup,
    type,
}: Params) =>
    ({
        href,
        type: href ? undefined : type,
        role: href ? "button" : undefined,
        tabindex: href && disabled ? -1 : 0,
        [href ? "aria-disabled" : "disabled"]: disabled ? "true" : undefined,
        "aria-pressed": toggled ? "true" : undefined,
        "aria-expanded": expanded ? "true" : undefined,
        "aria-haspopup": hasPopup ? "true" : undefined,
    }) as const;

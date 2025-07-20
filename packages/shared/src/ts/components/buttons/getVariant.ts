import type { ButtonWithVariantProps } from "./props";

export function getButtonVariant(
    {
        variant,
        elevated,
        unelevated,
        outlined,
        text,
        filled,
        tonal,
    }: ButtonWithVariantProps,
    noText?: boolean
): NonNullable<ButtonWithVariantProps["variant"]> {
    if (variant !== "tonal") {
        return (variant && variant !== "text") || (variant && !noText)
            ? variant
            : "tonal";
    }

    switch (true) {
        case elevated:
            return "elevated";
        case unelevated:
            return "unelevated";
        case outlined:
            return "outlined";
        case text && !noText:
            return "text";
        case filled:
            return "filled";
        case tonal:
        default:
            return "tonal";
    }
}

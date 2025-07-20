import type {
    ClickableComponent,
    IconProp,
    LinkComponent,
    SizeProp,
} from "@feltui/shared";

// #region:    --- Button Base Props
export type ButtonBaseProps = ClickableComponent & {
    /**
     * Size of the button, which can affect its padding and font size.
     */
    size?: SizeProp;
};
// #endregion: --- Button Base Props

// #region:    --- Button With Shape Props
export type ButtonWithShapeProps = {
    /**
     * Shape of the button, whether it is squared or rounded.
     */
    shape?: "squared" | "rounded";
};
// #endregion: --- Button With Shape Props

// #region:    --- Button With Variant Props
export type ButtonWithVariantProps = {
    /**
     * The visual style of the button, which can affect its appearance and interaction.
     * If this prop is specified, it will overwrite all other variants defined with boolean props.
     * By default, the button will have a tonal style.
     */
    variant?:
        | "elevated"
        | "unelevated"
        | "filled"
        | "tonal"
        | "outlined"
        | "text";

    /**
     * Equivalent to `variant="elevated"`, overwritten by `variant` but overwrites `filled`, `outlined`, `text` and `tonal`.
     */
    elevated?: boolean;

    /**
     * Equivalent to `variant="unelevated"`, overwritten by `variant` and `elevated` but overwrites `filled`, `outlined`, `text` and `tonal`.
     */
    unelevated?: boolean;

    /**
     * Equivalent to `variant="filled"`, overwritten by `variant` and `elevated` but overwrites `outlined`, `text` and `tonal`.
     */
    filled?: boolean;

    /**
     * Equivalent to `variant="outlined"`, overwritten by `variant`, `elevated`, and `filled` but overwrites `text` and `tonal`.
     */
    outlined?: boolean;

    /**
     * Equivalent to `variant="text"`, overwritten by `variant` and `filled` and `outlined` but overwrites `tonal`.
     */
    text?: boolean;

    /**
     * Equivalent to `variant="tonal"`, overwritten by `variant`, `elevated`, `filled`, `tonal` and `outlined`.
     *
     */
    tonal?: boolean;
};
// #endregion: --- Button With Variant Props

// #region:    --- Button With Icon Props
export type ButtonWithIconProps<Framework extends "svelte" | "vue"> = {
    /**
     * Icon to be displayed in the button.
     * The icon can be a string representing a MaterialSymbols icon, or a Snippet in Svelte.
     */
    icon?: IconProp<Framework>;
};
// #endregion: --- Button With Icon Props

// #region:    --- Button With Value Props
export type ButtonWithValueProps = {
    /**
     * For a toggle button, indicates whether the button is toggled on or off.
     * For a button group, indicates the value of the selected button.
     */
    toggled?: boolean;
};
// #endregion: --- Button With Value Props

// ---- Button types props ----

// #region:    --- Standard Button Props
/**
 * Standard button properties that include basic button functionality and appearance.
 */
export type ButtonStandardProps<Framework extends "svelte" | "vue"> =
    LinkComponent<Framework> &
        ButtonBaseProps &
        ButtonWithShapeProps &
        ButtonWithVariantProps &
        ButtonWithIconProps<Framework> & {
            /**
             * Label for the button, which is displayed as text.
             */
            label: string;
        };
// #endregion: --- Standard Button Props

// #region:    --- Icon Button Props
/**
 * Properties for an icon button, which is a button that primarily displays an icon.
 */
export type ButtonIconProps<Framework extends "svelte" | "vue"> =
    LinkComponent<Framework> &
        ButtonBaseProps &
        ButtonWithShapeProps &
        ButtonWithVariantProps & {
            /**
             * Icon to be displayed in the button.
             * The icon can be a string representing a MaterialSymbols icon, or a Snippet in Svelte.
             */
            icon: IconProp<Framework>;

            /**
             * Width of the icon button, affecting its shape and size.
             */
            width?: "narrow" | "default" | "wide";
        };
// #endregion: --- Icon Button Props

// #region:    --- Standard Toggle Button Props
/**
 * Properties for a toggle button, which can be used in button groups or as standalone toggle button.
 */
export type ButtonToggleProps<Framework extends "svelte" | "vue"> =
    ButtonStandardProps<Framework> &
        ButtonWithValueProps & {
            /**
             * The visual style of the button, which can affect its appearance and interaction.
             * If this prop is specified, it will overwrite all other variants defined with boolean props.
             * By default, the button will have a tonal style.
             */
            variant?: Exclude<ButtonWithVariantProps["variant"], "text">;
        };
// #endregion: --- Standard Toggle Button Props

// #region:    --- Icon Toggle Button Props
/**
 * Properties for a toggle icon button, which can be used in button groups or as standalone toggle button.
 */
export type ButtonToggleIconProps<Framework extends "svelte" | "vue"> =
    ButtonIconProps<Framework> & ButtonWithValueProps;
// #endregion: --- Icon Toggle Button Props

// #region:    --- FAB Button Props
/**
 * Properties for a floating action button (FAB), which is typically used for primary actions.
 */
export type ButtonFabProps<Framework extends "svelte" | "vue"> = Omit<
    ClickableComponent,
    "size"
> &
    ButtonWithIconProps<Framework> & {
        /**
         * Size of the FAB button.
         */
        size?: Extract<SizeProp, "sm" | "md" | "lg">;
    };
// #endregion: --- FAB Button Props

// #region:    --- Extended FAB Button Props
/**
 * Properties for an extended FAB, which is a larger version of the FAB that can include text.
 */
export type ButtonExtendedFabProps<Framework extends "svelte" | "vue"> =
    ButtonFabProps<Framework> & {
        /**
         * Label for the extended FAB, which is displayed as text alongside the icon.
         */
        label?: string;
    };
// #endregion: --- Extended FAB Button Props

// #region:    --- Button Group Props
/**
 * Properties for a button group, which is a collection of buttons that can be toggled.
 */
export type ButtonGroupProps<Multiple extends boolean = false> =
    ButtonBaseProps & {
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
    };
// #endregion: --- Button Group Props

export const buttonPropsDefaults = {
    size: "md",
    shape: "rounded",
    variant: "tonal",
    toggled: false,
    width: "default",
    disabled: false,
} as const;

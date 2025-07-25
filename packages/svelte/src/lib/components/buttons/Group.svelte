<script module>
    export type ButtonGroupPropsCtx = Pick<
        ButtonGroupProps,
        | "size"
        | "shape"
        | "variant"
        | "tonal"
        | "elevated"
        | "unelevated"
        | "outlined"
        | "filled"
        | "requireSelection"
        | "noRipple"
        | "rippleColor"
        | "disabled"
    >;
</script>

<script lang="ts" generics="Multiple extends boolean = false">
    import type { ButtonGroupProps } from "./props";
    import { buttonSymbols, createFeltClass } from "@feltui/shared";
    import { setContext } from "svelte";

    // #region:    --- Props
    let {
        multiple = false as Multiple,
        value = $bindable(
            multiple ? [] : null
        ) as ButtonGroupProps<Multiple>["value"],
        connected = false,
        size = "md",
        shape = "rounded",
        variant = "tonal",
        tonal = false,
        elevated = false,
        unelevated = false,
        outlined = false,
        filled = false,
        requireSelection = false,
        noRipple = false,
        rippleColor,
        disabled = false,
        children,
        ...props
    }: ButtonGroupProps<Multiple> = $props();
    // #endregion: --- Props

    // #region:    --- Context
    setContext(buttonSymbols.groupValue, {
        get value() {
            return value;
        },
        set value(v) {
            value = v;
        },
    });
    setContext(buttonSymbols.groupProps, {
        size,
        shape,
        variant,
        tonal,
        elevated,
        unelevated,
        outlined,
        filled,
        requireSelection,
        noRipple,
        rippleColor,
        disabled,
    });
    // #endregion: --- Context

    // #region:    --- Derived
    const cls = $derived(
        createFeltClass("button-group", {
            bemClasses: {
                connected,
                size,
            },
        })
    );
    // #endregion: --- Derived
</script>

<!--
@component

Button groups allow users to group related buttons together, providing a cohesive user experience.
You can import this component as `ButtonGroup` or `Buttons.Group`.

Button groups can be single-select or multi-select, depending on the `multiple` prop.

The `value` prop will be populated with the `name` attribute of the toggled buttons, so make sure to set the `name` prop on each button in the group.
If not set, the `name` will default to the button's `label` or `icon` (that is, if it's a string. If not, a unique identifier will be used) prop.

-->
<div {...props} class={cls}>
    {@render children?.()}
</div>

<script lang="ts">
    import {
        getButtonAttributes,
        getButtonVariant,
    } from "@feltui/shared/components";
    import type { ButtonIconProps } from "./props";
    import { Context, ripple, Icon } from "$lib";
    import {
        buttonSymbols,
        createFeltClass,
        getActionableEventHandlers,
    } from "@feltui/shared";
    import { getContext } from "svelte";
    import type { ButtonGroupPropsCtx } from "./Group.svelte";

    // #region:    --- Props
    let {
        disabled = false,
        href,
        width = "default",
        size = "md",
        variant = "tonal",
        icon,
        rippleColor,
        target,
        text = false,
        to,
        tonal = false,
        elevated = false,
        unelevated = false,
        outlined = false,
        shape = "rounded",
        filled = false,
        noRipple = false,
        type,
        children,
        ...props
    }: ButtonIconProps = $props();
    // #endregion: --- Props

    // #region:    --- Context
    const hasPopup = new Context(buttonSymbols.hasPopup, false);

    const groupProps = getContext<ButtonGroupPropsCtx | undefined>(
        buttonSymbols.groupProps
    );
    // #endregion: --- Context

    // #region:    --- Derived
    const realVariant = $derived(
        getButtonVariant(
            {
                variant,
                tonal,
                elevated,
                unelevated,
                outlined,
                filled,
                text,
                ...groupProps,
            },
            // If it's a toggle button, we don't want to use the text variant
            props.class?.includes("felt-toggle-button")
        )
    );

    const realDisabled = $derived(groupProps?.disabled || disabled);

    const realShape = $derived(groupProps?.shape || shape);

    const realRipple = $derived({
        noRipple: groupProps?.noRipple || noRipple,
        rippleColor: rippleColor || groupProps?.rippleColor,
    });

    const realSize = $derived(groupProps?.size || size);

    const attributes = $derived(
        getButtonAttributes({
            href,
            disabled: realDisabled,
            hasPopup: hasPopup.value,
            type,
            ...props,
        })
    );

    const iconSize = $derived(
        realSize === "xs" || realSize === "sm"
            ? "1.25rem"
            : realSize === "md"
              ? "1.5rem"
              : realSize === "lg"
                ? "2rem"
                : "2.5rem"
    );

    const cls = $derived(
        createFeltClass("button", {
            props,
            bemClasses: {
                realVariant,
                shape: realShape,
                size: realSize,
                width,
            },
            classes: ["felt-icon-button"],
        })
    );
    // #endregion: --- Derived
</script>

<!--
@component

Icon buttons help people perform minor actions quickly and easily.
You can import this component as `IconButton` or `Buttons.Icon`.

Like the standard button component, it comes with 5 variants, each different styles and purposes. It also comes with 5 sizes (from `xs` to `xl`) and 2 shapes (`rounded` and `squared`).
A difference is that this component also has a `width` prop, which can be set to `narrow`, or `wide` to change the appearance of the button.

Of course, this component is fully accessible and supports all the features you would expect from a button, such as `disabled`, `icon`, `ripple`.

-->
<button
    {@attach ripple({
        disabled: realRipple.noRipple || realDisabled,
        color: realRipple.rippleColor,
    })}
    {...props}
    {...attributes}
    class={cls}
    {...getActionableEventHandlers({ disabled, ...props })}
>
    {#if typeof icon === "string"}
        <Icon name={icon} size={iconSize} />
    {:else}
        <span
            class="felt-button__icon"
            style:width={iconSize}
            style:height={iconSize}
        >
            {@render icon?.()}
        </span>
    {/if}
</button>

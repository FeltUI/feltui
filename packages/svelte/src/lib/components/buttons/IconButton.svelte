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
    // #endregion: --- Context

    // #region:    --- $derived
    const realVariant = $derived(
        getButtonVariant({
            variant,
            tonal,
            elevated,
            unelevated,
            outlined,
            filled,
            text,
        })
    );

    const attributes = $derived(
        getButtonAttributes({
            href,
            disabled,
            hasPopup: hasPopup.value,
            type,
        })
    );

    const iconSize = $derived(
        size === "xs" || size === "sm"
            ? "1.25rem"
            : size === "md"
              ? "1.5rem"
              : size === "lg"
                ? "2rem"
                : "2.5rem"
    );

    const cls = $derived(
        createFeltClass("button", {
            props,
            bemClasses: {
                realVariant,
                shape,
                size,
                width,
            },
            classes: ["felt-icon-button"],
        })
    );
    // #endregion: --- $derived
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
        disabled: noRipple || disabled,
        color: rippleColor,
    })}
    {...attributes}
    class={cls}
    {...props}
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

<script lang="ts">
    import {
        getButtonAttributes,
        getButtonVariant,
    } from "@feltui/shared/components";
    import type { ButtonProps } from "./props";
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
        label,
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
    }: ButtonProps = $props();
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
            },
        })
    );
    // #endregion: --- $derived
</script>

<!--
@component

Buttons prompt most actions in a UI.
You can import this component as `Button` or `Buttons.Standard`.

This component comes with 6 variants, each having different styles and purposes. It also comes with 5 sizes (from `xs` to `xl`) and 2 shapes (`rounded` and `squared`).

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
    {#if icon}
        {#if icon && typeof icon === "string"}
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
    {/if}

    <span class="felt-button__label">
        {label}
    </span>
</button>

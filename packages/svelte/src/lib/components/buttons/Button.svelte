<script lang="ts">
    import { Context, Icon, ripple } from "$lib";
    import {
        buttonSymbols,
        createFeltClass,
        getActionableEventHandlers,
    } from "@feltui/shared";
    import {
        getButtonAttributes,
        getButtonVariant,
    } from "@feltui/shared/components";
    import { getContext } from "svelte";
    import type { ButtonGroupPropsCtx } from "./Group.svelte";
    import type { ButtonProps } from "./props";

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

    const realRipple = $derived({
        noRipple: noRipple || groupProps?.noRipple,
        rippleColor: rippleColor || groupProps?.rippleColor,
    });

    const realShape = $derived(groupProps?.shape || shape);

    const attributes = $derived(
        getButtonAttributes({
            href,
            disabled: realDisabled,
            hasPopup: hasPopup.value,
            type,
            ...props,
        })
    );

    const realSize = $derived(groupProps?.size || size);

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
            },
        })
    );

    // #endregion: --- Derived
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
        disabled: realRipple.noRipple || realDisabled,
        color: realRipple.rippleColor,
    })}
    {...props}
    {...attributes}
    class={cls}
    {...getActionableEventHandlers({ disabled: realDisabled, ...props })}
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

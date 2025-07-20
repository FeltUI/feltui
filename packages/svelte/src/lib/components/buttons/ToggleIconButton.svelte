<script lang="ts">
    import {
        buttonPropsDefaults,
        getButtonAttributes,
    } from "@feltui/shared/components";
    import { IconButton } from "$lib";
    import type { ButtonToggleIconProps } from "./props";
    import { applyDefaults, createFeltClass } from "@feltui/shared";

    // #region:    --- Props
    let { toggled = $bindable(false), ...props }: ButtonToggleIconProps =
        $props();
    // #endregion: --- Props

    // #region:    --- Derived
    const withDefaults = $derived(applyDefaults(props, buttonPropsDefaults));

    const attributes = $derived(
        getButtonAttributes({ ...withDefaults, toggled })
    );

    const cls = $derived(
        createFeltClass("toggle-button", {
            props,
            classes: ["felt-icon-button"],
        })
    );

    const realShape = $derived.by(() => {
        const toggledShape =
            withDefaults.shape === "rounded" ? "squared" : "rounded";

        return toggled ? toggledShape : withDefaults.shape;
    });
    // #endregion: --- Derived

    // #region:    --- Functions
    function onclick(event: MouseEvent) {
        if (props.disabled) {
            return;
        }

        toggled = !toggled;

        props.onclick?.(
            event as MouseEvent & { currentTarget: HTMLButtonElement }
        );
    }
    // #endregion: --- Functions
</script>

<!--
@component

Toggle icon buttons are a mix of toggle buttons and icon buttons, allowing users to select between two states on an icon-based button.
You can import this component as `ToggleIconButton` or `Buttons.ToggleIcon`.

-->
<IconButton
    {...props}
    {...attributes}
    class={cls}
    shape={realShape}
    {onclick}
/>

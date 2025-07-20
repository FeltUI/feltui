<script lang="ts">
    import {
        buttonPropsDefaults,
        getButtonAttributes,
    } from "@feltui/shared/components";
    import Button from "./Button.svelte";
    import type { ButtonToggleProps } from "./props";
    import { applyDefaults, createFeltClass } from "@feltui/shared";

    // #region:    --- Props
    let { toggled = $bindable(false), ...props }: ButtonToggleProps = $props();
    // #endregion: --- Props

    // #region:    --- Derived
    const withDefaults = $derived(applyDefaults(props, buttonPropsDefaults));

    const attributes = $derived(
        getButtonAttributes({ ...withDefaults, toggled })
    );

    const cls = $derived(createFeltClass("toggle-button", { props }));

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

Toggle buttons allow users to select between two states, such as on/off or active/inactive.
You can import this component as `ToggleButton` or `Buttons.Toggle`.

Unlike the standard button component, it comes with "only" 5 variants, the `text` one being omitted. It also comes with 5 sizes (from `xs` to `xl`) and 2 shapes (`rounded` and `squared`).
It also has a `toggled` prop, which indicates whether the button is toggled on or off. When toggled, the button will switch shape to indicate a change of state.

Of course, this component is fully accessible and supports all the features you would expect from a button, such as `disabled`, `icon`, `ripple`.

-->
<Button {...props} {...attributes} class={cls} shape={realShape} {onclick} />

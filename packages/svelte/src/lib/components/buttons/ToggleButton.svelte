<script lang="ts">
    import {
        applyDefaults,
        buttonSymbols,
        createFeltClass,
    } from "@feltui/shared";
    import {
        buttonPropsDefaults,
        getButtonAttributes,
    } from "@feltui/shared/components";
    import { getContext } from "svelte";
    import Button from "./Button.svelte";
    import type { ButtonGroupPropsCtx } from "./Group.svelte";
    import type { ButtonToggleProps } from "./props";

    // #region:    --- Props
    let { toggled = $bindable(false), ...props }: ButtonToggleProps = $props();
    // #endregion: --- Props

    // #region:    --- Context
    let groupValue = getContext<
        { value: (string | null) | string[] } | undefined
    >(buttonSymbols.groupValue);
    const groupProps = getContext<ButtonGroupPropsCtx | undefined>(
        buttonSymbols.groupProps
    );
    // #endregion: --- Context

    // #region:    --- Derived
    const withDefaults = $derived(applyDefaults(props, buttonPropsDefaults));

    const realDisabled = $derived(
        groupProps?.disabled || withDefaults.disabled
    );

    const attributes = $derived(
        getButtonAttributes({
            ...withDefaults,
            disabled: realDisabled,
            toggled,
        })
    );

    const cls = $derived(createFeltClass("toggle-button", { props }));

    const realShape = $derived.by(() => {
        const shape = groupProps?.shape || withDefaults.shape;
        const toggledShape = shape === "rounded" ? "squared" : "rounded";

        return toggled ? toggledShape : shape;
    });

    const realSize = $derived(groupProps?.size || withDefaults.size);

    const realVariant = $derived(groupProps?.variant || withDefaults.variant);

    const realRipple = $derived({
        noRipple: groupProps?.noRipple || withDefaults.noRipple,
        rippleColor: groupProps?.rippleColor || withDefaults.rippleColor,
    });
    // #endregion: --- Derived

    // #region:    --- Effects
    $effect(() => {
        if (!groupValue) {
            return;
        }

        const name = props.name || props.label;

        const shouldBeToggled = Array.isArray(groupValue.value)
            ? groupValue.value.includes(name)
            : groupValue.value === name;

        if (shouldBeToggled !== toggled) {
            toggled = shouldBeToggled;
        }
    });
    // #endregion: --- Effects

    // #region:    --- Functions
    function onclick(event: MouseEvent) {
        if (props.disabled) {
            return;
        }

        if (
            !groupValue ||
            !groupProps?.requireSelection ||
            (groupProps?.requireSelection && !toggled)
        ) {
            // If the group requires selection and the button is not toggled, or if it doesn't require selection and the button is toggled, we toggle the state.
            toggled = !toggled;
            updateValueContext();
        }

        props.onclick?.(
            event as MouseEvent & { currentTarget: HTMLButtonElement }
        );
    }

    function updateValueContext() {
        if (!groupValue) {
            return;
        }

        if (typeof groupValue.value === "string" || groupValue.value === null) {
            groupValue.value = toggled ? props.name || props.label : null;
        } else if (Array.isArray(groupValue.value)) {
            if (toggled) {
                groupValue.value.push(props.name || props.label);
            } else {
                const index = groupValue.value.indexOf(
                    props.name || props.label
                );
                if (index > -1) {
                    groupValue.value.splice(index, 1);
                }
            }
        }
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
<Button
    {...props}
    {...attributes}
    {...realRipple}
    class={cls}
    name={props.name || props.label}
    shape={realShape}
    {onclick}
    size={realSize}
    variant={realVariant}
/>

<script lang="ts">
    import { IconButton } from "$lib";
    import {
        applyDefaults,
        buttonSymbols,
        createFeltClass,
    } from "@feltui/shared";
    import {
        buttonPropsDefaults,
        getButtonAttributes,
    } from "@feltui/shared/components";
    import { getContext, setContext } from "svelte";
    import type { ButtonGroupPropsCtx } from "./Group.svelte";
    import type { ButtonToggleIconProps } from "./props";

    // #region:    --- Variables
    const id = $props.id();
    const uid = `felt-toggle-icon-button-${id}`;
    // #endregion: --- Variables

    // #region:    --- Props
    let { toggled = $bindable(false), ...props }: ButtonToggleIconProps =
        $props();

    // #endregion: --- Props

    // #region:    --- Context
    let groupValue = getContext<
        { value: (string | null) | string[] } | undefined
    >(buttonSymbols.groupValue);
    const groupProps = getContext<ButtonGroupPropsCtx | undefined>(
        buttonSymbols.groupProps
    );
    setContext(buttonSymbols.groupProps, undefined);
    // #endregion: --- Context

    // #region:    --- Derived
    const withDefaults = $derived(applyDefaults(props, buttonPropsDefaults));

    const name = $derived(
        props.name || (typeof props.icon === "string" && props.icon) || uid
    );

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

    const cls = $derived(
        createFeltClass("toggle-button", {
            props,
            classes: ["felt-icon-button"],
        })
    );

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
            groupValue.value = toggled ? name : null;
        } else if (Array.isArray(groupValue.value)) {
            if (toggled) {
                groupValue.value.push(name);
            } else {
                const index = groupValue.value.indexOf(name);
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

Toggle icon buttons are a mix of toggle buttons and icon buttons, allowing users to select between two states on an icon-based button.
You can import this component as `ToggleIconButton` or `Buttons.ToggleIcon`.

-->
<IconButton
    {...props}
    {...attributes}
    {...realRipple}
    class={cls}
    shape={realShape}
    size={realSize}
    variant={realVariant}
    {onclick}
/>

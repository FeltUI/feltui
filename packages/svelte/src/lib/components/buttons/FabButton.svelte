<script lang="ts">
    import { createFeltClass } from "@feltui/shared";
    import type { ButtonFabProps } from "./props";
    import IconButton from "./IconButton.svelte";

    // #region:    --- Props
    let {
        size = "md",
        color = "primary-container",
        ...props
    }: ButtonFabProps = $props();
    // #endregion: --- Props

    // #region:    --- Derived
    const cls = $derived(
        createFeltClass("fab-button", {
            props,
            bemClasses: { [color]: true, [size]: true },
        })
    );
    // #endregion: --- Derived
</script>

<IconButton {...props} {size} class={cls} />

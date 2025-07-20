<script
    lang="ts"
    generics="Sym extends MaterialSymbol | `img:${string}` = MaterialSymbol"
>
    import type { MaterialSymbol } from "material-symbols";
    import {
        createFeltClass,
        parseColorProp,
        parseSizeProp,
    } from "@feltui/shared";
    import type { IconProps } from "@feltui/shared/components";

    // #region:    --- Props
    let {
        size = "md",
        name,
        type = "outlined",
        filled = false,
        img,
        imgAttributes = {},
        color,
        children,
        ...props
    }: IconProps<Sym> = $props();
    // #endregion: --- Props

    // #region:    --- Derived
    const { class: sizeClass, style: sizeStyle } = $derived(
        parseSizeProp(size)
    );

    const parsedColor = $derived(parseColorProp(color));

    const typeClass = $derived(`felt-icon--${type}`);

    const imageAttributes = $derived({
        alt: "FeltUI Image Icon",
        ...imgAttributes,
    });

    const cls = $derived(
        createFeltClass("icon", {
            props,
            bemClasses: {
                filled,
            },

            classes: [typeClass, sizeClass],
        })
    );
    // #endregion: --- Derived
</script>

<i {...props} class={cls} style:--size={sizeStyle} style:color={parsedColor}>
    {#if name && !name.startsWith("img:")}
        {name}
    {:else if img || name?.startsWith("img:")}
        <img src={img || name?.slice(4)} {...imageAttributes} />
    {:else}
        {@render children?.()}
    {/if}
</i>

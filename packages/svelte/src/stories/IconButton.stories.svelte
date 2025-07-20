<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import { Buttons } from "$lib";

    import "@feltui/shared/css";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Components/Buttons/Icon Button",
        component: Buttons.Icon,
        argTypes: {
            icon: {
                table: {
                    type: { summary: "MaterialSymbol | Snippet" },
                },
            },
        },
        args: {
            icon: "edit",
        },
    });
</script>

<!--
	This is the default variant.
	Tonal buttons are useful for most cases as they have slightly more emphasis than outlined and text buttons but less than elevated and filled ones.

	Tonal buttons use the `secondary` color mapping.
-->
<Story name="Tonal">
    {#snippet template(args)}
        <Buttons.Icon {...args} />
        <Buttons.Icon {...args} shape="squared" />
        <Buttons.Icon {...args} />
        <Buttons.Icon {...args} disabled />
    {/snippet}
</Story>

<!--
	Elevated buttons are basically the same as tonal buttons but with a shadow to give them more elevation.

	As buttons with more elevation typically have more emphasis, they should be used sparingly to avoid overusing shadows.
	Use them only when absolutely necessary, such as when the button requires visual separation from the background or other elements.
-->
<Story name="Elevated">
    {#snippet template(args)}
        <Buttons.Icon {...args} variant="elevated" />
        <Buttons.Icon {...args} variant="elevated" shape="squared" />
        <Buttons.Icon {...args} variant="elevated" />
        <Buttons.Icon {...args} variant="elevated" disabled />
    {/snippet}
</Story>

<!--
	Unelevated buttons use the same styles as elevated buttons but without the shadow.
	They are useful for actions that do not require as much emphasis as elevated buttons but still need the same visual style.
-->
<Story name="Unelevated">
    {#snippet template(args)}
        <Buttons.Icon {...args} unelevated />
        <Buttons.Icon {...args} unelevated shape="squared" />
        <Buttons.Icon {...args} unelevated />
        <Buttons.Icon {...args} unelevated disabled />
    {/snippet}
</Story>

<!--
	Filled buttons are useful for important, final actions that complete a flow and require the most emphasis. For example, for a "Save" or "Submit" action.
	As they have a very strong emphasis, they should be used sparingly, ideally for only one action per page.

	They use the `primary` color mapping.
-->
<Story name="Filled">
    {#snippet template(args)}
        <Buttons.Icon {...args} variant="filled" />
        <Buttons.Icon {...args} variant="filled" shape="squared" />
        <Buttons.Icon {...args} variant="filled" />
        <Buttons.Icon {...args} variant="filled" disabled />
    {/snippet}
</Story>

<!--
	Outlined buttons are useful for actions that require medium emphasis.
	They are typically used for secondary actions or when the action is not as important as the primary action.

	By default, they have a transparent background and a border, which makes them less visually prominent than filled or elevated buttons.
	As such, the should be used on simple backgrounds and avoided on image backgrounds or complex patterns.
	On such backgrounds, you could customize the background color of the button to make it more visible, or use filled/elevated buttons instead.


	They use the `primary` color mapping for the text and ripple effect.
-->
<Story name="Outlined">
    {#snippet template(args)}
        <Buttons.Icon {...args} variant="outlined" />
        <Buttons.Icon {...args} variant="outlined" shape="squared" />
        <Buttons.Icon {...args} variant="outlined" />
        <Buttons.Icon {...args} variant="outlined" disabled />
    {/snippet}
</Story>

<!--
	Text buttons are useful for actions that require the least emphasis, such as "Learn More" or "View Details" (especially when presenting multiple actions).

	By default, they have a transparent background and no border, which makes them blend in with the background until the user interacts with them.
	As such, they are typically used inside cards or snackbars, where the don't distract from nearby content.

	They use the `primary` color mapping for the text and ripple effect.
	If you want to customize the color, make sure to use one that makes the button recognizable from non-button text.
-->
<Story name="Text">
    {#snippet template(args)}
        <Buttons.Icon {...args} variant="text" />
        <Buttons.Icon {...args} variant="text" shape="squared" />
        <Buttons.Icon {...args} variant="text" />
        <Buttons.Icon {...args} variant="text" disabled />
    {/snippet}
</Story>

<!--
	Buttons come in 5 sizes, from `xs` to `xl`.
	They are useful for different contexts, such as small buttons in toolbars or large buttons in forms.
	You can use the `size` prop to change the size of the button.
-->
<Story name="Sizes">
    {#snippet template(args)}
        <Buttons.Icon {...args} size="xs" />
        <Buttons.Icon {...args} size="sm" />
        <Buttons.Icon {...args} size="md" />
        <Buttons.Icon {...args} size="lg" />
        <Buttons.Icon {...args} size="xl" />
    {/snippet}
</Story>

<!--
    Icon buttons come with 3 widths, which can be set using the `width` prop.

    You can use width to further emphasize the visual hierarchy in UI with multiple buttons.
-->
<Story name="Widths">
    {#snippet template(args)}
        <Buttons.Icon {...args} width="narrow" />
        <Buttons.Icon {...args} width="default" />
        <Buttons.Icon {...args} width="wide" />
    {/snippet}
</Story>

<!--
	You can easily change the icon of the button by using the `icon` prop.
	For Material symbols, you can pass the name of the icon as a string.

	You can also pass a custom icon, such as an SVG, by using the `icon` prop as a Svelte snippet.
-->
<Story name="Icon">
    <script>
        import { Buttons } from "$lib";
    </script>

    {#snippet template(args)}
        <Buttons.Icon {...args} />
        <Buttons.Icon icon="star" />
        <Buttons.Icon label="Custom icon" variant="outlined">
            {#snippet icon()}
                <svg
                    version="1.0"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 64 64"
                    enable-background="new 0 0 64 64"
                    xml:space="preserve"
                    fill="#000000"
                >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <path
                                fill="#394240"
                                d="M48,5c-4.418,0-8.418,1.793-11.312,4.688L32,14.344l-4.688-4.656C24.418,6.793,20.418,5,16,5 C7.164,5,0,12.164,0,21c0,4.418,2.852,8.543,5.75,11.438l23.422,23.426c1.562,1.562,4.094,1.562,5.656,0L58.188,32.5 C61.086,29.605,64,25.418,64,21C64,12.164,56.836,5,48,5z M32,47.375L11.375,26.75C9.926,25.305,8,23.211,8,21c0-4.418,3.582-8,8-8 c2.211,0,4.211,0.895,5.656,2.344l7.516,7.484c1.562,1.562,4.094,1.562,5.656,0l7.516-7.484C43.789,13.895,45.789,13,48,13 c4.418,0,8,3.582,8,8c0,2.211-1.926,4.305-3.375,5.75L32,47.375z"
                            />
                            <path
                                fill="#F76D57"
                                d="M32,47.375L11.375,26.75C9.926,25.305,8,23.211,8,21c0-4.418,3.582-8,8-8c2.211,0,4.211,0.895,5.656,2.344 l7.516,7.484c1.562,1.562,4.094,1.562,5.656,0l7.516-7.484C43.789,13.895,45.789,13,48,13c4.418,0,8,3.582,8,8 c0,2.211-1.926,4.305-3.375,5.75L32,47.375z"
                            />
                        </g>
                    </g>
                </svg>
            {/snippet}
        </Buttons.Icon>
    {/snippet}
</Story>

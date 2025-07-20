<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import { Button } from "$lib";

    import "@feltui/shared/css";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Components/Buttons/Standard Button",
        component: Button,
        argTypes: {
            icon: {
                table: {
                    type: { summary: "MaterialSymbol | Snippet" },
                },
            },
        },
        args: {
            label: "Button",
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
        <Button {...args} />
        <Button {...args} shape="squared" />
        <Button {...args} icon="star" />
        <Button {...args} disabled icon="star" />
    {/snippet}
</Story>

<!--
	Elevated buttons are basically the same as tonal buttons but with a shadow to give them more elevation.

	As buttons with more elevation typically have more emphasis, they should be used sparingly to avoid overusing shadows.
	Use them only when absolutely necessary, such as when the button requires visual separation from the background or other elements.
-->
<Story name="Elevated">
    {#snippet template(args)}
        <Button {...args} variant="elevated" />
        <Button {...args} variant="elevated" shape="squared" />
        <Button {...args} variant="elevated" icon="star" />
        <Button {...args} variant="elevated" disabled icon="star" />
    {/snippet}
</Story>

<!--
	Unelevated buttons use the same styles as elevated buttons but without the shadow.
	They are useful for actions that do not require as much emphasis as elevated buttons but still need the same visual style.
-->
<Story name="Unelevated">
    {#snippet template(args)}
        <Button {...args} unelevated />
        <Button {...args} unelevated shape="squared" />
        <Button {...args} unelevated icon="star" />
        <Button {...args} unelevated disabled icon="star" />
    {/snippet}
</Story>

<!--
	Filled buttons are useful for important, final actions that complete a flow and require the most emphasis. For example, for a "Save" or "Submit" action.
	As they have a very strong emphasis, they should be used sparingly, ideally for only one action per page.

	They use the `primary` color mapping.
-->
<Story name="Filled">
    {#snippet template(args)}
        <Button {...args} variant="filled" />
        <Button {...args} variant="filled" shape="squared" />
        <Button {...args} variant="filled" icon="star" />
        <Button {...args} variant="filled" disabled icon="star" />
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
        <Button {...args} variant="outlined" />
        <Button {...args} variant="outlined" shape="squared" />
        <Button {...args} variant="outlined" icon="star" />
        <Button {...args} variant="outlined" disabled icon="star" />
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
        <Button {...args} variant="text" />
        <Button {...args} variant="text" shape="squared" />
        <Button {...args} variant="text" icon="star" />
        <Button {...args} variant="text" disabled icon="star" />
    {/snippet}
</Story>

<!--
	Buttons come in 5 sizes, from `xs` to `xl`.
	They are useful for different contexts, such as small buttons in toolbars or large buttons in forms.
	You can use the `size` prop to change the size of the button.
-->
<Story name="Sizes">
    {#snippet template(args)}
        <Button {...args} size="xs" />
        <Button {...args} size="sm" />
        <Button {...args} size="md" />
        <Button {...args} size="lg" />
        <Button {...args} size="xl" />
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
        <Button {...args} icon="star" />
        <Button label="Edit" icon="edit" />
        <Button label="Custom icon" variant="outlined">
            {#snippet icon()}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                >
                    <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                    <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    />
                    <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    />
                    <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    />
                </svg>
            {/snippet}
        </Button>
    {/snippet}
</Story>

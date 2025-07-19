<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Button } from "$lib";

	import "@feltui/shared/css";

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: "Components/Buttons/Standard Button",
		component: Button,
		tags: ["autodocs"],
		parameters: {
			layout: "centered",
		},
		argTypes: {
			icon: {
				table: {
					type: { summary: "MaterialSymbol | Snippet" },
				},
			},
			target: {
				if: {
					arg: "href",
					neq: undefined,
				},
			},
		},
		args: {
			label: "Button",
		},
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->

<Story name="Elevated">
	{#snippet template(args)}
		<Button {...args} />
		<Button {...args} shape="squared" />
		<Button {...args} icon="star" />
		<Button {...args} disabled icon="star" />
	{/snippet}
</Story>

<Story name="Unelevated">
	{#snippet template(args)}
		<Button {...args} unelevated />
		<Button {...args} unelevated shape="squared" />
		<Button {...args} unelevated icon="star" />
		<Button {...args} unelevated disabled icon="star" />
	{/snippet}
</Story>

<Story name="Filled">
	{#snippet template(args)}
		<Button {...args} variant="filled" />
		<Button {...args} variant="filled" shape="squared" />
		<Button {...args} variant="filled" icon="star" />
		<Button {...args} variant="filled" disabled icon="star" />
	{/snippet}
</Story>

<Story name="Tonal">
	{#snippet template(args)}
		<Button {...args} variant="tonal" />
		<Button {...args} variant="tonal" shape="squared" />
		<Button {...args} variant="tonal" icon="star" />
		<Button {...args} variant="tonal" disabled icon="star" />
	{/snippet}
</Story>

<Story name="Outlined">
	{#snippet template(args)}
		<Button {...args} variant="outlined" />
		<Button {...args} variant="outlined" shape="squared" />
		<Button {...args} variant="outlined" icon="star" />
		<Button {...args} variant="outlined" disabled icon="star" />
	{/snippet}
</Story>

<Story name="Text">
	{#snippet template(args)}
		<Button {...args} variant="text" />
		<Button {...args} variant="text" shape="squared" />
		<Button {...args} variant="text" icon="star" />
		<Button {...args} variant="text" disabled icon="star" />
	{/snippet}
</Story>

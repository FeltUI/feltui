<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Buttons } from "$lib";

	import "@feltui/shared/css";

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: "Components/Buttons/Icon Button",
		component: Buttons.Icon,
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
		},
		args: {
			icon: "edit",
		},
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->

<Story name="Elevated">
	{#snippet template(args)}
		<Buttons.Icon {...args} />
		<Buttons.Icon {...args} shape="squared" />
		<Buttons.Icon {...args} />
		<Buttons.Icon {...args} disabled />
	{/snippet}
</Story>

<Story name="Unelevated">
	{#snippet template(args)}
		<Buttons.Icon {...args} unelevated />
		<Buttons.Icon {...args} unelevated shape="squared" />
		<Buttons.Icon {...args} unelevated />
		<Buttons.Icon {...args} unelevated disabled />
	{/snippet}
</Story>

<Story name="Filled">
	{#snippet template(args)}
		<Buttons.Icon {...args} variant="filled" />
		<Buttons.Icon {...args} variant="filled" shape="squared" />
		<Buttons.Icon {...args} variant="filled" />
		<Buttons.Icon {...args} variant="filled" disabled />
	{/snippet}
</Story>

<Story name="Tonal">
	{#snippet template(args)}
		<Buttons.Icon {...args} variant="tonal" />
		<Buttons.Icon {...args} variant="tonal" shape="squared" />
		<Buttons.Icon {...args} variant="tonal" />
		<Buttons.Icon {...args} variant="tonal" disabled />
	{/snippet}
</Story>

<Story name="Outlined">
	{#snippet template(args)}
		<Buttons.Icon {...args} variant="outlined" />
		<Buttons.Icon {...args} variant="outlined" shape="squared" />
		<Buttons.Icon {...args} variant="outlined" />
		<Buttons.Icon {...args} variant="outlined" disabled />
	{/snippet}
</Story>

<Story name="Text">
	{#snippet template(args)}
		<Buttons.Icon {...args} variant="text" />
		<Buttons.Icon {...args} variant="text" shape="squared" />
		<Buttons.Icon {...args} variant="text" />
		<Buttons.Icon {...args} variant="text" disabled />
	{/snippet}
</Story>

<Story name="Sizes">
	{#snippet template(args)}
		<Buttons.Icon {...args} size="xs" />
		<Buttons.Icon {...args} size="sm" />
		<Buttons.Icon {...args} size="md" />
		<Buttons.Icon {...args} size="lg" />
		<Buttons.Icon {...args} size="xl" />
	{/snippet}
</Story>

<Story name="Widths">
	{#snippet template(args)}
		<Buttons.Icon {...args} width="narrow" />
		<Buttons.Icon {...args} width="default" />
		<Buttons.Icon {...args} width="wide" />
	{/snippet}
</Story>

import type { Preview } from "@storybook/sveltekit";

const preview: Preview = {
	tags: ["autodocs"],
	parameters: {
		layout: "centered",

		docs: {
			toc: {
				contentsSelector: ".sbdocs-content",
				headingSelector: "h3",
				title: "Table of Contents",
				unsafeTocbotOptions: {
					hasInnerContainers: true,
				},
			},
		},

		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},

		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: "todo",
		},
	},
};

export default preview;

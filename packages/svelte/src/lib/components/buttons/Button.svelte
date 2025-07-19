<script lang="ts" generics="Link extends Href = undefined">
	import { getButtonAttributes } from "@feltui/shared/components";
	import type { ButtonProps } from "./props";
	import { Context, ripple, Icon } from "$lib";
	import {
		buttonSymbols,
		createFeltClass,
		getActionableEventHandlers,
		type Href,
	} from "@feltui/shared";

	// #region:    --- Props
	let {
		disabled = false,
		href,
		label,
		size = "md",
		variant = "elevated",
		icon,
		rippleColor,
		target,
		text = false,
		to,
		tonal = false,
		unelevated = false,
		outlined = false,
		shape = "rounded",
		filled = false,
		noRipple = false,
		type,
		children,
		...props
	}: ButtonProps<Link> = $props();
	// #endregion: --- Props

	// #region:    --- Context
	const hasPopup = new Context(buttonSymbols.hasPopup, false);
	// #endregion: --- Context

	// #region:    --- $derived
	const realVariant = $derived.by(() => {
		if (variant !== "elevated") {
			return variant;
		}

		switch (true) {
			case tonal:
				return "tonal";
			case unelevated:
				return "unelevated";
			case outlined:
				return "outlined";
			case text:
				return "text";
			case filled:
				return "filled";
			default:
				return "elevated";
		}
	});

	const attributes = $derived(
		getButtonAttributes({
			href,
			disabled,
			hasPopup: hasPopup.value,
			type,
		})
	);

	const iconSize = $derived(
		size === "xs" || size === "sm"
			? "1.25rem"
			: size === "md"
				? "1.5rem"
				: size === "lg"
					? "2rem"
					: "2.5rem"
	);

	const cls = $derived(
		createFeltClass("button", {
			props,
			bemClasses: {
				realVariant,
				shape,
				size,
			},
		})
	);
	// #endregion: --- $derived
</script>

<button
	{@attach ripple({
		disabled: noRipple || disabled,
		color: rippleColor,
	})}
	{...attributes}
	class={cls}
	{...props}
	{...getActionableEventHandlers({ disabled, ...props })}
>
	{#if icon && typeof icon === "string"}
		<Icon name={icon} size={iconSize} />
	{:else}
		{@render icon?.()}
	{/if}

	<span class="felt-button__label">
		{label}
	</span>
</button>

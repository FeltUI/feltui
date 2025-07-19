<script
	lang="ts"
	generics="Href extends HTMLAnchorElement['href'] | undefined = undefined"
>
	import { getButtonAttributes } from "@feltui/shared/components";
	import type { ButtonProps } from "./props";
	import { Context } from "$lib";
	import { buttonSymbols } from "@feltui/shared";

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
		shape = "round",
		filled = false,
		noRipple = false,
		type,
		children,
		...props
	}: ButtonProps<Href> = $props();
	// #endregion: --- Props

	// #region:    --- Context
	const hasPopup = new Context(buttonSymbols.hasPopup, false);
	// #endregion: --- Context

	// #region:    --- $derived
	const attrs = $derived(
		getButtonAttributes({
			href,
			disabled,
			hasPopup: hasPopup.value,
			type,
		}),
	);
	// #endregion: --- $derived
</script>

<button {...attrs}> </button>

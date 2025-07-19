export function isElementDisabled<El extends Element>(element: El): boolean {
	return (
		element.hasAttribute("disabled") ||
		element.getAttribute("aria-disabled") === "true"
	);
}

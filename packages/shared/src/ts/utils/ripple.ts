import type { Attachment } from "svelte/attachments";
import { on } from "svelte/events";
import { isActionKey } from "./events";

interface RippleOptions {
	center?: boolean;
	color?: string; // CSS color
	duration?: number; // In ms
	disabled?: boolean; // Should the ripple be disabled
}

type TriggerEvent = PointerEvent | MouseEvent | TouchEvent;

const triggerEvents = ["pointerdown", "touchstart", "keydown"] as const;
const cancelEvents = [
	"mouseleave",
	"dragleave",
	"touchmove",
	"touchcancel",
	"pointerup",
	"keyup",
];

function listen(
	framework: "svelte" | "vue",
	node: HTMLElement,
	event: string,
	handler: (event: Event) => void
) {
	if (framework === "svelte") {
		return on(node, event, handler, {
			passive: event.startsWith("touch"),
		});
	} else {
		node.addEventListener(event, handler, {
			passive: event.startsWith("touch"),
		});
		return () => node.removeEventListener(event, handler);
	}
}

export function rippleSvelte(options: RippleOptions): Attachment<HTMLElement> {
	return (node) => {
		if (isDisabled(node, options)) {
			node.querySelector(".felt-ripple__container")?.remove();

			return;
		}

		const rippleContainer = createRippleContainer(node, options);

		const framework = "svelte";

		triggerEvents.map((event) => {
			listen(framework, node, event, (e) => {
				createRipple(
					framework,
					node,
					rippleContainer,
					e as TriggerEvent,
					options
				);
			});
		});
	};
}

function isDisabled(node: HTMLElement, options: RippleOptions): boolean {
	return (
		options.disabled ||
		node.hasAttribute("disabled") ||
		node.hasAttribute("aria-disabled")
	);
}

function createRippleContainer(node: HTMLElement, options: RippleOptions) {
	const rippleContainer = document.createElement("span");
	setOptions(rippleContainer, options);

	rippleContainer.classList.add("felt-ripple__container");

	return node.appendChild(rippleContainer);
}

function setOptions(rippleContainer: HTMLElement, options: RippleOptions) {
	options.duration = Math.max(options.duration ?? 300, 0);

	if (options.color) {
		rippleContainer.style.setProperty("--ripple-color", options.color);
	}

	if (options.duration) {
		rippleContainer.style.setProperty(
			"--ripple-duration",
			`${options.duration}ms`
		);
	}
}

function createRipple(
	framework: "svelte" | "vue",
	node: HTMLElement,
	rippleContainer: HTMLElement,
	e: PointerEvent | MouseEvent | TouchEvent,
	options: RippleOptions,
	center?: boolean
) {
	if (handleKeyboardRipple(framework, node, rippleContainer, e, options)) {
		return;
	}

	const isCentered = center ?? options.center;
	if (isCentered) {
		rippleContainer.classList.add("felt-ripple--centered");
	} else {
		rippleContainer.classList.remove("felt-ripple--centered");
	}

	const ripple = document.createElement("span");

	createRippleEffect(framework, node, rippleContainer, ripple, e, options);
}

function handleKeyboardRipple(
	framework: "svelte" | "vue",
	node: HTMLElement,
	rippleContainer: HTMLElement,
	e: PointerEvent | MouseEvent | TouchEvent,
	options: RippleOptions
) {
	if (!(e instanceof KeyboardEvent)) {
		return false;
	}

	if (!isActionKey(e) || e.repeat) {
		return true;
	}

	e.preventDefault();
	const click = new PointerEvent("pointerdown");

	createRipple(framework, node, rippleContainer, click, options, true);

	return true;
}

function getRectAndEventPosition(
	node: HTMLElement,
	e: PointerEvent | MouseEvent | TouchEvent
) {
	const rect = node.getBoundingClientRect();

	const clientX =
		window.TouchEvent && e instanceof TouchEvent
			? e.touches[0]?.clientX || 0
			: (e as PointerEvent).clientX;

	const clientY =
		window.TouchEvent && e instanceof TouchEvent
			? e.touches[0]?.clientY || 0
			: (e as PointerEvent).clientY;

	return { rect, clientX, clientY };
}

function calculateRipplePosition(
	pos: ReturnType<typeof getRectAndEventPosition>,
	node: HTMLElement
) {
	const { rect, clientX, clientY } = pos;

	const x = clientX - rect.left > node.offsetWidth / 2 ? 0 : node.offsetWidth;
	const y =
		clientY - rect.top > node.offsetHeight / 2 ? 0 : node.offsetHeight;

	const radius = Math.hypot(
		x - (clientX - rect.left),
		y - (clientY - rect.top)
	);

	return {
		left: clientX - rect.left - radius,
		top: clientY - rect.top - radius,
		width: radius * 2,
		height: radius * 2,
	};
}

function createRippleEffect(
	framework: "svelte" | "vue",
	node: HTMLElement,
	container: HTMLSpanElement,
	ripple: HTMLSpanElement,
	e: PointerEvent | MouseEvent | TouchEvent,
	options: RippleOptions
) {
	const pos = getRectAndEventPosition(node, e);
	const { left, top, width, height } = calculateRipplePosition(pos, node);

	ripple.classList.add("felt-ripple");

	Object.assign(ripple.style, {
		left: `${left}px`,
		top: `${top}px`,
		width: `${width}px`,
		height: `${height}px`,
	});

	container.appendChild(ripple);

	const cancelEventsListeners = cancelEvents.map((event) =>
		listen(framework, node, event, () => {
			handleCancelEvents(ripple, options, cancelEventsListeners);
		})
	);
}

function handleCancelEvents(
	ripple: HTMLSpanElement | null,
	options: RippleOptions,
	listeners: (() => void)[] = []
) {
	if (ripple === null) {
		return;
	}

	ripple.style.opacity = "0";

	setTimeout(() => {
		ripple.remove();
	}, options.duration);

	listeners.forEach((cleanup) => cleanup());
}

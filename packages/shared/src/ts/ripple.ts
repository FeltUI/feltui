import type { Attachment } from "svelte/attachments";
import { isElementDisabled } from "./dom";
import { on } from "svelte/events";

interface RippleOptions {
	center?: boolean;
	color?: string; // CSS color
	duration?: number; // In ms
	disabled?: boolean; // Should the ripple be disabled
}

type Unlistener = ReturnType<typeof on>;

// Constants
const TRIGGER_EVENTS = ["pointerdown", "touchstart", "keydown"] as const;
const CANCEL_EVENTS = [
	"mouseleave",
	"dragleave",
	"touchmove",
	"touchcancel",
	"pointerup",
	"keyup",
] as const;

const RIPPLE_CLASS = "felt-ripple";
const CENTER_RIPPLE_CLASS = "felt-ripple--centered";

const CSS_VARS = {
	COLOR: "--ripple-color",
	DURATION: "--ripple-duration",
} as const;

const DEFAULTS = {
	DURATION: 1000,
	KEYBOARD_KEYS: ["Enter", "Space"],
};

interface RippleCoordinates {
	x: number;
	y: number;
	radius: number;
}

interface CreateRippleParams {
	event: PointerEvent | KeyboardEvent | TouchEvent;
	node: HTMLElement;
	rippleContainer: HTMLElement;
	options: RippleOptions;
	center?: boolean;
	onCancel: (
		node: HTMLElement,
		eventName: string,
		ripple?: HTMLSpanElement | null
	) => void;
}

/**
 * Creates a ripple effect attachment for Svelte components.
 *
 * @param options Ripple options to customize the behavior and appearance of the ripple effect.
 * @returns A Svelte attachment for the ripple effect.
 */
export function rippleSvelte(options: RippleOptions = {}): Attachment {
	const rippleContainer = createRippleContainer(options);
	const eventListeners = createEventListenerTrackers();

	return (node) => {
		if (!isValidNode(node)) return;

		setupRippleContainer(node, rippleContainer, options);
		attachTriggerEvents(node, rippleContainer, options, eventListeners);

		return () =>
			cleanupEventListeners(eventListeners, node, rippleContainer);
	};
}

function createRippleContainer(options: RippleOptions): HTMLSpanElement {
	const container = document.createElement("span");
	applyRippleClasses(container, options);
	return container;
}

function createEventListenerTrackers() {
	return {
		trigger: [] as Unlistener[],
		cancel: [] as Unlistener[],
	};
}

function isValidNode(node: unknown): node is HTMLElement {
	return node instanceof HTMLElement;
}

function setupRippleContainer(
	node: HTMLElement,
	container: HTMLElement,
	options: RippleOptions
): void {
	const shouldDisable =
		options.disabled ||
		node.hasAttribute("aria-disabled") ||
		node.hasAttribute("disabled");

	if (shouldDisable) {
		container.remove();
		return;
	}

	node.appendChild(container);
	applyRippleStyles(container, options);
}

function attachTriggerEvents(
	node: HTMLElement,
	rippleContainer: HTMLElement,
	options: RippleOptions,
	eventListeners: ReturnType<typeof createEventListenerTrackers>
): void {
	TRIGGER_EVENTS.forEach((eventName) => {
		const listener = on(
			node,
			eventName,
			(event) =>
				handleRippleCreation({
					event,
					node,
					rippleContainer,
					options,
					onCancel: createCancelHandler(options.duration),
				}),
			{ passive: eventName === "touchstart" }
		);
		eventListeners.trigger.push(listener);
	});
}

function createCancelHandler(duration = DEFAULTS.DURATION) {
	return (
		node: HTMLElement,
		eventName: string,
		ripple: HTMLSpanElement | null = null
	) => {
		if (!ripple) return;

		ripple.style.opacity = "0";
		setTimeout(() => ripple.remove(), duration);

		const unlisten = on(node, eventName, () => {}, { passive: true });
		return unlisten;
	};
}

function cleanupEventListeners(
	eventListeners: ReturnType<typeof createEventListenerTrackers>,
	node: HTMLElement,
	rippleContainer: HTMLElement
): void {
	[...eventListeners.trigger, ...eventListeners.cancel].forEach((unlisten) =>
		unlisten()
	);
	eventListeners.trigger.length = 0;
	eventListeners.cancel.length = 0;

	if (rippleContainer.parentNode === node) {
		rippleContainer.remove();
	}
}

function handleRippleCreation(params: CreateRippleParams): void {
	const { event, node, options } = params;

	if (options.disabled || isElementDisabled(node)) return;

	if (isKeyboardEvent(event)) {
		handleKeyboardRipple(params);
		return;
	}

	createVisualRipple(params);
}

function isKeyboardEvent(event: Event): event is KeyboardEvent {
	return event instanceof KeyboardEvent;
}

function handleKeyboardRipple(params: CreateRippleParams): void {
	const { event } = params;
	const keyEvent = event as KeyboardEvent;

	if (!DEFAULTS.KEYBOARD_KEYS.includes(keyEvent.key) || keyEvent.repeat)
		return;

	keyEvent.preventDefault();
	const syntheticPointerEvent = new PointerEvent("pointerdown");

	createVisualRipple({
		...params,
		event: syntheticPointerEvent,
		center: true,
	});
}

function createVisualRipple({
	event,
	node,
	rippleContainer,
	options,
	center,
	onCancel,
}: CreateRippleParams): void {
	applyRippleClasses(node, options, center);

	const coordinates = calculateRippleCoordinates(
		event,
		node,
		center || options.center
	);
	const rippleElement = createRippleElement(coordinates);

	rippleContainer.appendChild(rippleElement);
	attachCancelEvents(node, rippleElement, onCancel);
}

function calculateRippleCoordinates(
	event: PointerEvent | KeyboardEvent | TouchEvent,
	node: HTMLElement,
	isCentered = false
): RippleCoordinates {
	const rect = node.getBoundingClientRect();

	if (isCentered) {
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const radius = Math.max(centerX, centerY);

		return {
			x: centerX - radius,
			y: centerY - radius,
			radius: radius * 2,
		};
	}

	const { clientX, clientY } = extractEventCoordinates(event);

	const relativeX = clientX - rect.left;
	const relativeY = clientY - rect.top;

	const distanceToEdgeX = relativeX > node.offsetWidth / 2 ? 0 : rect.width;
	const distanceToEdgeY = relativeY > node.offsetHeight / 2 ? 0 : rect.height;

	const radius = Math.hypot(
		distanceToEdgeX - relativeX,
		distanceToEdgeY - relativeY
	);

	return {
		x: relativeX - radius,
		y: relativeY - radius,
		radius: radius * 2,
	};
}

function extractEventCoordinates(
	event: PointerEvent | KeyboardEvent | TouchEvent
) {
	if (window.TouchEvent && event instanceof TouchEvent) {
		return {
			clientX: event.touches[0]?.clientX || 0,
			clientY: event.touches[0]?.clientY || 0,
		};
	}

	const pointerEvent = event as PointerEvent;
	return pointerEvent;
}

function createRippleElement(coordinates: RippleCoordinates): HTMLSpanElement {
	const ripple = document.createElement("span");
	ripple.classList.add(RIPPLE_CLASS);

	Object.assign(ripple.style, {
		left: `${coordinates.x}px`,
		top: `${coordinates.y}px`,
		width: `${coordinates.radius}px`,
		height: `${coordinates.radius}px`,
	});

	return ripple;
}

function attachCancelEvents(
	node: HTMLElement,
	rippleElement: HTMLSpanElement,
	onCancel: CreateRippleParams["onCancel"]
): void {
	CANCEL_EVENTS.forEach((eventName) => {
		onCancel(node, eventName, rippleElement);
	});
}

function applyRippleClasses<El extends Element>(
	container: El,
	options: RippleOptions,
	center?: boolean
): void {
	const shouldBeCentered = center || options.center;

	container.classList.add(RIPPLE_CLASS);
	container.classList.toggle(CENTER_RIPPLE_CLASS, shouldBeCentered);
}

function applyRippleStyles(
	container: HTMLElement,
	options: RippleOptions
): void {
	const validDuration =
		options.duration && options.duration > 0 ? options.duration : undefined;

	if (options.color) {
		container.style.setProperty(CSS_VARS.COLOR, options.color);
	}

	if (validDuration) {
		container.style.setProperty(CSS_VARS.DURATION, `${validDuration}ms`);
	}
}

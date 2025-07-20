import type { HTMLAttributes } from "svelte/elements";
import type { ClickableComponent } from "./props";

export type TargetEvent<T extends HTMLElement, E extends Event> = E & {
    currentTarget: EventTarget & T;
};

export function isActionKey(event: KeyboardEvent): boolean {
    return event.code === "Enter" || event.code === "Space";
}

export function getActionableEventHandlers<El extends HTMLElement>(
    props: ClickableComponent & HTMLAttributes<El>,
    onaction?: (event: Event) => void
) {
    if (props.disabled) {
        return {
            onclick: undefined,
            onkeydown: undefined,
        };
    }

    function handleKeyboardEvent(event: KeyboardEvent) {
        if (!isActionKey(event)) {
            return props.onkeydown?.(event as TargetEvent<El, KeyboardEvent>);
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const clickEvent = new PointerEvent("pointerdown", {
            relatedTarget: event.target,
            bubbles: event.bubbles,
            cancelable: event.cancelable,
        });

        handleClickEvent(clickEvent);
        return;
    }

    function handleClickEvent(event: MouseEvent) {
        onaction?.(event);

        return props.onclick?.(event as TargetEvent<El, MouseEvent>);
    }

    return {
        onclick: handleClickEvent,
        onkeydown: handleKeyboardEvent,
    };
}

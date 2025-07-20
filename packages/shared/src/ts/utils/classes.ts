import type { ClassValue, HTMLAttributes } from "svelte/elements";

type FeltClassesParams = {
    bemClasses?: Record<string, boolean | string>;
    classes?: (string | undefined | null)[];
    subElement?: string;
    props?: Record<string | number | symbol, unknown> & {
        class?: HTMLAttributes<HTMLElement>["class"];
    };
};

export function createFeltClass(component: string, input: FeltClassesParams) {
    let PREFIX = `felt-${component}`;
    const {
        bemClasses,
        classes,
        subElement,
        props: { class: customClass = "" } = {},
    } = input;

    PREFIX += subElement ? `__${subElement}` : "";

    const classList: ClassValue = [PREFIX];

    classList.push(
        ...Object.entries(bemClasses || {})
            .filter(([, value]) => value)
            .map(([key, value]) =>
                typeof value === "string"
                    ? `${PREFIX}--${value}`
                    : `${PREFIX}--${key}`
            ),
        classes,
        customClass
    );

    return classList;
}

import Button from "./Button.svelte";
import IconButton from "./IconButton.svelte";

export { Button, IconButton };

/**
 * Buttons prompt most actions in a UI. There are a wide variety of buttons, each with different purposes.
 * In this sense, you should consider the level of emphasis each button type provides when choosing the right one for your use case.
 *
 * Here are the different button types available in FeltUI:
 * - `Buttons.Standard`: The most common button type, used for primary actions.
 * - `Buttons.Icon`: A button that uses an icon to represent an action, typically used for minor actions or when space is limited.
 */
export const Buttons = {
    /**
     * Buttons prompt most actions in a UI.
     * You can import this component as `Button` or `Buttons.Standard`.
     *
     * This component comes with 6 variants, each different styles and purposes. It also comes with 5 sizes (from `xs` to `xl`) and 2 shapes (`rounded` and `squared`).
     *
     * Of course, this component is fully accessible and supports all the features you would expect from a button, such as `disabled`, `icon`, `ripple`.
     */
    Standard: Button,
    /**
     * Icon buttons help people perform minor actions quickly and easily.
     * You can import this component as `IconButton` or `Buttons.Icon`.
     *
     * Like the standard button component, it comes with 6 variants, each having different styles and purposes. It also comes with 5 sizes (from `xs` to `xl`) and 2 shapes (`rounded` and `squared`).
     * A difference is that this component also has a `width` prop, which can be set to `narrow`, or `wide` to change the appearance of the button.
     *
     * Of course, this component is fully accessible and supports all the features you would expect from a button, such as `disabled`, `icon`, `ripple`.
     */
    Icon: IconButton,
};

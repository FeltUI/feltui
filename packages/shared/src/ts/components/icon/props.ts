import type { HTMLAttributes, HTMLImgAttributes } from "svelte/elements";
import type { MaterialSymbol } from "material-symbols";
import type { CssValue, SizeProp } from "@feltui/shared";

export type IconTypeOptions = "outlined" | "sharp" | "rounded";

export interface IconProps<
    Sym extends MaterialSymbol | `img:${string}` = MaterialSymbol,
> extends HTMLAttributes<HTMLElement> {
    /**
     * The size of the icon. Can be specified with CSS units. If no unit is specified, "px" will be used.
     * @default md
     */
    size?: SizeProp | CssValue | number;

    /**
     * The type of the icon.
     * @default outlined
     */
    type?: IconTypeOptions;

    /**
     * The name of the Material Symbols icon.
     * @default undefined
     */
    name?: Sym;

    /**
     * Determines whether the icon should be filled.
     * @default false
     */
    filled?: boolean;

    /**
     * The image source for the icon.
     * @default undefined
     */
    img?: Sym extends undefined ? string : never;

    /**
     * Additional attributes for the image element when using the `img` prop, as for example the "alt" attribute.
     * @default {}
     */
    imgAttributes?: HTMLImgAttributes;

    /**
     * The color of the icon.
     * @default undefined
     */
    color?: string;
}

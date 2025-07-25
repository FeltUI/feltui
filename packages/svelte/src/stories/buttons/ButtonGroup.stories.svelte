<script module>
    import { defineMeta } from "@storybook/addon-svelte-csf";
    import { Buttons } from "$lib";

    import "@feltui/shared/css";

    // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
    const { Story } = defineMeta({
        title: "Components/Buttons/Button Group",
        component: Buttons.Group,
        argTypes: {
            icon: {
                table: {
                    type: { summary: "MaterialSymbol | Snippet" },
                },
            },
        },
        args: {
            text: {
                label: "Button",
            },
            icon: {
                icon: "star",
            },
        },
    });

    let displayValue = $state("button2");
    let multipleValue = $state(["button1", "button3"]);
</script>

<!--
    Button groups are a way to group multiple buttons together, allowing users to select one or more options from a set of buttons.
    You can use them as a single selection control (like radio buttons) or as a multi-selection control (like checkboxes).
    They are useful for actions that are related to each other, such as filtering options or selecting a category.
-->
<Story name="What are Button Groups?">
    {#snippet template(args)}
        <div class="group">
            <Buttons.Group bind:value={displayValue}>
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group bind:value={displayValue}>
                <Buttons.ToggleIcon name="button1" {...args.icon} />
                <Buttons.ToggleIcon name="button2" {...args.icon} />
                <Buttons.ToggleIcon name="button3" {...args.icon} />
                <Buttons.ToggleIcon
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
        <div class="group">
            Selected value: {displayValue || "None"}
        </div>
    {/snippet}
</Story>

<!--
    Of course, you are not limited to just toggle buttons in a group, even though they are the most common use case.
-->
<Story name="Non-Toggle Buttons in a Group">
    {#snippet template()}
        <div class="group">
            <Buttons.Group>
                <Buttons.Icon icon="fast_rewind" width="wide" />
                <Buttons.Standard label="Play" icon="play_arrow" />
                <Buttons.Icon icon="fast_forward" width="wide" />
            </Buttons.Group>
        </div>
    {/snippet}
</Story>

<!--
    You can use the `multiple` prop to allow multiple selections in the group.
    When `multiple` is set to true, the group will allow multiple buttons to be selected at the same time. Thus, the `value` prop will be an array of selected button names.
-->
<Story name="Multiple Selection">
    {#snippet template(args)}
        <div class="group">
            <Buttons.Group bind:value={multipleValue} multiple>
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
        <div class="group">
            Selected values: {multipleValue.join(", ") || "None"}
        </div>
    {/snippet}
</Story>

<!--
    Sometimes, you may want to require that at least one button is selected in the group.
    You can do this by using the `requireSelection` prop.
    This is useful when you want the buttons to behave like radio buttons, where at least one option must be selected.
-->
<Story name="Require Selection">
    {#snippet template(args)}
        <div class="group">
            <Buttons.Group value="button1" requireSelection>
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
    {/snippet}
</Story>

<!--
    Use variants as you would with a single button.
    The group will apply the variant to all buttons inside it.
-->
<Story name="Variants">
    {#snippet template(args)}
        <div class="group">
            <Buttons.Group value="button2">
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    {...args.icon}
                />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group value="button2" variant="elevated">
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    {...args.icon}
                />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group value="button2" variant="unelevated">
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    {...args.icon}
                />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group value="button2" variant="filled">
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    {...args.icon}
                />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group value="button2" variant="outlined">
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    {...args.icon}
                />
            </Buttons.Group>
        </div>
    {/snippet}
</Story>

<!--
	As with variants, you can use sizes as you would with a single button.
    The group will apply the size to all buttons inside it.
-->
<Story name="Sizes">
    {#snippet template(args)}
        <div class="group">
            <Buttons.Group size="xs" shape="squared">
                <Buttons.ToggleIcon name="button1" icon="bluetooth" />
                <Buttons.ToggleIcon name="button2" icon="alarm" />
                <Buttons.ToggleIcon name="button3" icon="link_off" />
                <Buttons.ToggleIcon name="button4" icon="wifi" />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group size="xs">
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group size="sm">
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group size="lg" shape="squared">
                <Buttons.ToggleIcon name="button2" icon="alarm" />
                <Buttons.ToggleIcon
                    name="button3"
                    icon="link_off"
                    width="narrow"
                />
                <Buttons.ToggleIcon name="button4" icon="wifi" width="wide" />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group size="lg">
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
    {/snippet}
</Story>

<!--
    The `connected` prop allows you to create a group of buttons that are visually connected, like a toolbar.
    This is useful for actions that are related to each other and should be presented as a single unit.
-->
<Story name="Connected Buttons">
    {#snippet template(args)}
        <div class="group">
            <Buttons.Group connected>
                <Buttons.Toggle {...args.text} name="button1" {...args.icon} />
                <Buttons.Toggle {...args.text} name="button2" {...args.icon} />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle name="button4" disabled {...args.icon} />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group connected multiple>
                <Buttons.ToggleIcon name="bold" icon="format_bold" />
                <Buttons.ToggleIcon name="italic" icon="format_italic" />
                <Buttons.ToggleIcon name="underline" icon="format_underlined" />
            </Buttons.Group>
            <Buttons.Group connected value="left" requireSelection>
                <Buttons.ToggleIcon name="left" icon="format_align_left" />
                <Buttons.ToggleIcon name="center" icon="format_align_center" />
                <Buttons.ToggleIcon name="right" icon="format_align_right" />
            </Buttons.Group>
        </div>
    {/snippet}
</Story>

<!--
    Setting the props `disabled`, `noRipple`, and `rippleColor` on the group will apply them to all buttons inside it.
    This is useful for disabling all buttons in the group or changing the ripple effect behavior without having to set them on each button individually.
-->
<Story name="Group Props">
    {#snippet template(args)}
        <div class="group">
            <Buttons.Group value="button2" disabled>
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group value="button2" noRipple>
                <Buttons.Toggle {...args.text} name="button1" />
                <Buttons.Toggle {...args.text} name="button2" />
                <Buttons.Toggle {...args.text} name="button3" {...args.icon} />
                <Buttons.Toggle
                    {...args.text}
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
        <div class="group">
            <Buttons.Group value="button2" variant="outlined" rippleColor="red">
                <Buttons.Standard {...args.text} name="button1" />
                <Buttons.Standard {...args.text} name="button2" />
                <Buttons.Standard
                    {...args.text}
                    name="button3"
                    {...args.icon}
                />
                <Buttons.Standard
                    {...args.text}
                    name="button4"
                    disabled
                    icon="do_not_touch"
                />
            </Buttons.Group>
        </div>
    {/snippet}
</Story>

<style>
    .group {
        display: flex;
        align-items: center;
        justify-content: center;

        padding: 0.5rem 1rem;
    }
</style>

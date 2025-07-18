We use Svelte 5 and TypeScript for this project. When writing code in `.svelte` and `.svelte.ts` files, please ensure that you use modern Svelte 5 syntax and features:

- Reactivity
    - `$state` for reactive variables
    - `$derived` (expression) and `$derived.by` (callback) for computed values
    - `$effect` (runs after the component is mounted and updated) / `$effect.pre` (runs before the component is mounted and updated) / `$effect.root` (manual cleanup). They return a cleanup function.

- Props and binding
    - `let { myProp, myOtherProp = "defaultValue", ...props }: MyPropsInterface = $props()` to declare props instead of `export let myProp: MyPropType;`
    - `const { myProp = $bindable("myPropDefault") }: MyPropsType = $props()` for props to be used with `bind:`
    - `const uid = $props.id()` for unique component IDs

- Events and DOM
    - `onevent` attribute instead of deprecated `on:event` for event handling. Modifiers like `on:click|preventDefault` shall not be used
    - `{@attach attachFunction(params)}` instead of `use:` directive

- Content
    - `{#snippet mySnippet(params: MyParamsType)}...{/snippet}` blocks and `{@render mySnippet(params)}` instead of `<slot>`
    - `export function myFunction(params) { ... }` for component methods

- For debugging purposes, you can use `$inspect` which works like `console.log` but runs every time a reactive variable changes
- Do not use stores in svelte components, as they are not needed with the new reactive system

We always use tabs for indentation, except in JSON and YAML files where spaces are used. Also, we use double quotes for strings. Ensure that your code adheres to these conventions for consistency and maintainability.

# WebComponent Layout Demo

## About

This demos how [Custom Elements](https://w3c.github.io/webcomponents/spec/custom/), [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import), [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/), [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables), and [Async Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) can be used together to create a layout where multiple front end frameworks coexist peacefully.

## How it works

The core of this project is the [`webcomponent-layout` component](src/index.js).
Which loads a list of components from a `layout-v3.json` file into an isolated context.
Shadow DOM ensure that styles from the components cannot escape and impact surrounding styles.
However theming is still possible using CSS variables, which are inherited by child components.
JavaScript Modules ensure JavaScript context and variables stay within the component and don't impact surrounding business logic.
Custom Elements provide an easy way to include and debug components on the page.
Async Await and Dynamic Import allow for components to be included after initial page load.

## Layout Flow

1. Load CSS variables
2. Load layout component
   1. load `layout-v3.json`
   2. load the stylesheet for the layout component
   3. add the stylesheet to the layout component
   4. add custom components into layout component
   5. load JavaScript logic for custom components

## Goals

* [x] Styles are isolated to component
* [x] Allow for theming components
* [x] JavaScript scope is isolated to component
* [x] No libraries, polyfills, or compilers are needed for layout component
* [x] No polyfills or compilers are needed to child components
* [x] On first load, time until application is fully interactive is less than 5 seconds
* [x] Subsequent loads can reuse cached libraries and components

## Non-Goals

* [x] Beautiful UI, this is primarily a technical demo, how the next generation of portal layout should look is a separate discussion.

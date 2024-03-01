---
index: true
---

# Dark mode

Framework ships with **Dark mode** support. Assuming the default configuration, this means that pages will appear with a <span style="border: white solid 0.5px; background: black; color: white; padding: 2px 6px;">dark&nbsp;theme</span> (light text on dark background) to users who have specified a preference for dark mode in their system settings—and default to a <span style="border: black solid 0.5px; background: white; color: black; padding: 2px 6px;">light&nbsp;theme</span> (dark text on a light background) for users who haven’t shared a preference—or prefer light mode.

Supporting dark mode helps users experience your project in more comfortable reading conditions. Just like other [responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) approaches, though, this doubles the number of ways a page can be displayed. When you develop a project, you will have to prepare and double-check your pages for the two possibilities. For any visual component that you add on the page, you will need to make sure that it displays correctly both on a light and on a dark background. If you’d rather not have to bother about this issue, we recommend that you set the default theme of your project to either a light or a dark theme.

Luckily, a lot of this works out of the box in Framework. You can pick and mix a dark theme and a light theme, and the browser will present the page with the theme that corresponds to the user preference. General text, code blocks, titles, links, and more generally the user interface (side bar, etc.), support both modes.

Images (pictures, charts and maps) that use a solid color background (be it white, black, or anything else) and a contrasting color for marks, axes etc., are always readable. However in many cases, they will look much nicer if the colors adapt to the page’s theme.

Observable Plot does a good job of using the [currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword) keyword to display its marks, and a transparent background. As a consequence, all its monochrome charts work seamlessly with both light and dark themes. Its default categorical color scheme (`observable10`) is also designed to look great both against a light and a dark background. However, some precautions must be taken when using continuous schemes that go, for example, from blue to white—because when used on a dark background they will give more salience to the elements with the lowest value—the opposite of what they were designed for. We detail our own experiments with schemes designed for dark mode in a section below.

The user preference might depend on the time of day (or night), and might change at any moment, either because they actively toggle their system preference, or because it is dawn, or dusk. A page that was loaded in the browser when the user was in dark mode can be programmed to react to this change and change its colors, without expecting the user to reload it. This is what the default themes do, and we’ll show a few examples of how more complex charts can do this too.

## The basics

- text with black, currentColor, steelblue and theme-foreground-focus.
- always specify both background and color.
- the {dark} component
- css variables
- mix-ins
- light-dark()

Do not use prefered()… since it will break if you choose a light theme.

Define your own css variables and use them.

## SVG

default fill and stroke colors, currentColor

## Plot

Defaults are good.

Continuous schemes, helpers.

text stroke. (textStroke)

use `var(--plot-background)`.

{dark} component

a few things to fix
https://github.com/observablehq/plot/issues/2006

color-mix(in oklab, --plot-background, currentColor, 80%)
=> an interactive showing how to convert `#ccc` to `color-mix(in oklab, --plot-background, currentColor, 80%)`

## Dark schemes

Continuous and diverging.

Ordinal.

A table of replacements could be useful (schemes, hard color — and not just white, black and a few grays, but e.g. var(--theme-foreground-focus) is a good replacement for steelblue )

## D3

always be explicit about color

## Canvas and SSR

Server-side rendering can be tricky (you might need to create two versions of each asset)

canvas doesn't have currentColor.

## More reading

Apple’s _Human interface guidelines_ have a very detailed [page about Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode), outlining best practices.

<p class="note">These recommandations will evolve with time as browser support for dark mode improves (see [light-dark](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)).</p>

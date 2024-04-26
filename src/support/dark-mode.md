---
index: true
toc: true
---

# Dark mode

<blockquote class="tip" label="TL;DR">

Observable Framework offers dark and light themes. When you include both a dark and a light theme (as the default settings do), the pages will be displayed according to the user preference for dark mode.

The defaults in Observable Framework and Observable Plot go a long way to support dark mode out of the box; however, a bit of additional work is required when you have images and charts that expect to be cast on a white background.

If you’d rather not have to bother about this issue, we recommend that you set the default theme of your project to one of the light themes (for example, `theme: air`). Otherwise, please read on…

</blockquote>

<div style="display:none;">

## Introduction

</div>

Framework ships with **Dark mode** support. This means that —assuming the default configuration— pages will appear with a <span style="border: white solid 0.5px; background: black; color: white; padding: 2px 6px;">dark&nbsp;theme</span> (light text on dark background) to users who have specified a preference for dark mode in their system settings—and default to a <span style="border: black solid 0.5px; background: white; color: black; padding: 2px 6px;">light&nbsp;theme</span> (dark text on a light background) for users who prefer light mode or haven’t shared a preference.

Supporting dark mode helps users experience your project in more comfortable reading conditions. Just like other [responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) approaches, though, this increases the number of ways a page can be displayed. When you develop a project, you have to prepare your pages for the two possibilities. Any visual component that you add on the page will have to display correctly in both situations.

Luckily, a lot of this works out of the box in Framework. If you pick and mix a dark theme and a light theme, the browser will present the page with the theme that corresponds to user preference. Titles, general text copy, code blocks, links—and more generally the user interface (side bar, etc.)— are all working well in the two contexts.

Similarly, images (such as pictures, charts and maps) that specify a solid color background (be it white, black, or anything else) and a contrasting color for marks, axes etc., are always readable. (In many cases, they will look much nicer if the colors adapt to the page’s theme, as we will see later—but their readability is not at risk.)

The difficulties start with images that have a transparent (or semi-transparent) background, and expect their container to be white (or light). This is the case in particular with SVG images that do not specify the fill color for `text` and `path` elements—as SVG defaults them to black. These assets need a bit more consideration with dark mode support.

_Note that the user preference might depend on the time of day (or night), and might change at any moment, either at dawn (or dusk), or because they actively toggle their system preference. A page can be programmed to react to this change and modify its styles without expecting the user to reload it. This is what Framework’s default themes do, and we’ll show a few examples of how more complex charts can do this too._

## Basic HTML

Basic HTML is designed to be displayed by a browser in whatever way it wants—which usually on graphic browsers results in black text on a white background.

But of course, the page designer wants text to have a specific color or background. (As a rule, never set one without checking the other! Or you’ll end up with low contrast and unreadable copy.) So a DOM element (a paragraph, a few words) can have a specific color (and background color). Another (nested) element can also have a specific style applied to it that sets its color (for example, links &lt;a> would be blue). If you want this link to be of the “same color as the text around it”, you will use the “[currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) keyword.

## CSS (var & color-mix)

Be careful when you pick “concrete” colors: if a color looks nice on a light background but is a bit too dark, its contrast on a dark background will be too low.

This is why Framework defines color variables such as <span style="color: var(--theme-green);">`var(--theme-green)`</span>, chosen to be readable on both a dark and a white background, and colors such as <span style="color: var(--theme-foreground-muted);">`var(--theme-foreground-muted)`</span> that correspond to a certain lightness that will adapt depending on the current page’s theme.

You can, of course, define your own color variables.

For example, you could add a section to your project’s `style.css` with color definitions, and replicate it with slightly different colors under a `@media (prefers-color-scheme: dark)` media query:

```css
:root {
  --color-orange: orange;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-orange: darkorange;
  }
}
```

<style>
  :root {
    --color-orange: darkorange;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-orange: orange;
    }
  }

  :root {
    --color-80: color-mix(in srgb, var(--theme-foreground), var(--theme-background) 80%);
  }
</style>

CSS [color-mix](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) can further help to define the proper shade against a given background.

For example, where you would usually reach for a #ccc light grey (maybe to draw discrete connections between nodes on a graph), you will instead use a color based on 80% of background and 20% of foreground:

```css run=false
:root {
  --color-80: color-mix(in srgb, var(--theme-foreground), var(--theme-background) 80%);
}
```

(Note that in hexadecimal notation, C = 12 and F = 15: in other words 80% = 0xC / 0xF = 0xCCCCCC / 0xFFFFFF.)

## Vector images

For vector images, the story is a little different. SVG defaults the color of text, shapes and paths to “black”, which is convenient for basic drawing but harmful for dark mode. However, we can use currentColor to represent the container’s color style—in effect making these images work like normal HTML text.

To go beyond monochrome charts, a lot can be done directly in CSS.

When using continous color scales, you’ll often want to change the color scheme depending on the theme. Before addressing this part, we need to look first at raster images, which only have “concrete” colors.

## Raster images

Raster images (JPEG, PNG, canvas) define a color as RGB (red, green, blue) or RGBa (with an additional alpha for transparency) for each pixel. There is no notion of “currentColor” or CSS variables: a pixel can only have its own RGB color, possibly alpha-blended with the background. As a consequence it’s impossible to define a pixel that is white on a dark background and black on a white background. This means that, in general, you will need two versions of the image, or a parameter in the code that generates the image if it’s a data-driven canvas.

The [**dark**](<https://observablehq.com/framework/lib/generators#dark()>) reactive variable helps with the latter situation: it yields true when the theme is dark and false when the theme is light. It reflects what the color of the page —whether it has been set as a specific light or dark theme, or by dark mode and reflecting user preference. In that case it also updates live when the user’s preference changes (at dawn, dusk, or because they’re manually changing their preference in system settings).

```js echo
display(dark ? "it’s dark in here" : "I feel light!");
```

You can use it as part of a Plot definition (see [the impact of vaccines](../plot/impact-of-vaccines) for a complete example):

```js echo run=false
Plot.plot({
  color: {scheme: dark ? "turbo" : "purd"},
  marks: [ … ]
})
```

Another very common use case is with mix-blend-mode: where the preferred option for mixing colors in light mode is “multiply”, in dark mode you obtain the equivalent effect by using “screen” instead.

```js echo run=false
Plot.lineY(data, {
  x: ...,
  y: ...,
  stroke: "category",
  mixBlendMode: dark ? "screen" : "multiply"
}).plot()
```

See [Overlapping histogram](../plot/overlapping-histogram) for a complete example.

Note that **dark** does not return user preference, but the current theme. This reflects user preference if the page supports dark mode, but otherwise reflects the page’s selected theme (either light or dark).

## D3

As a low-level library, D3 has no “good defaults” for color, and everything needs to be specified. To upgrade code that has been designed with only a light theme in mind, you will find that you often have to be explicit about filling text elements with:

```js echo run=false
  selectAll("text")
    .data(...)
    .join("text")
      .attr("fill", "currentColor")
```

and if you add a stroke to make a label stand out against other labels:

```js echo run=false
  selectAll("text")
    .data(...)
    .join("text")
      .attr("fill", "currentColor")
      .attr("stroke", "var(--theme-background)")
      .attr("paint-order", "stroke")
```

## Plot

Observable Plot does a good job of using the [currentColor](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#currentcolor_keyword) keyword to display its marks, and a transparent background. As a consequence, all its monochrome charts work seamlessly with both light and dark themes. Its default categorical color scheme (`observable10`) is also designed to look great both against a light and a dark background. Some precautions must be taken when using continuous schemes that go, for example, from blue to white—because when used on a dark background they will give more salience to the elements with the lowest value—the opposite of what they were designed for. We’ll report in a section below on our experiments with schemes designed for dark mode. (When using Plot, prefer the `--plot-background` CSS variable to `--theme-background`, as it is more portable outside of Framework.)

## SSR images

Another case is when you want to generate images in data loaders—for server-side rendering. This is covered in the [Image data loaders guide](../support/becker-barley-ssr).

## Dark color schemes

Most of the built-in color schemes in D3 and Plot have been designed for light mode. We’re currently working on designing dark color schemes that will look good _and_ correctly encode value in dark mode. Please upvote issue [#903](https://github.com/observablehq/framework/issues/903) if you’re interested. A few prototypes are available already in the {dark.js} component.

<div class="note" label=Notes>

Apple’s _Human interface guidelines_ have a very detailed [page about Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode), outlining best
practices.

These recommandations will evolve with time as browser support for dark mode improves (see
[light-dark](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark)).

</div>

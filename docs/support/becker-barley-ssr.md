---
index: true
toc: true
---

# Image data loaders

## for server side rendering (SSR)

The examples below all import the same basic function, that calls Plot and returns a DOM element. Its inputs are:

- **document** — which linkedom will provide for server-side rendering
- **dark** — a boolean indicating whether we want the dark mode version

```js
import {showCode} from "../components/showCode.js";
```

```js
display(showCode(FileAttachment("becker-barley.ts")));
```

The images are rendered server-side, with data loaders that build a snapshot image. The client does not access the data, its browser only downloads the resulting image asset. For example, as an **SVG image**:

```js
display(await assets.svg.image());
```

On this page, for the purpose of the demo, we are very greedy and want a **light** and a **dark** mode version, both for **SVG** and **PNG** formats; as a consequence, we need four data loaders:

| loader                                                       | image type | dark mode |
| ------------------------------------------------------------ | ---------- | --------- |
| ${showCode(FileAttachment("becker-barley-ssr.svg.ts"))}      | svg        | -         |
| ${showCode(FileAttachment("becker-barley-ssr-dark.svg.ts"))} | svg        | yes       |
| ${showCode(FileAttachment("becker-barley-ssr.png.ts"))}      | png        | -         |
| ${showCode(FileAttachment("becker-barley-ssr-dark.png.ts"))} | png        | yes       |

For the page to select the images it needs to load, based on the user’s preferred color mode, we use the reactive **dark.js** component:

```js echo
import {dark} from "../components/dark.js";
```

```js echo
const assets = dark
  ? {
      png: FileAttachment("becker-barley-ssr-dark.png"),
      svg: FileAttachment("becker-barley-ssr-dark.svg")
    }
  : {
      png: FileAttachment("becker-barley-ssr.png"),
      svg: FileAttachment("becker-barley-ssr.svg")
    };
```

For example, to display a small png:

```js echo
display(await assets.png.image({style: "max-width: 320px"}));
```

<style>
  table details {max-width: 450px}
</style>

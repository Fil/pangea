---
index: false
---

# Hello, satori

[vercel/satori](https://github.com/vercel/satori) converts HTML to SVG. Can be used to convert it to PNG by adding ReSVG. Could be useful to design open graph images (OG:image), and maybe fantastic tooltips.

```js echo
import satori from "npm:satori";
import {h} from "npm:preact";
import htm from "npm:htm";
const html = htm.bind(h);
```

```js echo
const input = html`<div
  style=${{
    display: "flex",
    "flex-wrap": "wrap",
    background: "white",
    width: "600px",
    height: "400px",
    padding: "3em"
  }}
>
  <h1 style=${{width: "600px"}}>What is Lorem Ipsum?</h1>
  <p style=${{"text-align": "right"}}>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
    type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
    Lorem Ipsum.
  </p>
</div>`;
```

```js echo
const output = await satori(input, {
  width: 600,
  height: 400,
  fonts: [{name: "Roboto", data: robotoArrayBuffer, weight: 400, style: "normal"}]
});

const div = display(document.createElement("div"));
div.innerHTML = output;
```

```js echo
const robotoArrayBuffer = fetch(
  "https://raw.githubusercontent.com/wycats/jsmodules/master/source/fonts/Roboto/Roboto-Regular.woff"
).then((d) => d.arrayBuffer());
```

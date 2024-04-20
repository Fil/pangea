---
index: true
---

# Markdown-it

Display markdown as HTML. [Markdown-it](https://github.com/markdown-it/markdown-it) is used internally by Framework, which means we can import it directly from `node_modules`. (If you need any plugins, you will have to add them with `yarn add` and import them here also.)

```js echo
import markdownit from "markdown-it";
const md = (t) => Object.assign(document.createElement("div"), {innerHTML: markdownit().render(t)});
```

```js echo
const text = FileAttachment("markdown-it.md").text();
```

```js echo
display(Object.assign(md(text), {style: "border: 0.5px solid orange; padding: 3em;"}));
```

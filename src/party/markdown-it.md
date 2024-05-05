---
index: true
source: https://github.com/observablehq/framework/issues/895
---

# Markdown-it

Display markdown as HTML (see [#895](https://github.com/observablehq/framework/issues/895)). [Markdown-it](https://github.com/markdown-it/markdown-it) is used internally by Framework, which means we can import it directly from `node_modules`. (If you need any plugins, you will have to add them with `yarn add` and import them here also.)

```js echo
import markdownit from "markdown-it";
import matter from "npm:gray-matter";
```

```js echo
const Markdown = new markdownit({html: true});

const md = {
  unsafe(string) {
    const template = document.createElement("template");
    template.innerHTML = Markdown.render(string);
    return template.content.cloneNode(true);
  }
};
```

```js echo
display(md.unsafe(`### Hello, ${"world"}!`));
```

```js echo
const text = FileAttachment("markdown-it.md").text();
```

```js echo
const {content} = matter(text); // remove front-matter
display(html`<div style="border: 0.5px solid orange; padding: 3em;">${md.unsafe(content)}</div>`);
```

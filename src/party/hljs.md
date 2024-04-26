---
index: true
---

# Display code with hljs

[highlight.js](https://highlightjs.org/) (_aka_ hljs) is a JavaScript module that highlights syntax in source code. It is used by Observable Markdown to display code blocks, but it can also be used to display external code. The component below loads some code asynchronously and puts it into a &lt;[details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)> disclosure element.

```js echo
import {showCode} from "../components/showCode.js";
```

Here’s how this component can self-referentially display its own code:

```js echo
display(showCode(FileAttachment("../components/showCode.js")));
```

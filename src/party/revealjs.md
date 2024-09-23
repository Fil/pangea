---
index: true
source: https://mcmcclur.observablehq.cloud/mark-on-framework/posts/RevealJS/
keywords: revealjs, slides, presentation
---

# Reveal.js

<div class="reveal">
<div class="slides">

<section>

<h2>

Make presentation slides<br>with [Reveal.js](https://revealjs.com/).

</h2>

</section>

<section>

For details and tips to create transitions,<br>
follow this great [tutorial by Mark McClure](https://mcmcclur.observablehq.cloud/mark-on-framework/posts/RevealJS/).<br>
([source code](https://github.com/mcmcclur/MarkOnFramework/tree/main/src/posts/RevealJS))

</section>

</div>
</div>

```js
import Reveal from 'npm:reveal.js/dist/reveal.esm.js';
const reveal = new Reveal({
  embedded: true,
  progress: false,
  hash: true,
  history: false,
  help: false,
  width: 960,
  height: 700,
});
reveal.initialize();
```

<link rel="stylesheet" href="npm:reveal.js/dist/reveal.css">
<link rel="stylesheet" media="(prefers-color-scheme: dark)" href="npm:reveal.js/dist/theme/black.css">
<link rel="stylesheet" media="(prefers-color-scheme: light)" href="npm:reveal.js/dist/theme/white.css">

<style>
.reveal {
  width: 90%;
  height: 500px;
  border: solid steelblue 1px;
}
.reveal>* {
  max-width: 100%;
}
</style>

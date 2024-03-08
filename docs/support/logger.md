---
index: true
---

# Logger

<div class="card">${logger}</div>

```js echo
const logger = document.createElement("div");
logger.setAttribute("style", "white-space:pre-wrap");
logger.textContent = "Log:";
logger.append = (text) => (logger.textContent += "\n" + text);
```

```js echo
setTimeout(() => {
  logger.append("ciao");
}, 1000);
```

```js echo
setTimeout(() => {
  logger.append("bonjour");
}, 2000);
```

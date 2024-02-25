---
index: true
---

# Stored inputs

Q: [_Is there an easy solution for persisting input values?_](https://github.com/observablehq/framework/discussions/887)

_Your color code: ${color}._

This block defines a default color, but a value stored in [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) takes precedence.

```js echo
const defaultColor = d3.rgb("steelblue").formatHex();
const color = view(Inputs.color({value: sessionStorage.getItem("color") ?? defaultColor}));
```

Each time _color_ changes, we store it in the session.

```js echo
sessionStorage.setItem("color", color);
```

Note that I tend to prefer the lighter sessionStorage to [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), which implies that the browser can get “stuck” on a bad combination of parameters. With sessionStorage, once you close the window, the storage is gone. Also, sessionStorage works in incognito windows.

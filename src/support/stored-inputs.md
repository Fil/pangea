---
index: true
---

# Stored inputs

Q: [_Is there an easy solution for persisting input values?_](https://github.com/observablehq/framework/discussions/887)

_Your color codes:_

- sessionStorage: ${color}
- localStorage: ${color2}

This block defines a default color, but a value stored in [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) or [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) takes precedence.

```js echo
const defaultColor = d3.rgb(dark ? "orange" : "steelblue").formatHex();
const color = view(Inputs.color({value: sessionStorage.getItem("color") ?? defaultColor}));
```

```js echo
const secondColor = d3.rgb(dark ? "lime" : "red").formatHex();
const color2 = view(Inputs.color({value: localStorage.getItem("color2") ?? secondColor}));
```

Each time _color_ changes, we store it in the session storage.

```js echo
sessionStorage.setItem("color", color);
```

Each time _color2_ changes, we store it in local storage.

```js echo
localStorage.setItem("color2", color2);
```

Note that I tend to prefer the lighter **sessionStorage**; **localStorage** implies that the browser can get “stuck” on a bad combination of parameters. With sessionStorage, once you close the window, the storage is gone. Also, sessionStorage works in incognito windows.

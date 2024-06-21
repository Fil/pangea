---
index: true
---

# Hello, jszip

Documentation: https://stuk.github.io/jszip/

```js echo
import JSZip from "npm:jszip";

const zip = new JSZip();

zip.file("Hello.txt", "Hello World\n");

const url = zip.generateAsync({type:"blob"}).then((blob) => URL.createObjectURL(blob));
```

```html echo
<a href=${url} download="hello.zip">👉 <code>download zip file</code></a>
```

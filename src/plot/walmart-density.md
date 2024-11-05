---
source: https://observablehq.com/@observablehq/plot-walmart-density
index: true
---

# Walmart density

The interactive chart below shows the relative density of Walmart stores open in the U.S. between 1962 and 2006.

<div is="walmart-chart"></div>

```js
import {component} from "./walmart-density.js";
component("walmart-chart");
```

---

The chart above (together with its interactive slider) is implemented as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components), and [exported](https://observablehq.com/framework/embeds#exported-modules) from the pangea data app. On the host site, add a `div` where you want to anchor the visualization, and import the component:

```html run=false
<div is="walmart-chart"></div>
```

```js run=false
import {component} from "https://observablehq.observablehq.cloud/pangea/plot/walmart-density.js";
component("walmart-chart");
```

Alternatively, import the chart function and insert its output into the DOM:

```js run=false
import {WalmartDensity} from "https://observablehq.observablehq.cloud/pangea/plot/walmart-density.js";
WalmartDensity().then((e) => document.querySelector("#walmart-chart")?.append(e));
```

(For React, see the template in [Framework’s documentation](https://observablehq.com/framework/embeds#exported-modules).)



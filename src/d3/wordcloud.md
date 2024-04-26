---
source: https://observablehq.com/@d3/word-cloud
Author: Jason Davies
index: true
---

# Word cloud

A demonstration of [d3-cloud](https://github.com/jasondavies/d3-cloud/) by Jason Davies. Paste into or edit the text below to update the chart. Note: word clouds [may be harmful](https://www.niemanlab.org/2011/10/word-clouds-considered-harmful/).

```js echo
const chart = await WordCloud(words, {
  width,
  height: 500,
  invalidation // a promise to stop the simulation when the cell is re-run
});

display(chart);
```

```js
const source = view(
  Inputs.textarea({
    value: (await FileAttachment("../data/dream.txt").text()).trim(),
    rows: 20,
    width
  })
);
```

_(Martin Luther King, Jr.: “I Have a Dream”, 1963)_

---

## Data preparation

The WordCloud function does not prepare the contents. Pass it a text that will be split against all spaces and punctuation marks, an array of words that will be grouped and counted, or an array of objects with a key and a value.

```js echo
const words = prepareWords(source);
```

```js echo
import {WordCloud, prepareWords} from "../components/wordcloud.js";
```

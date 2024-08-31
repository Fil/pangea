---
index: true
---

# Hello, chart.js

[Chart.js](https://www.chartjs.org/) is a “simple yet flexible JavaScript charting library for the modern web”.

```js echo
import {Chart} from "npm:chart.js/auto";
```

```js echo
const canvas = display(document.createElement("canvas"));

new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
```

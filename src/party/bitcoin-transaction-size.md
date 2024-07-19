---
index: true
source: https://observablehq.com/@mbostock/bitcoin-transaction-size
keywords: live real time data wss streaming stream socket
---

# WebSocket: Bitcoin transactions

This is a realtime histogram of the size of recent unconfirmed bitcoin transactions. Transactions bigger than 1,000KB are included in the rightmost bin.

Data: [Blockchain](https://blockchain.info/api/api_websocket)

```js echo
const chart = Plot.plot({
  x: {label: "Size (KB)", domain: [0, 1000]},
  marks: [
    Plot.rectY(
      sizes,
      Plot.binX(
        {y: "count"},
        {
          x: Plot.identity,
          domain: [0, 1000],
          thresholds: 50,
          fill: "var(--theme-foreground-focus)"
        }
      )
    ),
    Plot.ruleY([0, 10], {stroke: ["currentColor"]})
  ]
});

display(chart);
```

```js echo
const sizes = Generators.observe((notify) => {
  const data = [];
  notify(data);
  const socket = new WebSocket("wss://ws.blockchain.info/inv");
  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({op: "unconfirmed_sub"}));
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.op === "utx") {
      data.push(Math.min(999, message.x.size));
      notify(data);
    }
  });
  return () => socket.close();
});
```

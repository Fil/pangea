---
index: true
---

# email timestamps

<p class=author>by <a href="https://observablehq.com/@fil">Fil</a></p>

A friend who operates a fairly large mailing-list wanted to know how quickly the server delivered its messages, with Mailman and postfix. I saved the following command as `docs/data/email-timestamps.txt.sh`:

```sh echo run=false
ssh example.org "awk '/status=sent/ {print \$1, \$2, \$3}' /var/log/mail.log"
```

This short data loader connects to the server and echoes a timestamp for each log that contains `status=sent`. A simple histogram then answers the question:

```js echo
display(Plot.rectY(ts, Plot.binX()).plot({marginLeft: 60}));
```

The code below reads the file and parses postfix’s date format (`"Feb 29 07:36:53"`).

```js echo
const parse = d3.timeParse("%b %d %I:%M:%S %Y");
const ts = FileAttachment("../data/email-timestamps.txt")
  .text()
  .then((text) => text.split("\n").map((t) => parse(`${t} 2024`)));
```

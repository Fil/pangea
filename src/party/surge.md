---
index: true
---

# surge.sh hosting

Hosting an Observable Framework project on [surge.sh](https://surge.sh/) is as easy as:

```sh
yarn observable build && surge dist/
```

You’ll probably want to put this into the project’s `package.json`:

```json
"scripts": {
  ...,
  "surge": "observable clean && observable build && surge --domain $DOMAIN.surge.sh dist/"
}
```

You can also add the domain name as a CNAME file (see [documentation](https://surge.sh/help/remembering-a-domain)).
---
index: true
sql:
  penguins: https://raw.githubusercontent.com/mwaskom/seaborn-data/refs/heads/master/penguins.csv
---

# DuckDB IN(…)

```js
const checkbox = view(Inputs.checkbox(["Adelie", "Chinstrap", "Gentoo"]))
```

```js
checkbox
```

We can’t pass a JavaScript array to a DuckDB prepared statement, as it would generate an error (see [#447](https://github.com/duckdb/duckdb-wasm/issues/447)):

```sql echo run=false
SELECT COUNT() FROM penguins WHERE species IN (${checkbox})
```

Instead, we can use JSON:

```sql echo
SELECT COUNT() FROM penguins WHERE species IN JSON(${JSON.stringify(checkbox)})
```

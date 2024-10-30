---
index: true
---

# Simple data analysis

[Simple data analysis](https://nshiab.github.io/simple-data-analysis/), a library maintained by computational journalist Nael Shiab, purports to be “a high-performance and convenient solution in JavaScript for data analysis. It's based on DuckDB and inspired by Pandas (Python) and the Tidyverse (R).”

```js echo
import {SimpleDB} from "npm:simple-data-analysis@2";
```

_Note: the API of this library has changed in version 3. This page would need a refresher._

```js echo
// We start a new instance of SimpleDB
const sdb = new SimpleDB();

// We load daily temperatures for three cities.
// We put the data in the table dailyTemperatures.
await sdb.loadData(
  "dailyTemperatures",
  "https://raw.githubusercontent.com/nshiab/simple-data-analysis/main/test/data/files/dailyTemperatures.csv"
);

// We compute the decade from each date
// and put the result in the decade column.
await sdb.addColumn(
  "dailyTemperatures",
  "decade",
  "integer",
  "FLOOR(YEAR(time)/10)*10" // This is SQL
);

// We summarize the data by computing
// the average dailyTemperature
// per decade and per city.
await sdb.summarize("dailyTemperatures", {
  values: "t",
  categories: ["decade", "id"],
  summaries: "mean"
});

// We run linear regressions
// to check for trends.
await sdb.linearRegressions("dailyTemperatures", {
  x: "decade",
  y: "mean",
  categories: "id",
  decimals: 4
});

// The dailyTemperature table does not have
// the name of the cities, just the ids.
// We load another file with the names
// in the table cities.
await sdb.loadData(
  "cities",
  "https://raw.githubusercontent.com/nshiab/simple-data-analysis/main/test/data/files/cities.csv"
);

// We join the two tables. By default,
// join searches for a common column
// and does a left join. The result is stored in
// the left table (dailyTemperatures here).
await sdb.join("dailyTemperatures", "cities");

// We select the columns of interest
// after the join operation.
await sdb.selectColumns("dailyTemperatures", ["city", "slope", "yIntercept", "r2"]);

// We log the results table.
await sdb.logTable("dailyTemperatures");

// We store the data in a variable.
const results = await sdb.getData("dailyTemperatures");

display(Inputs.table(results));
```

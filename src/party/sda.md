---
index: true
---

# Simple data analysis

[Simple data analysis](https://github.com/nshiab/simple-data-analysis), a
library maintained by computational journalist Nael Shiab, purports to be “a
high-performance and convenient solution in JavaScript for data analysis. It's
based on DuckDB and inspired by Pandas (Python) and the Tidyverse (R).”

```js echo
import { SimpleWebDB } from "https://esm.sh/jsr/@nshiab/simple-data-analysis@3.15.3/web";
```

```js echo
// We start a new instance of SimpleWebDB
const sdb = new SimpleWebDB();

// We create a new table.
const tableTemperature = sdb.newTable("temperature");

// We fetch daily temperatures for three cities.
await tableTemperature.fetchData(
  "https://raw.githubusercontent.com/nshiab/simple-data-analysis/main/test/data/files/dailyTemperatures.csv",
);

// We compute the decade from each date
// and put the result in the decade column.
await tableTemperature.addColumn(
  "decade",
  "integer",
  "FLOOR(YEAR(time)/10)*10", // This is SQL
);

// We summarize the data by computing
// the average temperature
// per decade and per city.
await tableTemperature.summarize({
  values: "t",
  categories: ["decade", "id"],
  summaries: "mean",
});

// We run linear regressions
// to check for trends.
await tableTemperature.linearRegressions({
  x: "decade",
  y: "mean",
  categories: "id",
  decimals: 4,
});

// The tableTemperature does not have
// the name of the cities, just the ids.
// We load another file with the names
// in a new table.

// We create a new table.
const tableCities = sdb.newTable("cities");

// We load another file with
// the cities ids and names.
await tableCities.fetchData(
  "https://raw.githubusercontent.com/nshiab/simple-data-analysis/main/test/data/files/cities.csv",
);

// We join the two tables based on the ids.
// By default, join will automatically look
// for a common column, do a left join, and
// put the result in the left table.
await tableCities.join(tableTemperature);

// We select the columns of interest.
await tableCities.selectColumns(["city", "slope", "yIntercept", "r2"]);

// We log the results table.
await tableCities.logTable();

// We store the data in a variable.
const results = await tableCities.getData();

display(Inputs.table(results));
```

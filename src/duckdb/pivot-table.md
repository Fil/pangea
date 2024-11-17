---
sql:
  penguins: /data/penguins.csv
index: true
---

# DuckDB pivot table

_This example uses DuckDB’s [pivot_table](https://duckdb.org/community_extensions/extensions/pivot_table.html) extension._

Pivot the penguins by **species**, **island**, and **sex**, retaining the **frequency** and median **body mass** of each class:

```sql echo
FROM PIVOT_TABLE(
  ['penguins'], -- table_names
  ['COUNT() AS freq', 'MEDIAN(body_mass_g) AS median_bm'], -- values
  ['species', 'island', 'sex'], -- rows
  [],
  []
);
```

Here’s a more complicated query, creating a **count** of each class for each island:

```sql echo
BEGIN;
DROP TYPE IF EXISTS columns_parameter_enum;
CREATE TYPE columns_parameter_enum AS ENUM (FROM build_my_enum(['penguins'], ['island'], []));
FROM PIVOT_TABLE(
  ['penguins'],
  ['COUNT() AS count'],
  ['species', 'sex'],
  ['island'], -- columns
  ['body_mass_g < 4000'], -- filter
  grand_totals := true
);
COMMIT;
```

And there are more options, for example to show the subtotals by class and the grand total:

```sql echo
FROM PIVOT_TABLE(
  ['penguins'],
  ['COUNT() AS freq', 'MEDIAN(body_mass_g) AS median_bm'],
  ['species', 'island', 'sex'],
  [],
  [],
  subtotals := true, -- bool.
  grand_totals := true, -- bool.
  values_axis := '' -- 'rows' or 'columns'
);
```

## Installation

Normally, you would have to call:

```sql run=false
INSTALL pivot_table FROM community;
LOAD pivot_table;
```

But, in our project’s [config](https://observablehq.com/framework/config#duckdb), we have declared several extensions:

```js run=false
export default {
  duckdb: {
    extensions: ["spatial", "h3", "pivot_table"]
  }
};
```

Framework downloads them for self-hosting, and loads them automatically when we start a `SQL` instance.

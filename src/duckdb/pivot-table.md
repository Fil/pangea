---
sql:
  penguins: /data/penguins.csv
index: true
---

# DuckDB pivot table

We declared the [pivot_table](https://duckdb.org/community_extensions/extensions/pivot_table.html) extension in our project’s [config](https://observablehq.com/framework/config#duckdb), for self-hosting.

Pivot the penguins by species, island, and sex, retaining the frequency and meadian body mass of each class:

```sql echo
FROM PIVOT_TABLE(
  ['penguins'], -- table_names
  ['COUNT() AS c', 'MEDIAN(body_mass_g) AS med_body_mass'], -- values
  ['species', 'island', 'sex'], -- rows
  [], -- columns
  [], -- filters
  subtotals := true, -- bool.
  grand_totals := true, -- bool.
  values_axis := '' -- 'rows' or 'columns'
);
```

Here’s a more complicated query, creating a column for each island:

```sql echo
BEGIN;
DROP TYPE IF EXISTS columns_parameter_enum;
CREATE TYPE columns_parameter_enum AS ENUM (FROM build_my_enum(['penguins'], ['island'], []));
FROM PIVOT_TABLE(
  ['penguins'],
  ['COUNT() AS c'],
  ['species', 'sex'],
  ['island'],
  ['body_mass_g < 4000'],
  grand_totals := true
);
COMMIT;
```

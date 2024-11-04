---
sql:
  penguins: ../data/penguins.csv
index: true
---

# DuckDB pivot table

We declared the [pivot_table](https://duckdb.org/community_extensions/extensions/pivot_table.html) extension in our project’s [config](https://observablehq.com/framework/config#duckdb), for self-hosting.

```sql echo
FROM penguins
```


```sql echo
FROM pivot_table(['penguins'], ['COUNT() AS c', 'MEDIAN(body_mass_g) AS med_body_mass'], ['species', 'island', 'sex'], [], [])
ORDER BY c DESC;
```

```sql echo
BEGIN;
DROP TYPE IF EXISTS columns_parameter_enum;
CREATE TYPE columns_parameter_enum AS ENUM (FROM build_my_enum(['penguins'], ['island'], []));
FROM pivot_table(['penguins'], ['COUNT() AS c'], ['species', 'sex'], ['island'], [])
COMMIT;
```
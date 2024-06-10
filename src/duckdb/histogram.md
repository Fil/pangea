---
index: true
sql:
  penguins: ../data/penguins.csv
---

# DuckDB histogram

DuckDB’s `HISTOGRAM()` function returns a MAP of key-value pairs representing buckets and counts ([documentation](https://duckdb.org/docs/sql/aggregates.html#histogramarg)).

This can be useful to quickly summarize a distribution:

```sql echo
SELECT HISTOGRAM(island)
  FROM penguins;
```

It can be ventilated by group, to create a sort of [data cube](https://en.wikipedia.org/wiki/Data_cube):

```sql echo
SELECT species
     , HISTOGRAM(island)
  FROM penguins
 GROUP BY 1
 ORDER BY 1;
```

To count NULL values, we can use `COALESCE` (we also increase the granularity of the grouping):

```sql echo
SELECT species
     , island
     , HISTOGRAM(COALESCE(sex, 'N/A'))
  FROM penguins
 GROUP BY 1, 2
 ORDER BY 1, 2;
```

## Retrieving totals

Now, suppose we have saved this granular summary data as a very compact parquet file —loaded as a table named `penguins_stats`—, and want a query equivalent to:

```sql echo
SELECT species
     , sex
     , COUNT() AS count
  FROM penguins
 GROUP BY 1, 2
 ORDER BY 1, 2;
```

All the information we need is here. Since the cube contains the histograms for each element in the data cube, we just need to make a sum of them for each group of _species_. A solution (suggested to me by Éric Mauvière, thanks!), is to use `UNNEST` ([documentation](https://duckdb.org/docs/sql/query_syntax/unnest.html)). Here, I’m using an intermediate TABLE to make it easier to write subsequent queries:

```sql run=false
CREATE TABLE penguins_expand AS (
  SELECT island
       , species
       , UNNEST(map_keys(h)) AS sex
       , UNNEST(map_values(h)) AS count
    FROM penguins_stats
);
```

Our query is now:

```sql run=false
SELECT species
     , IF(sex = 'N/A', null, sex) AS sex
     , SUM(count) AS count
  FROM penguins_expand
 GROUP BY 1, 2
 ORDER BY 1, 2;
```

(It seems a bit complicated to query a few hundred penguins, but this works identically with dozens of millions of rows!)

## Grouping the keys

Another useful operation we can do is to group the keys according to some parameter. This time, let’s create histograms on a quantitative dimension:

```sql echo
SELECT species
     , island
     , sex
     , HISTOGRAM(body_mass_g)
  FROM penguins
 GROUP BY 1, 2, 3
 ORDER BY 1, 2, 3;
```

```sql id=view2
CREATE VIEW penguins_mass AS (
  SELECT species
       , island
       , sex
       , HISTOGRAM(body_mass_g) AS h
    FROM penguins
   GROUP BY 1, 2, 3
   ORDER BY 1, 2, 3
);

CREATE TABLE penguins_mass_expand AS (
  SELECT species
       , island
       , sex
       , UNNEST(map_keys(h)) AS body_mass_g
       , UNNEST(map_values(h)) AS count
    FROM penguins_mass
);
```

```js
const threshold = view(Inputs.range([2500, 8000], {step: 50}));
```

```sql echo
SELECT species
     , sex
     , 100.0 * SUM(
         IF (body_mass_g <= ${threshold}, count, 0)
       ) / SUM(count) AS percentage
  FROM penguins_mass_expand
 GROUP BY 1, 2;
```

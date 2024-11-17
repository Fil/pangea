---
index: true
sql:
  unemployment: /data/unemployment-by-county.csv
---

# DuckDB 🐤 Spatial 🌎

${chart}

To make this [choropleth](/plot/choropleth), let’s start by adding the unemployment dataset in the front-matter:

```yaml
---
sql:
  unemployment: /data/unemployment-by-county.csv
---
```

We have configured DuckDB’s [spatial](https://duckdb.org/docs/extensions/spatial/overview.html) [extension](https://observablehq.com/framework/lib/duckdb#extensions), so it’s available directly in `sql`.

We can load geospatial shapes (in **TopoJSON** format), with the `ST_read` command. This is defined in DuckDB’s [SPATIAL](https://duckdb.org/docs/extensions/spatial/overview.html) extension, that integrates the classic [GDAL](https://duckdb.org/docs/extensions/spatial/gdal.html) library.

First, use a local copy of the [US Atlas](https://github.com/topojson/us-atlas):

```js echo
const url = import.meta.resolve("npm:us-atlas@3/counties-10m.json");
```

and import it into the `counties` table:

```js
display(counties)
```

```sql echo id=[counties]
CREATE OR REPLACE TABLE counties AS FROM ST_Read(${url});
```

Now we can read back this table; we use a `WITH` clause with “fake” parameters to ensure that this query runs after the counties table has been filled. (This will be necessary for all queries that depend on that table.)

```sql echo
WITH dependencies AS (SELECT ${counties, 1})
FROM counties
```

GDAL knows how to translate TopoJSON to GeoJSON. Let’s join it at the same time with our unemployment data, in a single query:

```js
Inputs.table(rates)
```

```sql echo id=rates
WITH dependencies AS (SELECT ${counties, 1})
SELECT ST_AsGeoJSON(geom) AS "geom"
     , counties."id"
     , "rate"
     , "state"
     , "county"
  FROM counties
  LEFT JOIN unemployment
    ON counties.id = unemployment.id
```

```js echo
Plot.geo(rates, {
  geometry: (d) => JSON.parse(d.geom),
  fill: "rate",
}).plot()
```

All that remains is to add a projection and a proper color scale & legend:

```js echo
const chart = Plot.plot({
  projection: "albers-usa",
  color: {type: "quantize", n: 9, domain: [1, 10], scheme: "blues", label: "Unemployment rate (%)", legend: true},
  marks: [
    Plot.geo(rates, {
      geometry: ({geom}) => JSON.parse(geom),
      fill: "rate",
      tip: {channels: {id: "id", state: "state", county: "county"}}
    })
  ]
});
```

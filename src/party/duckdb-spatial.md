---
index: false
draft: true
---

```js echo
import * as duckdb1 from "npm:@duckdb/duckdb-wasm@1.28.1-dev234.0";
```

```js echo
const duckdb = await import("https://esm.sh/@duckdb/duckdb-wasm@1.28.1-dev234.0");

display(await duckdb);
```

# DuckDB spatial

```js echo
display(
  Plot.plot({
    projection: "identity",
    width: 975,
    height: 610,
    marks: [
      Plot.geo(counties, {
        stroke: "var(--theme-background-alt)",
        strokeWidth: 0.25,
        fill: (d) => d.properties.area
      })
    ]
  })
);
```

<p class=warning>This page only works if we upgrade DuckDBClient to import duckdb-wasm@1.28.1-dev106.0 or later, coupled with apache-arrow@14 or later. See issues <a href=https://github.com/duckdb/duckdb-wasm/issues/1561>duckdb-wasm#1561</a>; <a href=https://github.com/observablehq/framework/issues/750>framework#750</a> and <a href=https://github.com/observablehq/framework/issues/733>framework#733</a>.</p>

---

Start by creating an empty DuckDB database with its [spatial extension](https://duckdb.org/docs/extensions/spatial.html), and load the TopoJSON [US Atlas](https://github.com/topojson/us-atlas):

```js echo
const db1 = await DuckDBClient.of();
display(await db1.sql`SELECT extension_name, installed, description
FROM duckdb_extensions();`);
```

```js echo
const db2 = await DuckDBClient.of();
display(await db2.sql`SHOW default_extension_repository;`)
// await db2.sql`SET autoinstall_known_extensions=1;`;
// await db2.sql`SET autoload_known_extensions=1;`;
// display(await db2.sql`install json; load json; SELECT {duck: 42}::JSON;`);
```

```js echo
const db = await DuckDBClient.of();
//await db.sql`SET home_directory='./'`;
//await db.sql`SET secret_directory='/tmp';`;
//await db.sql`SET extension_directory='/';`;
await db.sql`INSTALL spatial`;
await db.sql`LOAD spatial`;
await db.sql`CREATE TABLE us AS (
  SELECT * FROM ST_Read('https://cdn.jsdelivr.net/npm/us-atlas/us/10m.json')
)`;
```

Now we can work on this file as a database:

```js echo
const features = await db.sql`SELECT * FROM us`;
```

${Inputs.table(features)}

The **geom** field is a ST_GEOMETRY, the internal format that DuckDB spatial uses to represent geometries. We can convert it to GeoJSON:

```js echo
const counties = Array.from(
  await db.sql`SELECT ST_AsGeoJSON(geom) AS county, ST_Area(geom) as area FROM us`,
  ({county, area}) => Object.assign(JSON.parse(county), {properties: {area}})
);
```

This is just the beginning.

(Note: this exploration is all happening client-side.)

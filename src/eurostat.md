---
index: true
---

# Eurostat data loaders

The [Eurostat data browser](https://ec.europa.eu/eurostat/databrowser/explore/all/all_themes) is a great sources for all european statistics. But it is sometimes a bit difficult to use. This page loads its XML catalog and converts it to an easier csv format. Click on a specific dataset to create a data loader which returns a highly optimized parquet file.

```js
const search = view(Inputs.search(catalogue));
```

```js
const row = view(Inputs.table(search, {multiple: false}));
```

```js
const code = row?.code;
document.querySelector("#reveal").setAttribute("style", code ? null : "display:none");

if (code)
  display(
    Inputs.table(Object.entries(row), {
      header: {0: "—", 1: "*"},
      width: {0: 120, 1: 500}
    })
  );
```

---

<div id="reveal">

The following code can be used as a dataloader for this dataset:

${Inputs.textarea({value: makeQuery(code), rows: 40})}

Save it as <tt>data/eurostat/${code}.parquet.sh</tt>. You can then reference <tt>/data/eurostat/${code}.parquet</tt> in your SQL front matter or DuckDBClient options.

<div class=tip>

Don't hesitate to play with the parameters in the query to try and optimize the file further. The smaller it is, the faster your data app will be! In particular, try to add:

- `WHERE geo='TOTAL'` (or some other filter) when you don’t need all the modalities in all the dimensions;
- `ORDER BY 2, 3, 4, 5…` where the ranks correspond to the columns that have the smallest number of distinct values. (You can evaluate these with queries such as `SELECT COUNT(DISTINCT "geo") FROM table`.)

We have seen some files with 6+ million rows compressed to just 1MB—less than 2 bits per row!

</div>

</div>

```js
const catalogue = FileAttachment("/data/eurostat/catalogue.csv")
  .csv()
  .then(
    (data) => (
      data.forEach((row) => {
        row.lastUpdate = new Date(row.lastUpdate);
        row.lastModified = new Date(row.lastModified);
        row.count = +row.count;
      }),
      data
    )
  );
```

```js
function makeQuery(code, fields = "*", orderby = "\n") {
  return `export CODE="${code}"

export URL='https://ec.europa.eu/eurostat/api/dissemination/sdmx/2.1/data/'$CODE'/?format=SDMX-CSV&compressed=true&i'

if [ ! -f "$TMPDIR/$CODE.csv.gz" ]; then curl "$URL" --output $TMPDIR/$CODE.csv.gz; fi
gunzip --keep $TMPDIR/$CODE.csv.gz

duckdb :memory: << EOF
COPY (
  SELECT ${fields}
  FROM read_csv('$TMPDIR/$CODE.csv')
  -- WHERE OBS_VALUE > 0
  -- ORDER BY 2, 3, 6, 4…
) TO '$TMPDIR/$CODE.parquet' (COMPRESSION ZSTD, row_group_size 100000);
EOF
cat $TMPDIR/$CODE.parquet >&1  # Write output to stdout
rm $TMPDIR/$CODE.csv $TMPDIR/$CODE.parquet  # Clean up
`;
}
```

```js
//const data = FileAttachment("/data/eurostat/educ_uoe_grad02.parquet").parquet();
```

```js
const data = FileAttachment("/data/eurostat/educ_uoe_mobs02.parquet").parquet();
```

```js
data.numRows
```

```js
Inputs.table(data)
```

```js
const geo = d3.groupSort(data, v => -d3.sum(v, d => Number(d.OBS_VALUE)), d => d.geo);
const partner = d3.groupSort(data, v => -d3.sum(v, d => Number(d.OBS_VALUE)), d => d.partner);

display(partner)
```

```js
Plot.plot({
  aspectRatio: 1,
  x: {domain: geo},
  y: {domain: geo.concat(partner)},
  color: {type:"log", scheme: dark ? "turbo" : "blues"},
  marks: [
    Plot.cell(data, {
      x: "geo",
      y: "partner",
      fill: "OBS_VALUE",
      tip: true
    })
  ]
})
```

```js
const languages = FileAttachment("/data/eurostat/educ_uoe_lang01.parquet").parquet();
```

```js
Inputs.table(languages)
```

```js
Plot.plot({
  x: {axis: "top"},
  y: {axis: "right", grid: true},
  marginRight: 50,
  r: {range: [1, 8]},
  marks: [
    Plot.dot(languages, {
      x: "geo",
      y: "language",
      r: "OBS_VALUE",
      fill: "var(--plot-background)",
      stroke: "currentColor",
      sort: {y: "-r", reduce: "sum", limit: 12},
      tip: true
    })
  ]
})
```

```js
const domain = d3.groupSort(languages, v => -d3.sum(v, d => d.OBS_VALUE), d => d.language).slice(0,9).concat("others");
```

```js
Plot.plot({
  y: {axis: "right", grid: true},
  color: {legend: true, domain, unknown: "grey"},
  marks: [
    Plot.barY(languages, {
      x: "geo",
      y: "OBS_VALUE",
      fill: "language",
      order: "sum",
      sort: {x: "-y"},
      tip: true
    })
  ]
})
```

---
index: true
source: https://github.com/observablehq/framework/discussions/1631
---

# Input layout

```js
const stations = [
  "Grand Central Terminal, New York City, USA",
  "St Pancras International, London, UK",
  "Gare du Nord, Paris, France",
  "Tokyo Station, Tokyo, Japan",
  "Berlin Hauptbahnhof, Berlin, Germany",
  "Chhatrapati Shivaji Maharaj Terminus, Mumbai, India",
  "Flinders Street Station, Melbourne, Australia",
  "Antwerp Central Station, Antwerp, Belgium",
  "Kuala Lumpur Railway Station, Kuala Lumpur, Malaysia"
];
```

```js echo
const config = view(
  Object.assign(Inputs.form({
    station: Inputs.select(stations, {label: "Store"}),
    start_date: Inputs.date({label: "Start", min: "2023-01-01", max: "2023-12-31", value: "2023-10-01"}),
    end_date: Inputs.date({label: "End", min: "2023-01-01", max: "2023-12-31", value: "2023-12-31"})
  }), {className: "inline"})
);
```

```js
config
```

```html echo
<style>
  .inline {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 640px;
  }
  .inline form {
    max-width: 200px;
    display: flow;
  }
</style>
```

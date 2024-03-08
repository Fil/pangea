---
draft: true
index: false
source: https://github.com/observablehq/framework/pull/1015
sql:
  gaia: ./gaia-sample.parquet
---

```js echo
gaiauv && vg.plot(vg.raster(vg.from("gaiauv"), {x: "u", y: "v", fill: "density"}), vg.width(800), vg.height(400));
```

```sql id=gaiauv
-- compute u and v with natural earth projection
CREATE TABLE gaiauv AS (

WITH prep AS (
  SELECT
    radians((-ra + 540) % 360 - 180) AS lambda,
    radians(dec) AS phi,
    asin(sqrt(3)/2 * sin(phi)) AS t,
    t^2 AS t2,
    t2^3 AS t6,
    *
  FROM gaia
  WHERE parallax BETWEEN -5 AND 20
)

SELECT
  (1.340264 * lambda * cos(t)) / (sqrt(3)/2 * (1.340264 + (-0.081106 * 3 * t2) + (t6 * (0.000893 * 7 + 0.003796 * 9 * t2)))) AS u,
  t * (1.340264 + (-0.081106 * t2) + (t6 * (0.000893 + 0.003796 * t2))) AS v
FROM prep

)
```

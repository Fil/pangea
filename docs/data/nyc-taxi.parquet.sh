export TMPDIR="docs/.observablehq/.cache"
mkdir -p $TMPDIR

echo "running loader" >&2

# install duckdb if not already present
export PATH=$TMPDIR:$PATH
command -v duckdb > /dev/null || $(
  curl --location --output duckdb.zip \
    https://github.com/duckdb/duckdb/releases/download/v0.10.0/duckdb_cli-linux-amd64.zip && \
    unzip -qq duckdb.zip && chmod +x duckdb && mv duckdb $TMPDIR/
)

duckdb :memory: << EOF
-- Load spatial extension
INSTALL spatial; LOAD spatial;

-- Project, following the example at https://github.com/duckdb/duckdb_spatial
CREATE TEMP TABLE rides AS SELECT
  pickup_datetime::TIMESTAMP AS datetime,
  ST_Transform(ST_Point(pickup_latitude, pickup_longitude), 'EPSG:4326', 'EPSG:32118') AS pick,
  ST_Transform(ST_Point(dropoff_latitude, dropoff_longitude), 'EPSG:4326', 'EPSG:32118') AS drop
FROM 'https://uwdata.github.io/mosaic-datasets/data/nyc-rides-2010.parquet';

-- Write output parquet file
COPY (SELECT
  HOUR(datetime) + MINUTE(datetime) / 60 AS time,
  ST_X(pick)::INTEGER AS px, -- extract pickup x-coord
  ST_Y(pick)::INTEGER AS py, -- extract pickup y-coord
  ST_X(drop)::INTEGER AS dx, -- extract dropff x-coord
  ST_Y(drop)::INTEGER AS dy  -- extract dropff y-coord
FROM rides
ORDER BY 2,3,4,5,1 -- optimize output size by sorting
) TO 'trips.parquet' (COMPRESSION 'ZSTD', row_group_size 10000000);
EOF

cat trips.parquet >&1  # Write output to stdout
rm trips.parquet       # Clean up
---
index: true
---

# Hello, Google sheets

To load data from Google sheets, the easiest way is to allow it to be exported to csv:

```sql echo
FROM read_csv_auto(
  'https://docs.google.com/spreadsheets/export?format=csv&id=1GuEPkwjdICgJ31Ji3iUoarirZNDbPxQj_kf7fd4h4Ro'
);
```

When that is not possible (say, for confidentiality), you can use a [data loader](/loaders/google-sheets) instead.

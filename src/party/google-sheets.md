---
index: true
---

# Hello google sheets

```sql echo
FROM read_csv_auto(
  'https://docs.google.com/spreadsheets/export?format=csv&id=1GuEPkwjdICgJ31Ji3iUoarirZNDbPxQj_kf7fd4h4Ro'
);
```

```sql echo
pragma version
```
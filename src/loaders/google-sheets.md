---
index: true
author: Cobus Theunissen
---

# Google Sheets data loader

If your sheet is public, the quickest way to load it is to `fetch` from its csv file export address (see [Hello, Google sheets](/party/google-sheets)). When it’s a private file, you have to use some authentication.

You can follow the instructions [here](https://hackernoon.com/how-to-use-google-sheets-api-with-nodejs-cz3v316f) to create a service account that has access to your files. Then find the name of your project and create an [API key](https://console.cloud.google.com/apis/credentials), and copy these values into your `.env` file:

```sh
GCLOUD_PROJECT="lofty-cabinet-321207"
GOOGLE_APPLICATION_CREDENTIALS="AIzaSyCmb4xxxxxxxxxxx"
```

And in your data loader, copy (or import) the following code (you will also need to `yarn add googleapis`):

```js echo run=false
import "dotenv/config";
import {google} from "googleapis";
const sheets = google.sheets("v4");

const {GCLOUD_PROJECT, GOOGLE_APPLICATION_CREDENTIALS} = process.env;
if (!GCLOUD_PROJECT) throw new Error("missing GCLOUD_PROJECT");
if (!GOOGLE_APPLICATION_CREDENTIALS) throw new Error("missing GOOGLE_APPLICATION_CREDENTIALS");

async function getAuthToken() {
  return new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  }).getClient();
}

export async function getSpreadSheet({spreadsheetId}) {
  const auth = await getAuthToken();
  return sheets.spreadsheets.get({spreadsheetId, auth});
}

export async function getSpreadSheetValues({spreadsheetId, sheetName}) {
  const auth = await getAuthToken();
  return sheets.spreadsheets.values.get({spreadsheetId, auth, range: sheetName});
}
```

import playwright from "playwright";
import type {BrowserContext} from "playwright";
import sharp from "sharp";
import {existsSync, mkdirSync} from "node:fs";
import {dirname} from "node:path/posix";

async function generate_thumbnail(
  context: BrowserContext,
  id: string,
  path: string,
  {
    selector = ".observablehq--block>figure, .observablehq--block>svg, .observablehq--block>canvas",
    padding = 0,
    sleep = 0
  } = {}
) {
  const page = await context.newPage();
  const location = `${HTTP_ROOT}${id}`;
  try {
    await page.goto(location);
  } catch (e) {
    console.warn(e);
    return;
  }

  if (sleep > 0) {
    console.warn("sleeping…", sleep);
    await new Promise<void>((c) => setTimeout(() => c(), sleep));
    console.warn("waking up");
  }
  const elements = page.locator(selector);
  const count = await elements.count();
  console.warn(`found ${count} elements`);
  for (let c = 0; c < count; ++c) {
    const element = elements.nth(c);
    const bbox = await element.boundingBox();
    if (bbox != null) {
      const {x, y, width, height} = bbox;
      if (width > 300 && height > 300) {
        try {
          console.warn("screenshotting", path, c, x, y, width, height, padding);
          const buffer = await (padding === 0
            ? element.screenshot({type: "png"})
            : page.screenshot({
                path,
                clip: {
                  x: x - padding,
                  y: y - padding,
                  width: width + 2 * padding,
                  height: height + 2 * padding
                },
                fullPage: true
              }));
          mkdirSync(dirname(path), {recursive: true});
          await sharp(buffer).resize(640, 400, {fit: "cover", position: "entropy"}).png({quality: 80}).toFile(path);
          return; // use the first image only
        } catch (e) {
          console.warn(e);
        }
      }
    }
  }
}

const HTTP_ROOT = "http://127.0.0.1:3033";

async function main() {
  const browser = await playwright.chromium.launch({headless: true});
  const prefs = {deviceScaleFactor: 2};
  const context = await browser.newContext(prefs);
  const contextDark = await browser.newContext({...prefs, colorScheme: "dark"});
  const index = await fetch(`${HTTP_ROOT}/_observablehq/minisearch.json`).then((resp) => resp.json());
  for (const id of Object.values(index.documentIds)) {
    const path = `src/thumbnail${id}.png`;
    const pathDark = `src/thumbnail${id}-dark.png`;
    let save = true;
    try {
      save &&= !existsSync(path);
    } catch (e) {}
    console.warn("page", id, save ? "no thumbnail found" : path);
    if (save) {
      await generate_thumbnail(context, id as string, path, {sleep: 500});
      await generate_thumbnail(contextDark, id as string, pathDark, {sleep: 500});
    }
  }
  await browser.close();
}

main();

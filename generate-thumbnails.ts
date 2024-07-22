import playwright from "playwright";
import type {Page} from "playwright";
import sharp from "sharp";
import {existsSync, mkdirSync} from "node:fs";
import {dirname} from "node:path/posix";

async function generate_thumbnails(page: Page, id: string, ref: string) {
  const selector = ".observablehq--block figure, .observablehq--block svg, .observablehq--block canvas";

  await page.emulateMedia({colorScheme: "light"});
  try {
    await page.goto(`${HTTP_ROOT}${id}`);
    await delay(30000);
  } catch (e) {
    console.warn(e);
    return;
  }

  {
    const {element, bbox} = await locateElement(page, selector);
    await captureElement(ref, element, page, bbox, true);
  }
  {
    await page.emulateMedia({colorScheme: "dark"});
    await delay(200);
    const {element, bbox} = await locateElement(page, selector);
    await captureElement(ref, element, page, bbox, false);
  }
}

// Find a suitable element (an image with large dimensions); otherwise find the
// first items below the title.
async function locateElement(page: Page, selector: string) {
  const elements = page.locator(selector);
  const count = await elements.count();
  for (let c = 0; c < count; ++c) {
    const element = elements.nth(c);
    const bbox = await element.boundingBox();
    if (bbox && bbox.width >= 320 && bbox.height >= 200) return {element, bbox};
  }

  const l = page.locator("#observablehq-main h1");
  const title = (await l.count()) ? l.nth(0) : null;
  const tb = await title?.boundingBox();

  return {
    element: page,
    bbox: {
      x: (tb?.x ?? 10) - 10,
      y: (tb?.y ?? 0) + (tb?.height ?? 0) + 10,
      width: 640,
      height: 400
    }
  };
}

async function captureElement(ref: string, target, page, clip, light: boolean) {
  let buffer;
  try {
    buffer = await target.screenshot({type: "png", clip, fullPage: true});
  } catch (error) {
    console.warn(error);
    buffer = await page.screenshot({type: "png", clip, fullPage: true});
  }
  if (light) {
    await sharp(buffer).resize(1200, 630, {fit: "cover", position: "entropy"}).png({quality: 80}).toFile(`${ref}.png`);
    await sharp(buffer)
      .resize(640, 400, {fit: "cover", position: "entropy"})
      .png({quality: 60})
      .toFile(`${ref}-light.png`);
  } else {
    await sharp(buffer)
      .resize(640, 400, {fit: "cover", position: "entropy"})
      .png({quality: 60})
      .toFile(`${ref}-dark.png`);
  }
}

async function delay(sleep) {
  return new Promise<void>((c) => setTimeout(() => c(), sleep));
}

const HTTP_ROOT = "http://127.0.0.1:3033";

async function main() {
  const browser = await playwright.chromium.launch({headless: true});
  const context = await browser.newContext({deviceScaleFactor: 2});
  const page = await context.newPage();
  page.setViewportSize({width: 800, height: 1200});

  const index = await fetch(`${HTTP_ROOT}/_observablehq/minisearch.json`).then((resp) => resp.json());
  for (const id of Object.values(index.documentIds)) {
    const ref = `src/thumbnail${id}`;
    mkdirSync(dirname(ref), {recursive: true});
    let save = true;
    try {
      save &&= !existsSync(`${ref}-light.png`);
    } catch (e) {}
    if (save) {
      console.warn("page", id, ref);
      await generate_thumbnails(page, id as string, ref);
    }
  }
  await browser.close();
}

main();

import playwright from "playwright";
async function main(
  location,
  {
    selector = ".observablehq--block>figure, .observablehq--block>svg, .observablehq--block>canvas",
    colorScheme = "light",
    padding = 10,
    sleep = 0
  } = {}
) {
  const browser = await playwright.firefox.launch({
    headless: true // setting this to true will not run the UI
  });

  const context = await browser.newContext({
    deviceScaleFactor: 2, // retina images
    colorScheme
  });
  const page = await context.newPage();
  await page.goto(location);
  if (sleep > 0) {
    console.warn("sleeping…", sleep);
    await new Promise((c) => {
      setTimeout(() => c(), sleep);
    });
    console.warn("waking up");
  }
  const elements = page.locator(selector);
  const count = await elements.count();
  console.warn(`found ${count} elements`);
  for (let c = 0; c < count; ++c) {
    const element = elements.nth(c);
    const {x, y, width, height} = await element.boundingBox();
    if (width && height) {
      try {
        console.warn("screenshotting image", c, x, y, width, height, padding);

        if (padding === 0) {
          await element.screenshot({path: `image${c}.png`});
        } else {
          await page.screenshot({
            path: `image${c}.png`,
            clip: {
              x: x - padding,
              y: y - padding,
              width: width + 2 * padding,
              height: height + 2 * padding
            },
            fullPage: true
          });
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }
  await browser.close();
}

main("http://127.0.0.1:3033/plot/voronoi-treemap", {sleep: 500});

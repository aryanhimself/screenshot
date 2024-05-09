const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");

exports.generateImage = (url, width, height) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--enable-gpu"],
        ignoreDefaultArgs: ["--disable-extensions"],
      });

      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: "networkidle0",
      });

      const divElement = await page.waitForSelector("div");
      const divBoundingBox = await divElement.boundingBox();

      const image = await page.screenshot({
        type: "jpeg",
        clip: {
          x: divBoundingBox.x,
          y: divBoundingBox.y,
          width: divBoundingBox.width,
          height: divBoundingBox.height,
        },
      });
      await browser.close();
      resolve(image);
    } catch (err) {
      reject(err);
    }
  });
};
